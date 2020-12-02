const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51HtUqyKwRSWgW3TKFqY6jizPp1e1WYbmaI9PdX1yy21xOP077dLhiguCWJ7TcFlwHvQkJksIgR8t31zvJbjtnH8w00VTeLMwYr',
);

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, PATCH, DELETE, OPTIONS',
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, Acceppt',
//   );
//   next();
// });

// API routes
app.get('/', (request, response) => response.status(200).send('Hello world'));

app.post('/payments/create', async (request, response) => {
  const total = request.query.total;

  console.log('payment request received BOOM!! >>', total);

  const paymentIntent = await stripe.paymentIntent.create({
    amount: total,
    currency: 'usd',
  });

  // type response 200=good 201=OK-created
  response.status(201).send({
    clientSecreet: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/ms-store-23819/us-central1/api
