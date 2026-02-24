
/*
FAIRLY – Pseudokod / Arbetsflöde

Syfte:
En enkel budgetapp för två personer (Person A och Person B) där
inkomster och utgifter kan läggas till, tas bort och sammanställas.
Appen visar balans, fördelning och slutresultat (vem ska swisha vem).

-------------------------------------------------
1. Grundstruktur och inställningar (Personer)
-------------------------------------------------
Skapa en sektion högst upp för Person A och Person B.
Här ska användaren kunna:
- Ange namn för Person A
- Ange namn för Person B
- Ange inkomst för Person A
- Ange inkomst för Person B

Denna sektion fungerar som inställningar.
Den ändras sällan men påverkar alla beräkningar i appen.

-------------------------------------------------
2. Datastrukturer i JavaScript
-------------------------------------------------
Skapa ett objekt för personer:
- Person A (namn, inkomst)
- Person B (namn, inkomst)

Skapa två listor:
- En lista för inkomster
- En lista för utgifter

Varje budgetpost (inkomst eller utgift) ska innehålla:
- Belopp
- Beskrivning
- Kategori
- Typ (inkomst eller utgift)
- Betalad av (endast för utgift: Person A eller Person B)

-------------------------------------------------
3. Lägg till inkomst
-------------------------------------------------
Skapa ett formulär för att lägga till inkomst med:
- Belopp
- Beskrivning
- Kategori

När användaren klickar på "Lägg till":
- Skapa en ny inkomstpost
- Lägg till posten i listan med inkomster
- Uppdatera listan med budgetposter
- Räkna om totalsummor och balans

-------------------------------------------------
4. Lägg till utgift
-------------------------------------------------
Skapa ett formulär för att lägga till utgift med:
- Belopp
- Beskrivning
- Kategori
- Val av vem som betalade (Person A eller Person B)

När användaren klickar på "Lägg till":
- Skapa en ny utgiftspost
- Koppla utgiften till vald person
- Lägg till posten i listan med utgifter
- Uppdatera listan med budgetposter
- Räkna om totalsummor, balans och fördelning

-------------------------------------------------
5. Visa budgetposter
-------------------------------------------------
Visa alla inkomster och utgifter i en gemensam lista.

För varje post:
- Visa om det är en inkomst (+) eller utgift (-)
- Visa belopp och beskrivning
- Visa kategori
- Visa vem som betalat (för utgifter)
- Visa en knapp för att ta bort posten

-------------------------------------------------
6. Ta bort budgetpost
-------------------------------------------------
När användaren klickar på "Ta bort":
- Ta bort posten från rätt lista (inkomst eller utgift)
- Uppdatera listan som visas
- Räkna om totalsummor, balans och resultat

-------------------------------------------------
7. Beräkna totalsummor
-------------------------------------------------
Varje gång data ändras:
- Räkna ihop alla inkomster
- Räkna ihop alla utgifter
- Räkna ut balans (inkomster minus utgifter)

-------------------------------------------------
8. Beräkna fördelning mellan Person A och Person B
-------------------------------------------------
Utgå från alla utgifter:
- Räkna hur mycket Person A har betalat totalt
- Räkna hur mycket Person B har betalat totalt

Beroende på vald fördelning:
- 50/50: dela totala utgiften lika
- (Procentfördelning kan läggas till senare)

-------------------------------------------------
9. Räkna ut slutresultat (swish)
-------------------------------------------------
Jämför för varje person:
- Hur mycket personen har betalat
- Hur mycket personen borde betala

Om en person har betalat mer än sin andel:
- Den andra personen ska swisha mellanskillnaden

Om båda ligger lika:
- Ingen behöver swisha

-------------------------------------------------
10. Visa sammanställning
-------------------------------------------------
Visa tydligt:
- Totala inkomster
- Totala utgifter
- Balans (färgkodad: grön eller röd)
- Total utgift för Person A
- Total utgift för Person B
- Vald fördelning
- Slutresultat (vem ska swisha vem och hur mycket)

-------------------------------------------------
11. Förberedelse för localStorage (implementeras senare)
-------------------------------------------------
Strukturera datan så att:
- Inkomster
- Utgifter
- Personinformation

enkelt kan sparas i localStorage.

När localStorage implementeras:
- Spara data vid varje förändring
- Läs in sparad data när sidan laddas
*/

import categories from './categories.json';
import './style.scss';
import type { IExpense } from './models';

// ======================
// STATE
// ======================

