// setup express
const express = require("express")
const app = express()
app.use(express.json())

// setup stripe
const stripe = require("stripe")(process.env.STRIPE_PVT_KEY)

// inventory data
const catalog = new Map([
    [1, { priceInCents: 10000, name: "One hundred"}],
    [1, { priceInCents: 15000, name: "One hundred fifty"}],
    [1, { priceInCents: 20000, name: "Two hundred"}],
    [1, { priceInCents: 25000, name: "Tne hundred fifty"}],
    [1, { priceInCents: 30000, name: "Three hundred"}],
    [1, { priceInCents: 35000, name: "Three hundred fifty"}],
])

// start server
app.listen(3000)