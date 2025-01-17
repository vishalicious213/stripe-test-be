const checkoutBtn = document.querySelector("#checkoutBtn")

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