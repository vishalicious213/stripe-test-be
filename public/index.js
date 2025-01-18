const checkoutBtn = document.querySelector("#checkoutBtn")

const inventory = [
    { id: 1, price: 100, name: "One hundred" },
    { id: 2, price: 150, name: "One hundred fifty" },
    { id: 3, price: 200, name: "Two hundred" },
    { id: 4, price: 250, name: "Two hundred fifty" },
    { id: 5, price: 300, name: "Three hundred" },
    { id: 6, price: 350, name: "Three hundred fifty"},
]

// ⬇️ EVENT LISTENERS ⬇️

checkoutBtn.addEventListener("click", checkout)

// ⬇️ EVENT HANDLERS ⬇️

function checkout() {
    console.log("Checkout")

    fetch("/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: [
                { id: 1, quantity: 3},
                { id: 2, quantity: 1},
            ]
        })
    }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
        window.location = url
    }).catch(e => {
        console.error(e.error)
    })
}

// ⬇️ RENDER FUNCTIONS ⬇️

function renderCatalog() {
    let catalog = ``

    inventory.forEach(item => {
        catalog += `
            <section class="item">
                <div>
                    <h2>${item.name}</h2>
                    <p class="price">$${item.price}</p>
                </div>
                <div class="controls">
                    <button>+</button>
                    <p class="quantity">0</p>
                    <button>-</button>
                </div>
            </section>
        `
    })

    document.querySelector("main").innerHTML = catalog
}

renderCatalog()