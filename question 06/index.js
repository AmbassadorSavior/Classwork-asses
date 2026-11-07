let products = [];
let cart = [];

function addProduct() {
    let name = document.getElementById("name").value.trim();
    let price = Number(document.getElementById("price").value);

    if (name === "" || price <= 0 ||
        document.getElementById("price").value === "") {
        alert("Enter a valid product name and price");
        return;
    }

    let id = Date.now();

    products.push({
        id: id,
        name: name,
        price: price
    });

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";

    displayProducts();
}

function displayProducts() {
    let output = "";

    products.forEach(function(product) {
        output += `
            <div class="product">
                <h4>${product.name}</h4>
                <p>Price: ₦${product.price.toLocaleString()}</p>
                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });

    document.getElementById("products").innerHTML =
        output || "No products added yet";
}

function addToCart(id) {
    let product = products.find(item => item.id === id);

    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    displayCart();
}

function displayCart() {
    let output = "";

    cart.forEach(function(item) {
        output += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>Price: ₦${item.price.toLocaleString()}</p>
                <p>Quantity: ${item.quantity}</p>

                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <button class="remove" onclick="removeProduct(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });

    document.getElementById("cart").innerHTML =
        output || "Your cart is empty";

    calculateTotal();
}

function changeQuantity(id, amount) {
    let item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeProduct(id);
    } else {
        displayCart();
    }
}

function removeProduct(id) {
    cart = cart.filter(item => item.id !== id);
    displayCart();
}

function calculateTotal() {
    let subtotal = 0;

    cart.forEach(function(item) {
        subtotal += item.price * item.quantity;
    });

    let discount = 0;

    if (subtotal > 50000) {
        discount = subtotal * 0.10;
    }

    let total = subtotal - discount;

    document.getElementById("subtotal").innerText =
        "Subtotal: ₦" + subtotal.toLocaleString();

    document.getElementById("discount").innerText =
        "Discount: ₦" + discount.toLocaleString();

    document.getElementById("total").innerText =
        "Total: ₦" + total.toLocaleString();

    return { subtotal, discount, total };
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    let result = calculateTotal();

    document.getElementById("summary").innerHTML = `
        <h3>Checkout Summary</h3>
        <p>Subtotal: ₦${result.subtotal.toLocaleString()}</p>
        <p>Discount: ₦${result.discount.toLocaleString()}</p>
        <h3>Final Payment: ₦${result.total.toLocaleString()}</h3>
        <p>Thank you for shopping!</p>
    `;
}

displayProducts();
displayCart();