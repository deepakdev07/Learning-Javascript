alert("Jay Shree Sita Ram Hanuman");

const form = document.querySelector("#transaction-form");
const description = document.querySelector("#description");
const balanceElement = document.querySelector("#balance");
const incomeElement = document.querySelector("#income");
const expenseElement = document.querySelector("#expense");
const transactionList = document.querySelector("#transaction-list");
let balance = 0;
let totalIncome = 0;
let totalExpense = 0;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


function updateSummary() {
    balance = 0;
    totalIncome = 0;
    totalExpense = 0;

    transactions.forEach(function(transaction) {
        if (transaction.type === "income") {
            balance = balance + transaction.amount;
            totalIncome = totalIncome + transaction.amount;
        } else {
            balance = balance - transaction.amount;
            totalExpense = totalExpense + transaction.amount;
        }
    });

    balanceElement.innerText = "₹" + balance;
    incomeElement.innerText = "₹" + totalIncome;
    expenseElement.innerText = "₹" + totalExpense;
}
function displayTransaction(transaction) {
    const listItem = document.createElement("li");

    const transactionText = document.createElement("span");
    transactionText.innerText =
        transaction.description + " - ₹" +
        transaction.amount + " (" +
        transaction.type + ")";

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";

    deleteButton.addEventListener("click", function() {
        transactions = transactions.filter(function(item) {
            return item.id !== transaction.id;
        });

        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );

        listItem.remove();
        updateSummary();
    });

    listItem.appendChild(transactionText);
    listItem.appendChild(deleteButton);

    if (transaction.type === "income") {
        listItem.style.color = "green";
    } else {
        listItem.style.color = "red";
    }

    transactionList.appendChild(listItem);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const descriptionValue = description.value;
    const amountValue = Number(document.querySelector("#amount").value);
    if (description.value.trim() === "") {
    alert("Please enter a description!");
    return;
}

if (amountValue <= 0) {
    alert("Please enter an amount greater than 0!");
    return;
};
    const type = document.querySelector("#type").value;
   const transaction = {
    id: Date.now(),
    description: descriptionValue,
    amount: amountValue,
    type: type
};

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateSummary();
   displayTransaction(transaction);
    form.reset();
    
});

transactions.forEach(displayTransaction);
updateSummary();