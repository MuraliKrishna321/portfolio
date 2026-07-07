const cart =
    JSON.parse(
        localStorage.getItem("electromart_cart")
    ) || [];

const itemsContainer =
    document.getElementById("checkoutItems");

const totalElement =
    document.getElementById("checkoutTotal");

let total = 0;

cart.forEach(item => {

    const product =
        products.find(
            p => p.id === item.id
        );

    if (!product) return;

    const subtotal =
        product.price * item.quantity;

    total += subtotal;

    itemsContainer.innerHTML += `

        <div class="d-flex justify-content-between mb-2">

            <span>
                ${product.name}
                x ${item.quantity}
            </span>

            <strong>
                $${subtotal.toFixed(2)}
            </strong>

        </div>

    `;
});

totalElement.textContent =
    `$${total.toFixed(2)}`;

document
.getElementById("checkoutForm")
.addEventListener("submit", e => {

    e.preventDefault();

    alert(
        "Order placed successfully!"
    );

    localStorage.removeItem(
        "electromart_cart"
    );

    window.location.href =
        "index.html";

}); 
