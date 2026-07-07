/*
==================================================
ELECTROMART
APPLICATION ENTRY POINT
==================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeApplication();

});

/*
==================================================
APP INITIALIZATION 
==================================================
*/

function initializeApplication() {

    console.log(
        "%cElectroMart Loaded",
        "color:#0d6efd;font-size:14px;font-weight:bold;"
    );

    initializeCartModule();

    initializeUIModule();

    initializeGlobalEvents();

    preloadImages();

    updateYear();

}

/*
==================================================
CART MODULE
==================================================
*/

function initializeCartModule() {

    if (
        typeof Cart !== "undefined" &&
        typeof Cart.initializeCart === "function"
    ) {

        Cart.initializeCart();

    }

}

/*
==================================================
UI MODULE
==================================================
*/

function initializeUIModule() {

    if (
        typeof UI !== "undefined" &&
        typeof UI.initializeUI === "function"
    ) {

        UI.initializeUI();

    }

}

/*
==================================================
GLOBAL EVENTS
==================================================
*/

function initializeGlobalEvents() {

    window.addEventListener(
        "storage",
        handleStorageSync
    );

    document.addEventListener(
        "keydown",
        handleKeyboardShortcuts
    );

}

/*
==================================================
STORAGE SYNC
==================================================
*/

function handleStorageSync(event) {

    if (
        event.key === "electromart_cart" &&
        typeof Cart !== "undefined"
    ) {

        Cart.renderCart();

    }

}

/*
==================================================
KEYBOARD SHORTCUTS
==================================================
*/

function handleKeyboardShortcuts(event) {

    const searchInput =
        document.getElementById("searchInput");

    /*
    ----------------------------------
    CTRL + K
    Focus Search
    ----------------------------------
    */

    if (
        event.ctrlKey &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        searchInput?.focus();

    }

    /*
    ----------------------------------
    ESC
    Close Bootstrap Modal
    ----------------------------------
    */

    if (event.key === "Escape") {

        const modalElement =
            document.getElementById(
                "productModal"
            );

        if (
            modalElement &&
            modalElement.classList.contains("show")
        ) {

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );

            modal?.hide();

        }

    }

}

/*
==================================================
PRELOAD PRODUCT IMAGES
==================================================
*/

function preloadImages() {

    if (
        typeof products === "undefined" ||
        !Array.isArray(products)
    ) {
        return;
    }

    products.forEach(product => {

        const image = new Image();

        image.src = product.image;

    });

}

/*
==================================================
UPDATE FOOTER YEAR
==================================================
*/

function updateYear() {

    const yearElement =
        document.getElementById("currentYear");

    if (!yearElement) return;

    yearElement.textContent =
        new Date().getFullYear();

}

/*
==================================================
PRODUCT ANALYTICS
==================================================
*/

function getStoreStats() {

    if (
        typeof products === "undefined"
    ) {
        return null;
    }

    const totalProducts =
        products.length;

    const totalInventory =
        products.reduce(
            (sum, product) =>
                sum + product.stock,
            0
        );

    const categories =
        [
            ...new Set(
                products.map(
                    product =>
                        product.category
                )
            )
        ];

    return {
        totalProducts,
        totalInventory,
        categories
    };

}

/*
==================================================
SEARCH HELPER
==================================================
*/

function searchStore(keyword) {

    if (
        typeof searchProducts !==
        "function"
    ) {
        return [];
    }

    return searchProducts(keyword);

}

/*
==================================================
CATEGORY HELPER
==================================================
*/

function getCategoryProducts(category) {

    if (
        typeof getProductsByCategory !==
        "function"
    ) {
        return [];
    }

    return getProductsByCategory(
        category
    );

}

/*
==================================================
STORE RESET
==================================================
*/

function resetStore() {

    localStorage.removeItem(
        "electromart_cart"
    );

    localStorage.removeItem(
        "electromart_theme"
    );

    location.reload();

}

/*
==================================================
DEBUG HELPERS
==================================================
*/

window.ElectroMart = {

    version: "1.0.0",

    products,

    searchStore,

    getCategoryProducts,

    getStoreStats,

    resetStore

};

/*
==================================================
WELCOME MESSAGE
==================================================
*/

setTimeout(() => {

    if (
        typeof showCartToast ===
        "function"
    ) {

        showCartToast(
            "Welcome to ElectroMart!"
        );

    }

}, 1200);

/*
==================================================
PAGE LOADER SUPPORT
==================================================
*/

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);

/*
==================================================
ERROR HANDLER
==================================================
*/

window.addEventListener(
    "error",
    event => {

        console.error(
            "Application Error:",
            event.message
        );

    }
);

/*
==================================================
UNHANDLED PROMISES
==================================================
*/

window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "Promise Error:",
            event.reason
        );

    }
);

/*
==================================================
END OF FILE
==================================================
*/