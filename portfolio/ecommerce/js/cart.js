/*
==================================================
CART STORAGE
==================================================
*/

const CART_STORAGE_KEY = "electromart_cart";

let cart = JSON.parse(
    localStorage.getItem(CART_STORAGE_KEY)
) || [];

/*
==================================================
SAVE CART
==================================================
*/

function saveCart() {
    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();
    updateCartTotal();
}

/*
==================================================
GET CART
==================================================
*/

function getCart() {
    return cart;
}

/*
==================================================
CLEAR CART
==================================================
*/

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

/*
==================================================
ADD TO CART
==================================================
*/

function addToCart(productId) {

    const product = getProductById(productId);

    if (!product) return;

    const existingItem = cart.find(
        item => item.id === Number(productId)
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: Number(productId),
            quantity: 1
        });

    }

    saveCart();
    renderCart();

    if (typeof showCartToast === "function") {
        showCartToast(`${product.name} added to cart`);
    }
}

/*
==================================================
REMOVE ITEM 
==================================================
*/

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== Number(productId)
    );

    saveCart();
    renderCart();
}

/*
==================================================
INCREASE QTY
==================================================
*/

function increaseQuantity(productId) {

    const item = cart.find(
        item => item.id === Number(productId)
    );

    if (!item) return;

    item.quantity++;

    saveCart();
    renderCart();
}

/*
==================================================
DECREASE QTY
==================================================
*/

function decreaseQuantity(productId) {

    const item = cart.find(
        item => item.id === Number(productId)
    );

    if (!item) return;

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        removeFromCart(productId);
        return;
    }

    saveCart();
    renderCart();
}

/*
==================================================
GET TOTAL ITEMS
==================================================
*/

function getCartItemCount() {

    return cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
}

/*
==================================================
GET TOTAL PRICE
==================================================
*/

function getCartTotal() {

    let total = 0;

    cart.forEach(item => {

        const product = getProductById(item.id);

        if (product) {
            total += product.price * item.quantity;
        }

    });

    return total;
}

/*
==================================================
UPDATE BADGE
==================================================
*/

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    cartCount.textContent =
        getCartItemCount();
}

/*
==================================================
UPDATE TOTAL
==================================================
*/

function updateCartTotal() {

    const totalElement =
        document.getElementById("cartTotal");

    if (!totalElement) return;

    totalElement.textContent =
        `$${getCartTotal().toFixed(2)}`;
}

/*
==================================================
RENDER CART ITEM
==================================================
*/

function createCartItem(item) {

    const product = getProductById(item.id);

    if (!product) return "";

    return `
        <div class="cart-item">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="cart-item-image">

            <div class="cart-item-info">

                <div class="d-flex justify-content-between">

                    <div>

                        <div class="cart-item-title">
                            ${product.name}
                        </div>

                        <div class="cart-item-price">
                            $${product.price}
                        </div>

                    </div>

                    <div>

                        <i
                            class="bi bi-trash remove-item"
                            data-remove="${product.id}">
                        </i>

                    </div>

                </div>

                <div
                    class="cart-qty mt-3">

                    <button
                        class="qty-btn"
                        data-decrease="${product.id}">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="qty-btn"
                        data-increase="${product.id}">
                        +
                    </button>

                </div>

                <div class="mt-2 small text-muted">

                    Subtotal:
                    <strong>
                        $${(
                            product.price *
                            item.quantity
                        ).toFixed(2)}
                    </strong>

                </div>

            </div>

        </div>
    `;
}

/*
==================================================
RENDER CART
==================================================
*/

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");

    if (!cartItems || !emptyCart) return;

    if (cart.length === 0) {

        cartItems.innerHTML = "";

        emptyCart.classList.remove("d-none");

        updateCartCount();
        updateCartTotal();

        return;
    }

    emptyCart.classList.add("d-none");

    cartItems.innerHTML =
        cart.map(createCartItem).join("");

    updateCartCount();
    updateCartTotal();

    attachCartEvents();
}

/*
==================================================
ATTACH CART EVENTS
==================================================
*/

function attachCartEvents() {

    document
        .querySelectorAll("[data-remove]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        button.dataset.remove
                    );

                }
            );

        });

    document
        .querySelectorAll("[data-increase]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    increaseQuantity(
                        button.dataset.increase
                    );

                }
            );

        });

    document
        .querySelectorAll("[data-decrease]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    decreaseQuantity(
                        button.dataset.decrease
                    );

                }
            );

        });
}

/*
==================================================
CHECKOUT
==================================================
*/

function checkout() {

    if (cart.length === 0) {

        if (typeof showCartToast === "function") {
            showCartToast("Your cart is empty");
        }

        return;
    }

    window.location.href = "checkout.html";
}

/*
==================================================
INITIALIZE CART
==================================================
*/

function initializeCart() {

    updateCartCount();
    updateCartTotal();
    renderCart();

    const checkoutBtn =
        document.getElementById("checkoutBtn");

    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            "click",
            checkout
        );

    }
}

/*
==================================================
PUBLIC API
==================================================
*/

window.Cart = {
    getCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    renderCart,
    initializeCart
};