let expenses: IExpense[] = [];

const incomes = {
  personA: 0,
  personB: 0
};

// ======================
// DOM ELEMENTS
// ======================

const amountinput =
  document.querySelector<HTMLInputElement>('#expense-amount')!;

const descriptioninput =
  document.querySelector<HTMLInputElement>('#expense-description')!;

const categoryinput =
  document.querySelector<HTMLSelectElement>('#expense-category')!;

const splitPercentageInput =
  document.querySelector<HTMLInputElement>('#split-percentage')!;

const splitModeInputs =
  document.querySelectorAll<HTMLInputElement>('input[name="splitMode"]');

const totalExpenseEl =
  document.querySelector<HTMLSpanElement>('#total-expense')!;

const totalIncomeEl =
  document.querySelector<HTMLSpanElement>('#total-income')!;

const balanceEl =
  document.querySelector<HTMLSpanElement>('#balance-amount')!;

const personATotalEl =
  document.querySelector<HTMLSpanElement>('#personA-total')!;

const personBTotalEl =
  document.querySelector<HTMLSpanElement>('#personB-total')!;

const settlementResultEl =
  document.querySelector<HTMLParagraphElement>('#settlement-result')!;

const personAIncomeInput =
  document.querySelector<HTMLInputElement>('#personA-income')!;

const personBIncomeInput =
  document.querySelector<HTMLInputElement>('#personB-income')!;

const personANameInput =
  document.querySelector<HTMLInputElement>('#personA-name')!;

const personBNameInput =
  document.querySelector<HTMLInputElement>('#personB-name')!;

const radioPersonASpan =
  document.querySelector<HTMLSpanElement>('#radio-personA')!;

const radioPersonBSpan =
  document.querySelector<HTMLSpanElement>('#radio-personB')!;

const Forminput =
  document.querySelector<HTMLFormElement>('#expense-form')!;

const ulElement =
  document.querySelector<HTMLUListElement>('#posts-list')!;

const percentageContainer =
  document.querySelector<HTMLDivElement>('#percentage-container')!;

  const personARemainingEl =
  document.querySelector<HTMLSpanElement>('#personA-remaining')!;

const personBRemainingEl =
  document.querySelector<HTMLSpanElement>('#personB-remaining')!;

// ======================
// HELPERS
// ======================

const getPersonName = (person: 'A' | 'B'): string => {
  return person === 'A'
    ? personANameInput.value || 'Person A'
    : personBNameInput.value || 'Person B';
};

const calculateTotalExpenses = () => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

const calculateTotalIncome = () => {
  return incomes.personA + incomes.personB;
};

const calculatePaidPerPerson = () => {
  let paidA = 0;
  let paidB = 0;

  expenses.forEach(expense => {
    if (expense.paidBy === 'A') {
      paidA += expense.amount;
    } else {
      paidB += expense.amount;
    }
  });

  return { A: paidA, B: paidB };
};


// ======================
// RENDER
// ======================

