const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const path = require("path");
const UserRouter = require("./router/User");
const EquipmentRouter = require("./router/Equipment");
const RentalRouter = require("./router/Rental");
const stripe = require("stripe")("sk_test_51NnFdzSBctw00E1UCKKBsLDr4M2EuVDiMcYNOHlnlNNATOXZrSJsJHzAGKxnjXJrU0YPia5bYBqYsywS5B0MwAib00SRCbdc8b")

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Replace with the correct frontend URL
  credentials: true, // Enable credentials (cookies)
}));
app.use(express.json());

// Define your routes
app.use("/userData", UserRouter);
app.use("/equipmentData", EquipmentRouter);
app.use("/RentalData", RentalRouter);

// Create a checkout session
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
  // Remove the payment_method_types parameter
  // to manage payment methods in the Dashboard
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      // The currency parameter determines which
      // payment methods are used in the Checkout Session.
      currency: 'eur',
      product_data: {
        name: 'T-shirt',
      },
      unit_amount: 2000,
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
});
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "An error occurred while creating the Stripe session" });
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Farmer Website Started");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
