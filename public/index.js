const checkoutBtn = document.querySelector("#checkoutBtn")
const cartBtn = document.querySelector("#cartBtn")

const inventory = [
    { id: 1, price: 100, count: 0, name: "One hundred" },
    { id: 2, price: 150, count: 0, name: "One hundred fifty" },
    { id: 3, price: 200, count: 0, name: "Two hundred" },
    { id: 4, price: 250, count: 0, name: "Two hundred fifty" },
    { id: 5, price: 300, count: 0, name: "Three hundred" },
    { id: 6, price: 350, count: 0, name: "Three hundred fifty"},
]

// ⬇️ EVENT LISTENERS ⬇️

checkoutBtn.addEventListener("click", checkout)

cartBtn.addEventListener("click", toggleCart)

// ⬇️ EVENT HANDLERS ⬇️

function itemCount(id, operation) {
    const selectedItemQty = document.getElementById(`qty-${id}`)
    let selectedItem = inventory.filter(function(inventoryItem) {
        return inventoryItem.id === id
    })

    if (operation === "add") {
        selectedItem[0].count = selectedItem[0].count + 1
        selectedItemQty.textContent = selectedItem[0].count
    } else {
        selectedItem[0].count = selectedItem[0].count - 1
        if (selectedItem[0].count < 0) {
            selectedItem[0].count = 0
        }
        selectedItemQty.textContent = selectedItem[0].count
    }

    // console.log(id)
    // console.log(selectedItem)
}

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

function toggleCart() {
    const cart = document.getElementById("cart")
    const cartContents = document.getElementById("cart-contents")
    cart.classList.toggle("hide")
    cartContents.innerHTML = ""

    let cartItems = inventory.filter(function(cartItem) {
        return cartItem.count > 0
    })

    // console.log(cartItems)

    const itemsToRender = cartItems.map(item => `
        <div class="cart-item">
            <p>${item.name}</p>
            <p class="price-detail">${item.count}</p>
            <p class="price-detail">$${item.price}</p>
            <p class="price-detail">$${item.price * item.count}</p>
        </div>
    `).join("")

    cartContents.innerHTML += itemsToRender
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
                    <button id="add-${item.id}" onclick="itemCount(${item.id}, 'add')">+</button>
                    <p id="qty-${item.id}" class="quantity">${item.count}</p>
                    <button id="sub-${item.id}" onclick="itemCount(${item.id}, 'sub')">-</button>
                </div>
            </section>
        `
    })

    document.querySelector(".catalog").innerHTML = catalog
}

renderCatalog()