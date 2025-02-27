// `npm init` to create package.json
// `npm i stripe express` to install stripe & express
// create `server.js` and add the code below
// to run server with environment variable support:
    // `node --env-file .env ./server.js`

// setup express
const express = require("express")
const app = express()
app.use(express.json())

// setup stripe
const stripe = require("stripe")(process.env.STRIPE_PVT_KEY)

// inventory data
const catalog = new Map([
    [1, { priceInCents: 10000, name: "One hundred"}],
    [2, { priceInCents: 15000, name: "One hundred fifty"}],
    [3, { priceInCents: 20000, name: "Two hundred"}],
    [4, { priceInCents: 25000, name: "Tne hundred fifty"}],
    [5, { priceInCents: 30000, name: "Three hundred"}],
    [6, { priceInCents: 35000, name: "Three hundred fifty"}],
])

// start server
app.listen(3000, () => {
    console.log("Server started on port 3000")
})