const renderExpenses = () => {
  ulElement.innerHTML = '';

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');

    li.textContent =
      `${expense.description} - ${expense.category} - ${expense.amount} kr (${getPersonName(expense.paidBy)})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Ta bort';

    deleteButton.addEventListener('click', () => {
      expenses.splice(index, 1);
      renderExpenses();
      updateSummary();
      saveToLocalStorage();
    });

    li.appendChild(deleteButton);
    ulElement.appendChild(li);
  });
};

// ======================
// SUMMARY
// ======================

const updateSummary = () => {
  const totalExpenses = calculateTotalExpenses();
  const totalIncome = calculateTotalIncome();
  const paid = calculatePaidPerPerson();

  // Totals
  totalExpenseEl.textContent = totalExpenses.toLocaleString('sv-SE');
  totalIncomeEl.textContent = totalIncome.toLocaleString('sv-SE');

  personATotalEl.textContent = paid.A.toLocaleString('sv-SE');
  personBTotalEl.textContent = paid.B.toLocaleString('sv-SE');

  // Balance
  const balance = totalIncome - totalExpenses;
  balanceEl.textContent = balance.toLocaleString('sv-SE');
  balanceEl.style.color = balance >= 0 ? 'green' : 'red';

  // ======================
  // SPLIT LOGIC
  // ======================

  let personAShare = 0;
  let personBShare = 0;

  const selectedMode =
    document.querySelector<HTMLInputElement>(
      'input[name="splitMode"]:checked'
    )!.value;

  if (selectedMode === 'percentage') {
    const splitPercentage = Number(splitPercentageInput.value);
    personAShare = totalExpenses * (splitPercentage / 100);
    personBShare = totalExpenses - personAShare;
  } else {
    // Lika mycket kvar
    personAShare =
      (totalExpenses + incomes.personA - incomes.personB) / 2;
    personBShare = totalExpenses - personAShare;
  }

  // ======================
  // SWISH LOGIC
  // ======================

  const diffA = paid.A - personAShare;
  const diffB = paid.B - personBShare;

  if (diffA > 0) {
    settlementResultEl.textContent =
      `${getPersonName('B')} ska swisha ${getPersonName('A')} ${diffA.toLocaleString('sv-SE')} kr`;
  } else if (diffB > 0) {
    settlementResultEl.textContent =
      `${getPersonName('A')} ska swisha ${getPersonName('B')} ${diffB.toLocaleString('sv-SE')} kr`;
  } else {
    settlementResultEl.textContent = 'Ingen behöver swisha.';
  }

  // ======================
  // REMAINING AFTER SWISH
  // ======================

  const remainingA = incomes.personA - personAShare;
  const remainingB = incomes.personB - personBShare;

  personARemainingEl.textContent =
    `${getPersonName('A')} har kvar: ${remainingA.toLocaleString('sv-SE')} kr`;

  personBRemainingEl.textContent =
    `${getPersonName('B')} har kvar: ${remainingB.toLocaleString('sv-SE')} kr`;

  personARemainingEl.style.color =
    remainingA < 0 ? 'red' : 'inherit';

  personBRemainingEl.style.color =
    remainingB < 0 ? 'red' : 'inherit';
};
// ======================
// EVENTS
// ======================

// Render categories
categories.expenses.forEach(category => {
  const option = document.createElement('option');
  option.value = category.value;
  option.textContent = category.text;
  categoryinput.appendChild(option);
});

// Name updates
personANameInput.addEventListener('input', () => {
  radioPersonASpan.textContent =
    personANameInput.value || 'Person A';
  updateSummary();
});

personBNameInput.addEventListener('input', () => {
  radioPersonBSpan.textContent =
    personBNameInput.value || 'Person B';
  updateSummary();
});

// Income updates
personAIncomeInput.addEventListener('input', () => {
  incomes.personA = Number(personAIncomeInput.value);
  saveIncomesToLocalStorage();
  updateSummary();
});

personBIncomeInput.addEventListener('input', () => {
  incomes.personB = Number(personBIncomeInput.value);
  saveIncomesToLocalStorage();
  updateSummary();
});

// Split mode change
splitModeInputs.forEach(input => {
  input.addEventListener('change', () => {

    const selectedMode =
      document.querySelector<HTMLInputElement>('input[name="splitMode"]:checked')!.value;

    if (selectedMode === 'percentage') {
      percentageContainer.style.display = 'block';
    } else {
      percentageContainer.style.display = 'none';
    }

    updateSummary();
  });
});
// Split percentage change
splitPercentageInput.addEventListener('input', updateSummary);

// Submit expense
Forminput.addEventListener('submit', (event) => {
  event.preventDefault();

  const paidBy =
    document.querySelector<HTMLInputElement>('input[name="paidBy"]:checked')!.value;

  const expense: IExpense = {
    amount: Number(amountinput.value),
    description: descriptioninput.value,
    category: categoryinput.value,
    paidBy: paidBy as 'A' | 'B'
  };

  expenses.push(expense);

  Forminput.reset();
  renderExpenses();
  updateSummary();
  saveToLocalStorage();
});


// ======================
// LOCAL STORAGE
// ======================

function saveToLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function readFromLocalStorage() {
  const saved = localStorage.getItem('expenses');
  if (saved) {
    expenses = JSON.parse(saved);
  }
}

function saveIncomesToLocalStorage() {
  localStorage.setItem('incomes', JSON.stringify(incomes));
}

function readIncomesFromLocalStorage() {
  const saved = localStorage.getItem('incomes');
  if (!saved) return;

  const parsed = JSON.parse(saved);
  incomes.personA = parsed.personA || 0;
  incomes.personB = parsed.personB || 0;

  personAIncomeInput.value = String(incomes.personA);
  personBIncomeInput.value = String(incomes.personB);
}


// ======================
// INIT
// ======================

readFromLocalStorage();
readIncomesFromLocalStorage();
renderExpenses();
updateSummary();