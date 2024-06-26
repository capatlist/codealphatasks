document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name} - $${expense.amount}
                <div>
                    <button onclick="editExpense(${index})">Edit</button>
                    <button onclick="deleteExpense(${index})">Delete</button>
                </div>
            `;
            expenseList.appendChild(li);
        });
    }

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const expenseName = document.getElementById('expense-name').value;
        const expenseAmount = document.getElementById('expense-amount').value;

        if (expenseForm.dataset.index) {
            const index = expenseForm.dataset.index;
            expenses[index] = { name: expenseName, amount: expenseAmount };
            delete expenseForm.dataset.index;
        } else {
            expenses.push({ name: expenseName, amount: expenseAmount });
        }

        saveExpenses();
        renderExpenses();
        expenseForm.reset();
    });

    window.editExpense = (index) => {
        document.getElementById('expense-name').value = expenses[index].name;
        document.getElementById('expense-amount').value = expenses[index].amount;
        expenseForm.dataset.index = index;
    };

    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        saveExpenses();
        renderExpenses();
    };

    renderExpenses();
});
