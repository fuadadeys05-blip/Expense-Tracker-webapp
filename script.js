
// Get HTML elements

const expenseForm = document.getElementById("expenseForm");

const expenseName = document.getElementById("expenseName");

const expenseAmount = document.getElementById("expenseAmount");

const expenseCategory = document.getElementById("expenseCategory");

const expenseList = document.getElementById("expenseList");

const totalAmount = document.getElementById("totalAmount");

const expenseCount = document.getElementById("expenseCount");

const errorMessage = document.getElementById("errorMessage");


// Store expenses in an array

let expenses = [];


// Format numbers as US dollars

function formatCurrency(amount) {

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amount);

}


// Add a new expense

expenseForm.addEventListener("submit", function(event) {

    // Prevent page from refreshing

    event.preventDefault();


    // Get user input

    const name = expenseName.value.trim();

    const amount = expenseAmount.valueAsNumber;

    const category = expenseCategory.value;


    // Validate expense name

    if (name === "") {

        errorMessage.textContent =
            "Please enter an expense name.";

        return;

    }


    // Validate expense amount

    if (
        expenseAmount.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        errorMessage.textContent =
            "Please enter a valid amount greater than zero.";

        return;

    }


    // Convert amount to cents to avoid
    // common floating-point calculation errors

    const amountInCents = Math.round(amount * 100);


    // Create a new expense object

    const newExpense = {

        id: Date.now(),

        name: name,

        amount: amountInCents,

        category: category

    };


    // Add expense to the array

    expenses.push(newExpense);


    // Clear error message

    errorMessage.textContent = "";


    // Clear input fields

    expenseName.value = "";

    expenseAmount.value = "";


    // Update the application

    displayExpenses();

});


// Display all expenses

function displayExpenses() {

    // Clear previous expense list

    expenseList.innerHTML = "";


    // Check if there are no expenses

    if (expenses.length === 0) {

        expenseList.innerHTML =
            '<p class="empty-message">No expenses added yet.</p>';

    }


    // Display each expense

    expenses.forEach(function(expense) {

        // Create expense container

        const expenseItem = document.createElement("div");

        expenseItem.className = "expense-item";


        // Create expense details

        const expenseDetails = document.createElement("div");

        expenseDetails.className = "expense-details";


        const expenseTitle = document.createElement("h3");

        expenseTitle.textContent = expense.name;


        const expenseCategoryText = document.createElement("p");

        expenseCategoryText.textContent = expense.category;


        // Add details to the container

        expenseDetails.appendChild(expenseTitle);

        expenseDetails.appendChild(expenseCategoryText);


        // Create amount and delete section

        const expenseRight = document.createElement("div");

        expenseRight.className = "expense-right";


        const amountText = document.createElement("span");

        amountText.className = "expense-amount";

        amountText.textContent =
            formatCurrency(expense.amount / 100);


        // Create delete button

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-button";

        deleteButton.textContent = "Delete";


        // Delete expense when clicked

        deleteButton.addEventListener("click", function() {

            deleteExpense(expense.id);

        });


        // Add amount and button

        expenseRight.appendChild(amountText);

        expenseRight.appendChild(deleteButton);


        // Add everything to expense item

        expenseItem.appendChild(expenseDetails);

        expenseItem.appendChild(expenseRight);


        // Add expense to webpage

        expenseList.appendChild(expenseItem);

    });


    // Update total amount

    updateTotal();

}


// Calculate total expenses

function updateTotal() {

    // Add all expense amounts together

    const totalInCents = expenses.reduce(function(total, expense) {

        return total + expense.amount;

    }, 0);


    // Convert cents to dollars

    const total = totalInCents / 100;


    // Display total

    totalAmount.textContent = formatCurrency(total);


    // Update expense count

    expenseCount.textContent = expenses.length;

}


// Delete an expense

function deleteExpense(id) {

    // Keep expenses that do not match the selected ID

    expenses = expenses.filter(function(expense) {

        return expense.id !== id;

    });


    // Refresh the expense list and total

    displayExpenses();

}
