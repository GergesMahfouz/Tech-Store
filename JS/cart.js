let cartProducts = document.querySelector("#cart-products");

let cart = JSON.parse(localStorage.getItem("products")) || [];

function displayCart() {

    let products = cart.map(function(item) {

        return `
            <div class="cart-item">

                <img src="images/${item.src}" alt="${item.name}">

                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>Premium electronics</p>
                </div>

                <div class="cart-price">
                    $${item.new}
                </div>

                <div class="quantity">

                    <button onclick="changeQuantity(${item.id}, 'minus')">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 'plus')">
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeProduct(${item.id})">
                    ×
                </button>

            </div>
        `;
    });

    cartProducts.innerHTML = products.join("");

    let total = cart.reduce(function(sum, item) {
        return sum + (item.new * item.quantity);
    }, 0);

    document.querySelector("#subtotal").textContent = `$${total}`;
    document.querySelector("#total").textContent = `$${total}`;
}

displayCart();

function changeQuantity(id, type) {

    let product = cart.find(function(item) {
        return item.id === id;
    });

    if (!product) return;

    if (type === "plus") {
        product.quantity++;
    }
    else {
        product.quantity--;
    }

    if (product.quantity <= 0) {
        cart = cart.filter(function(item) {
            return item.id !== id;
        });
    }

    localStorage.setItem("products", JSON.stringify(cart));

    displayCart();
}

function removeProduct(id) {

    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    localStorage.setItem("products", JSON.stringify(cart));

    displayCart();
}