const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);
const catchAsync = require("../catchAsync");

exports.paymentCreate = catchAsync(async (req, res) => {
  const { total } = req.query;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
