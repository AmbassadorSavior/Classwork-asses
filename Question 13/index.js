function receiveOrder(order) {
    return new Promise((resolve, reject) => {
        if (!order.product.trim()) {
            reject(new Error("Please enter a product name."));
        } else if (!Number.isInteger(order.quantity) || order.quantity <= 0) {
            reject(new Error("Quantity must be a positive whole number."));
        } else {
            resolve(order);
        }
    });
}

function verifyOrder(order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (order.product.trim() && order.quantity > 0) {
                resolve(order);
            } else {
                reject(new Error("Order verification failed."));
            }
        }, 1000);
    });
}

function processPayment(order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (order.simulatePaymentFailure) {
                reject(new Error("Payment failed. Please try again."));
            } else {
                resolve(order);
            }
        }, 1000);
    });
}

function confirmOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Your order has been confirmed!");
        }, 1000);
    });
}

function placeOrder() {
    const productInput = document.getElementById("product");
    const quantityInput = document.getElementById("quantity");
    const result = document.getElementById("result");
    const button = document.querySelector("button");

    const order = {
        product: productInput.value.trim(),
        quantity: Number(quantityInput.value),
        simulatePaymentFailure: document.getElementById("simulateFailure").checked
    };

    result.textContent = "Processing your order...";
    button.disabled = true;

    receiveOrder(order)
        .then(verifyOrder)
        .then(processPayment)
        .then(confirmOrder)
        .then((message) => {
            result.textContent = `${message} Product: ${order.product}, quantity: ${order.quantity}.`;
        })
        .catch((error) => {
            result.textContent = error.message;
        })
        .finally(() => {
            button.disabled = false;
        });
}