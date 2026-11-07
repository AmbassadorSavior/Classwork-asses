let account = {
    name: "Elijah Chisom",
    accountNumber: "1234567890",
    balance: 50000
};

// Deposit money
function deposit() {
    let amount = Number(document.getElementById("depositAmount").value);

    if (amount <= 0 || document.getElementById("depositAmount").value === "") {
        document.getElementById("message").innerText =
            "Please enter a valid deposit amount";
        return;
    }

    account.balance += amount;

    document.getElementById("message").innerText =
        "Deposit successful! ₦" + amount.toLocaleString();

    document.getElementById("depositAmount").value = "";

    updateBalance();
}

// Withdraw money
function withdraw() {
    let amount = Number(document.getElementById("withdrawAmount").value);

    if (amount <= 0 || document.getElementById("withdrawAmount").value === "") {
        document.getElementById("message").innerText =
            "Please enter a valid withdrawal amount";
        return;
    }

    if (amount > account.balance) {
        document.getElementById("message").innerText =
            "Insufficient balance";
        return;
    }

    account.balance -= amount;

    document.getElementById("message").innerText =
        "Withdrawal successful! ₦" + amount.toLocaleString();

    document.getElementById("withdrawAmount").value = "";

    updateBalance();
}

// Update balance on the page
function updateBalance() {
    document.getElementById("balance").innerText =
        "Balance: ₦" + account.balance.toLocaleString();
}

// Check balance
function checkBalance() {
    document.getElementById("message").innerText =
        "Your current balance is ₦" + account.balance.toLocaleString();
}

// Display account information
function displayAccount() {
    document.getElementById("result").innerHTML = `
        <h3>Account Information</h3>
        <p>Name: ${account.name}</p>
        <p>Account Number: ${account.accountNumber}</p>
        <p>Balance: ₦${account.balance.toLocaleString()}</p>
    `;
}

// Display initial balance
updateBalance();