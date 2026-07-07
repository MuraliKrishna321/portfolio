/*
==================================================
UI STATE
==================================================
*/

const UI = {
    currentCategory: "all",
    searchTerm: "",
    productModal: null,
    toast: null,

    initializeUI,
    renderProducts,
    filterProducts,
    openProductModal,
    showCartToast,
    toggleTheme,
    formatPrice
};

window.UI = UI;

/*
==================================================
INITIALIZE UI
==================================================
*/

function initializeUI() {

    initializeTheme();

    initializeModal();

    initializeToast();

    initializeSearch();

    initializeFilters();

    renderProducts(products);

    attachProductEvents();
}

/*
==================================================
PRODUCT RENDERING
==================================================
*/

function renderProducts(productList) {

    const container =
        document.getElementById("productsContainer");

    const noResults =
        document.getElementById("noResults");

    if (!container) return;

    if (!productList.length) {

        container.innerHTML = "";

        noResults?.classList.remove("d-none");

        return;
    }

    noResults?.classList.add("d-none");

    container.innerHTML =
        productList.map(createProductCard).join("");

    attachProductEvents();
}

/*
==================================================
FILTER PRODUCTS
==================================================
*/

function filterProducts() {

    const filtered = getFilteredProducts(
        UI.currentCategory,
        UI.searchTerm
    );

    renderProducts(filtered);
}

/*
==================================================
SEARCH
==================================================
*/

function initializeSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", e => {

        UI.searchTerm =
            e.target.value.trim();

        filterProducts();
    });
}

/*
==================================================
CATEGORY FILTERS
==================================================
*/

function initializeFilters() {

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");
                btn.classList.remove("btn-primary");

                btn.classList.add(
                    "btn-outline-primary"
                );

            });

            button.classList.add("active");
            button.classList.add("btn-primary");

            button.classList.remove(
                "btn-outline-primary"
            );

            UI.currentCategory =
                button.dataset.category;

            filterProducts();
        });

    });
}

/*
==================================================
PRODUCT EVENTS
==================================================
*/

function attachProductEvents() {

    attachQuickViewButtons();

    attachAddToCartButtons();

    attachModalCartButtons();
}

/*
==================================================
QUICK VIEW
==================================================
*/

function attachQuickViewButtons() {

    const buttons =
        document.querySelectorAll(
            ".quick-view-btn"
        );

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);

            openProductModal(productId);

        });

    });
}

/*
==================================================
ADD TO CART BUTTONS
==================================================
*/

function attachAddToCartButtons() {

    const buttons =
        document.querySelectorAll(
            ".add-cart-btn"
        );

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                Number(button.dataset.id);

            Cart.addToCart(productId);

            animateProductCard(productId);

        });

    });
}

/*
==================================================
PRODUCT MODAL
==================================================
*/

function initializeModal() {

    const modalElement =
        document.getElementById("productModal");

    if (!modalElement) return;

    UI.productModal =
        new bootstrap.Modal(modalElement);
}

/*
==================================================
OPEN MODAL
==================================================
*/

function openProductModal(productId) {

    const product =
        getProductById(productId);

    if (!product) return;

    const modalContent =
        document.getElementById(
            "productModalContent"
        );

    modalContent.innerHTML =
        createProductModal(product);

    UI.productModal.show();

    attachModalCartButtons();
}

/*
==================================================
MODAL ADD TO CART
==================================================
*/

function attachModalCartButtons() {

    const button =
        document.querySelector(
            ".modal-add-cart"
        );

    if (!button) return;

    button.addEventListener("click", () => {

        const productId =
            Number(button.dataset.id);

        Cart.addToCart(productId);

        if (UI.productModal) {
            UI.productModal.hide();
        }

    });
}

/*
==================================================
CARD ANIMATION
==================================================
*/

function animateProductCard(productId) {

    const card =
        document.querySelector(
            `[data-product-id="${productId}"]`
        );

    if (!card) return;

    card.classList.add("added");

    setTimeout(() => {

        card.classList.remove("added");

    }, 500);
}

/*
==================================================
TOAST
==================================================
*/

function initializeToast() {

    const toastElement =
        document.getElementById("cartToast");

    if (!toastElement) return;

    UI.toast =
        new bootstrap.Toast(toastElement);
}

/*
==================================================
SHOW TOAST
==================================================
*/

function showCartToast(message) {

    const toastBody =
        document.querySelector(
            "#cartToast .toast-body"
        );

    if (toastBody) {
        toastBody.textContent = message;
    }

    if (UI.toast) {
        UI.toast.show();
    }
}

/*
==================================================
THEME
==================================================
*/

const THEME_KEY = "electromart_theme";

/*
==================================================
INITIALIZE THEME
==================================================
*/

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(THEME_KEY);

    const theme = savedTheme || "light";

	document.documentElement.setAttribute(
		"data-bs-theme",
		theme
	);

	updateThemeIcon(theme);

    const toggleButton =
        document.getElementById("themeToggle");

    if (!toggleButton) return;

    toggleButton.addEventListener(
        "click",
        toggleTheme
    );
}

/*
==================================================
TOGGLE THEME
==================================================
*/

function toggleTheme() {

    const currentTheme =
        document.documentElement.getAttribute(
            "data-bs-theme"
        );

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    document.documentElement.setAttribute(
        "data-bs-theme",
        newTheme
    );

    localStorage.setItem(
        THEME_KEY,
        newTheme
    );

    updateThemeIcon(newTheme);
}

/*
==================================================
UPDATE THEME ICON
==================================================
*/

function updateThemeIcon(theme) {

    const icon =
        document.querySelector(
            "#themeToggle i"
        );

    if (!icon) return;

    icon.className =
        theme === "dark"
            ? "bi bi-sun-fill"
            : "bi bi-moon-stars-fill";
}

/*
==================================================
SCROLL TO PRODUCTS
==================================================
*/

function scrollToProducts() {

    const section =
        document.getElementById(
            "products-section"
        );

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth"
    });
}

/*
==================================================
FORMAT PRICE
==================================================
*/

function formatPrice(price) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD"
        }
    ).format(price);
}

