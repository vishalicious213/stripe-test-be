// setup express
const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static('public'))

// setup stripe
const stripe = require("stripe")(process.env.STRIPE_PVT_KEY)

// inventory data
const catalog = new Map([
    [1, { priceInCents: 10000, name: "One hundred"}],
    [2, { priceInCents: 15000, name: "One hundred fifty"}],
    [3, { priceInCents: 20000, name: "Two hundred"}],
    [4, { priceInCents: 25000, name: "Two hundred fifty"}],
    [5, { priceInCents: 30000, name: "Three hundred"}],
    [6, { priceInCents: 35000, name: "Three hundred fifty"}],
])

// create a post request for /create-checkout-session
app.post("/create-checkout-session", async (req, res) => {
    try {
        // create a checkout session with stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: req.body.items.map(({ id, quantity }) => {
                const item = catalog.get(id)
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.priceInCents
                    },
                    quantity: quantity,
                }
            }),
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

// start server
app.listen(3000, () => {
    console.log("Server started on port 3000")
})