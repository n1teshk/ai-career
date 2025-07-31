// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// Ensure you have your Stripe secret key configured in Firebase Functions environment variables
// firebase functions:config:set stripe.secret="sk_..."
// firebase functions:config:set stripe.webhook_secret="wh_..."
const stripe = require("stripe")(functions.config().stripe.secret);

// Endpoint for creating a Stripe Checkout Session
exports.createStripeCheckoutSession = functions.https.onRequest(async (req, res) => {
  // Allow CORS for development (adjust for production)
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type, X-User-Id'); // X-User-Id added for metadata
    res.set('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { courseId, referrerId, userId } = req.body; // userId now explicitly passed from frontend
  if (!courseId || !userId) {
    return res.status(400).send("Missing courseId or userId");
  }

  try {
    const courseDoc = await db.collection("courses").doc(courseId).get();
    if (!courseDoc.exists) {
      return res.status(404).send("Course not found");
    }
    const course = courseDoc.data();

    // Parse course cost in cents for Stripe (handle free courses or courses with no cost defined)
    const unitAmount = Math.round((course.cost || 0) * 100);

    const params = {
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: course.title || "Unknown Course",
            images: course.imageUrl ? [course.imageUrl] : [], // Add product image if available
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      }],
      mode: "payment",
      // success_url and cancel_url will redirect to your frontend Checkout page
      success_url: `${req.headers.origin}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout?canceled=true`,
      metadata: { // Custom metadata passed to Stripe, returned in webhook
        courseId: courseId,
        referrerId: referrerId || "", // Pass referrerId
        userId: userId, // Pass userId
      },
      // Optional: Add customer email if available
      customer_email: req.body.userEmail || (await admin.auth().getUser(userId)).email,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

// Stripe webhook to handle payment completions
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      functions.config().stripe.webhook_secret
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, courseId, referrerId } = session.metadata || {};

    if (userId && courseId) {
      // Fetch the course details from your Firestore 'courses' collection
      // to get its title and other info, in case it wasn't fully passed in metadata
      const courseDoc = await db.collection("courses").doc(courseId).get();
      const courseData = courseDoc.exists ? courseDoc.data() : {};

      // Update user's course enrollment in Firestore
      const courseRef = db.collection("users").doc(userId).collection("courses").doc(courseId);
      await courseRef.set({
        paid: true,
        paymentDate: admin.firestore.FieldValue.serverTimestamp(),
        stripeSessionId: session.id,
        progress: "started", // optionally set initial progress
        courseTitle: courseData.title || "Unknown Course", // Use title from your 'courses' collection
        courseAffiliateLink: courseData.affiliateLink || "", // Ensure you store this if applicable
        costPaid: session.amount_total / 100, // Record the actual amount paid
        currency: session.currency,
      }, { merge: true });

      // Record affiliate payout if referrerId exists and payment was greater than 0
      if (referrerId && session.amount_total > 0) { // Only record payout for actual payments
        // You might want to define payout percentage here or fetch from another config
        const payoutPercentage = 0.10; // Example: 10% commission
        const payoutAmount = (session.amount_total / 100) * payoutPercentage;

        await db.collection("affiliatePayouts").add({
          referrerId,
          userId,
          courseId,
          payoutAmount: payoutAmount, // The amount to pay the affiliate
          paymentAmount: session.amount_total / 100, // Total payment amount
          paymentDate: admin.firestore.FieldValue.serverTimestamp(),
          stripeSessionId: session.id,
          status: "pending", // e.g., pending, paid, cancelled
        });
      }
    }
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to Stripe to acknowledge receipt of the event
  res.json({ received: true });
});
