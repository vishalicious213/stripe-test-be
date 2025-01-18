const checkoutBtn = document.querySelector("#checkoutBtn")

const inventory = [
    { price: 100, name: "One hundred" },
    { price: 150, name: "One hundred fifty" },
    { price: 200, name: "Two hundred" },
    { price: 250, name: "Tne hundred fifty" },
    { price: 300, name: "Three hundred" },
    { price: 350, name: "Three hundred fifty"} ,
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
                <h2>${item.name}</h2>
                <p class="price">$${item.price}</p>
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