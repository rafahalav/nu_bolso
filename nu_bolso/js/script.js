document.addEventListener("DOMContentLoaded", () => {

const STORAGE_KEYS = {
    income: "nubolso_total_income",
    expense: "nubolso_total_expense",
    reservePercent: "nubolso_reserve_percent"
};

let totalIncome = 0;
let totalExpense = 0;
let reservePercent = 0.10;

function loadStorage() {
    const i = localStorage.getItem(STORAGE_KEYS.income);
    const e = localStorage.getItem(STORAGE_KEYS.expense);
    const r = localStorage.getItem(STORAGE_KEYS.reservePercent);
    if (i) totalIncome = parseFloat(i);
    if (e) totalExpense = parseFloat(e);
    if (r) reservePercent = parseFloat(r);
}

function saveStorage() {
    localStorage.setItem(STORAGE_KEYS.income, totalIncome);
    localStorage.setItem(STORAGE_KEYS.expense, totalExpense);
    localStorage.setItem(STORAGE_KEYS.reservePercent, reservePercent);
}

const today = new Date();
document.getElementById("today").innerText =
    "Hoje • " + today.toLocaleDateString("pt-BR");

document.getElementById("reservePercent").addEventListener("input", e => {
    reservePercent = parseFloat(e.target.value) / 100;
    calculate();
});

loadStorage();
document.getElementById("reservePercent").value = reservePercent * 100;

calculate();

window.addIncome = function () {
    const v = prompt("Quanto entrou?");
    if (v && !isNaN(v)) {
        totalIncome += parseFloat(v);
        calculate();
    }
};

window.addExpense = function () {
    const v = prompt("Quanto saiu?");
    if (v && !isNaN(v)) {
        totalExpense += parseFloat(v);
        calculate();
    }
};

function calculate() {
    const available = totalIncome - totalExpense;
    const reserve = totalIncome * reservePercent;

    document.getElementById("currentBalance").innerText =
        available.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    document.getElementById("canSpend").innerText =
        (available - reserve).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    document.getElementById("income").innerText =
        totalIncome.toFixed(2);

    document.getElementById("expense").innerText =
        totalExpense.toFixed(2);

    saveStorage();
}

});
