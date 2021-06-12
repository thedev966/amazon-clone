const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IL4ZQBX1dF3b6qDgwfdd3OmeyBUjg1ZODqNi0gC1a4Q6SOkNTMMerXdaXrNMy4KnyeB11caeWcC0vzrSq54LdIb00mYydwhU3"
);

// app config
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).send("Hello guys..");
});

app.post("/payments/create", async (req, res) => {
  const totalPrice = req.query.total;
  console.log(totalPrice);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// listen command
exports.api = functions.https.onRequest(app);

// endpoint http://localhost:5001/clone-b8bad/us-central1/api
