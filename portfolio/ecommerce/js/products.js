/*
==================================================
PRODUCT DATA
==================================================
*/

const products = [
    {
        id: 1,
        name: "MacBook Pro M4",
        category: "laptops",
        price: 1999,
        rating: 4.9,
        badge: "New",
        stock: 15,
        image: "assets/products/macbook.jpg",
        description:
            "Apple MacBook Pro with M4 chip, Liquid Retina XDR display, all-day battery life and exceptional performance for professionals."
    },

    {
        id: 2,
        name: "Dell XPS 15",
        category: "laptops",
        price: 1699,
        rating: 4.8,
        badge: "Popular",
        stock: 12,
        image: "assets/products/dell-xps.jpg",
        description:
            "Premium Windows laptop with stunning InfinityEdge display, Intel Core Ultra processor and exceptional build quality."
    },

    {
        id: 3,
        name: "iPhone 17 Pro",
        category: "phones",
        price: 1299,
        rating: 4.9,
        badge: "New",
        stock: 20,
        image: "assets/products/iphone.jpg",
        description:
            "Apple's latest flagship smartphone featuring advanced camera technology, powerful performance and premium design."
    },

    {
        id: 4,
        name: "Samsung Galaxy S26 Ultra",
        category: "phones",
        price: 1199,
        rating: 4.8,
        badge: "Best Seller",
        stock: 18,
        image: "assets/products/samsung.jpg",
        description:
            "High-end Android smartphone with AI-powered camera system, S-Pen support and exceptional display quality."
    },

    {
        id: 5,
        name: "Sony WH-1000XM6",
        category: "audio",
        price: 399,
        rating: 4.9,
        badge: "Top Rated",
        stock: 30,
        image: "assets/products/sony-headphones.jpg",
        description:
            "Industry-leading noise cancelling headphones with immersive sound quality and long-lasting battery life."
    },

    {
        id: 6,
        name: "AirPods Pro 3",
        category: "audio",
        price: 299,
        rating: 4.7,
        badge: "Sale",
        stock: 25,
        image: "assets/products/airpods.jpg",
        description:
            "Premium wireless earbuds with active noise cancellation, transparency mode and spatial audio support."
    },

    {
        id: 7,
        name: "PlayStation 6",
        category: "gaming",
        price: 699,
        rating: 4.9,
        badge: "Hot",
        stock: 10,
        image: "assets/products/ps6.jpg",
        description:
            "Next-generation gaming console delivering ultra-fast performance, ray tracing and immersive gaming experiences."
    },

    {
        id: 8,
        name: "ASUS ROG Ally X",
        category: "gaming",
        price: 799,
        rating: 4.8,
        badge: "Gaming",
        stock: 14,
        image: "assets/products/rog-ally.jpg",
        description:
            "Portable gaming handheld powered by AMD Ryzen processor, delivering PC gaming performance anywhere."
    }
];

/*
==================================================
HELPER FUNCTIONS
==================================================
*/

function getProductById(id) {
    return products.find(product => product.id === Number(id));
}

function getProductsByCategory(category) {

    if (category === "all") {
        return products;
    }

    return products.filter(
        product => product.category === category
    );
}

function searchProducts(searchTerm) {

    const term = searchTerm.toLowerCase().trim();

    return products.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
}

function getFilteredProducts(category, searchTerm = "") {

    let filtered = [...products];

    if (category && category !== "all") {
        filtered = filtered.filter(
            product => product.category === category
        );
    }

    if (searchTerm) {

        const term = searchTerm.toLowerCase();

        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );
    }

    return filtered;
}

/*
==================================================
PRODUCT CARD TEMPLATE
==================================================
*/

function generateStars(rating) {

    const fullStars = Math.floor(rating);
    let stars = "";

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="bi bi-star-fill"></i>';
    }

    if (rating % 1 !== 0) {
        stars += '<i class="bi bi-star-half"></i>';
    }

    return stars;
}

function createProductCard(product) {

    return `
        <div class="col-lg-3 col-md-6 fade-in">

            <div
                class="product-card h-100"
                data-product-id="${product.id}">

                <div class="product-image-wrapper">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-image">

                    <span
                        class="badge bg-danger product-badge">
                        ${product.badge}
                    </span>

                </div>

                <div class="product-content">

                    <div class="product-category mb-2">
                        ${product.category}
                    </div>

                    <h5 class="product-title">
                        ${product.name}
                    </h5>

                    <div class="product-rating mb-2">
                        ${generateStars(product.rating)}
                        <small class="ms-1 text-muted">
                            (${product.rating})
                        </small>
                    </div>

                    <div class="product-price mb-3">
                        $${product.price}
                    </div>

                    <div class="product-actions">

                        <button
                            class="btn btn-outline-primary flex-grow-1 quick-view-btn"
                            data-id="${product.id}">
                            <i class="bi bi-eye"></i>
                            View
                        </button>

                        <button
                            class="btn btn-primary flex-grow-1 add-cart-btn"
                            data-id="${product.id}">
                            <i class="bi bi-cart-plus"></i>
                            Add
                        </button>

                    </div>

                </div>

            </div>

        </div>
    `;
}

/*
==================================================
PRODUCT MODAL TEMPLATE
==================================================
*/

function createProductModal(product) {

    return `
        <div class="row g-4">

            <div class="col-md-6">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="modal-product-image">

            </div>

            <div class="col-md-6">

                <span class="badge bg-primary mb-2">
                    ${product.badge}
                </span>

                <h2 class="mb-2">
                    ${product.name}
                </h2>

                <div class="modal-category mb-3">
                    ${product.category}
                </div>

                <div class="product-rating mb-3">
                    ${generateStars(product.rating)}
                    <span class="ms-2">
                        ${product.rating}/5
                    </span>
                </div>

                <div class="modal-price mb-3">
                    $${product.price}
                </div>

                <p class="modal-description">
                    ${product.description}
                </p>

                <div class="mb-3">
                    <strong>Stock:</strong>
                    ${product.stock} Available
                </div>

                <button
                    class="btn btn-primary btn-lg modal-add-cart"
                    data-id="${product.id}">
                    <i class="bi bi-cart-plus"></i>
                    Add To Cart
                </button>

            </div>

        </div>
    `;
}