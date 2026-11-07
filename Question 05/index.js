 let products = [];

function addProduct() {
    let id = document.getElementById("productId").value;
    let name = document.getElementById("productName").value;
    let price = Number(document.getElementById("price").value);
    let quantity = Number(document.getElementById("quantity").value);

    if (!id || !name || price <= 0 || quantity < 0) {
        alert("Please enter valid product details");
        return;
    }

    let existing = products.find(product => product.id === id);

    if (existing) {
        alert("Product ID already exists");
        return;
    }

    products.push({
        id: id,
        name: name,
        price: price,
        quantity: quantity
    });

    displayProducts();

    document.getElementById("productId").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}

function displayProducts() {
    let list = document.getElementById("productList");

    list.innerHTML = "";

    products.forEach(product => {
        list.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>₦${product.price}</td>
                <td>${product.quantity}</td>
            </tr>
        `;
    });

    calculateInventoryValue();
    checkLowStock();
}

function calculateInventoryValue() {
    let total = 0;

    products.forEach(product => {
        total += product.price * product.quantity;
    });

    document.getElementById("totalValue").innerText =
        "Total Inventory Value: ₦" + total;
}

function searchProduct() {
    let id = document.getElementById("searchId").value;

    let product = products.find(item => item.id === id);

    if (product) {
        document.getElementById("searchResult").innerText =
            "Product: " + product.name +
            ", Price: ₦" + product.price +
            ", Quantity: " + product.quantity;
    } else {
        document.getElementById("searchResult").innerText =
            "Product not found";
    }
}

function updateQuantity() {
    let id = document.getElementById("updateId").value;
    let quantity = Number(document.getElementById("newQuantity").value);

    let product = products.find(item => item.id === id);

    if (!product || quantity < 0 ||
        document.getElementById("newQuantity").value === "") {
        alert("Invalid product ID or quantity");
        return;
    }

    product.quantity = quantity;

    displayProducts();

    alert("Quantity updated successfully");
}

function checkLowStock() {
    let lowStock = products.filter(product => product.quantity < 5);

    if (lowStock.length > 0) {
        document.getElementById("warning").innerText =
            "Warning! Low stock: " +
            lowStock.map(product => product.name).join(", ");
    } else {
        document.getElementById("warning").innerText =
            "All products have sufficient stock";
    }
}