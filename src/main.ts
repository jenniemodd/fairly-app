
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

import categories from './categories.json'
import './style.scss'
import type { IExpense } from './models'

// ======================
// STATE
// ======================

const getCategoryLabel = (value: string) => {
  const found = categories.expenses.find(c => c.value === value)
  return found ? found.text : value
}

let expenses: IExpense[] = []

const incomes = {
  personA: 0,
  personB: 0
}

// ======================
// DOM
// ======================

const amountInput =
  document.querySelector<HTMLInputElement>('#expense-amount')!

const descriptionInput =
  document.querySelector<HTMLInputElement>('#expense-description')!

const categoryInput =
  document.querySelector<HTMLSelectElement>('#expense-category')!

const splitPercentageInput =
  document.querySelector<HTMLInputElement>('#split-percentage')!

const percentageContainer =
  document.querySelector<HTMLDivElement>('#percentage-container')!

const splitModeInputs =
  document.querySelectorAll<HTMLInputElement>('input[name="splitMode"]')

const totalExpenseEl =
  document.querySelector<HTMLSpanElement>('#total-expense')!

const totalIncomeEl =
  document.querySelector<HTMLSpanElement>('#total-income')!

const balanceEl =
  document.querySelector<HTMLSpanElement>('#balance-amount')!

const personATotalEl =
  document.querySelector<HTMLSpanElement>('#personA-total')!

const personBTotalEl =
  document.querySelector<HTMLSpanElement>('#personB-total')!

const settlementResultEl =
  document.querySelector<HTMLParagraphElement>('#settlement-result')!

const personARemainingEl =
  document.querySelector<HTMLSpanElement>('#personA-remaining')!

const personBRemainingEl =
  document.querySelector<HTMLSpanElement>('#personB-remaining')!

const personAIncomeInput =
  document.querySelector<HTMLInputElement>('#personA-income')!

const personBIncomeInput =
  document.querySelector<HTMLInputElement>('#personB-income')!

const personANameInput =
  document.querySelector<HTMLInputElement>('#personA-name')!

const personBNameInput =
  document.querySelector<HTMLInputElement>('#personB-name')!

const radioPersonASpan =
  document.querySelector<HTMLSpanElement>('#radio-personA')!

const radioPersonBSpan =
  document.querySelector<HTMLSpanElement>('#radio-personB')!

const form =
  document.querySelector<HTMLFormElement>('#expense-form')!

const ulElement =
  document.querySelector<HTMLUListElement>('#posts-list')!

// ======================
// HELPERS
// ======================

const getPersonName = (person: 'A' | 'B') =>
  person === 'A'
    ? personANameInput.value || 'Person A'
    : personBNameInput.value || 'Person B'

const calculateTotalExpenses = () =>
  expenses.reduce((sum, e) => sum + e.amount, 0)

const calculateTotalIncome = () =>
  incomes.personA + incomes.personB

const calculatePaidPerPerson = () => {
  let paidA = 0
  let paidB = 0

  expenses.forEach(e => {
    if (e.paidBy === 'A') paidA += e.amount
    else paidB += e.amount
  })

  return { A: paidA, B: paidB }
}

// ======================
// RENDER
// ======================

const renderExpenses = () => {
  ulElement.innerHTML = ''

  expenses.forEach((expense, index) => {
    const li = document.createElement('li')

    // Vänster text
    const left = document.createElement('span')
    left.textContent =
  expense.description
    ? `${getCategoryLabel(expense.category)} – ${expense.description} (${getPersonName(expense.paidBy)})`
    : `${getCategoryLabel(expense.category)} (${getPersonName(expense.paidBy)})`

    // Belopp
    const amount = document.createElement('strong')
    amount.textContent =
      `${expense.amount.toLocaleString('sv-SE')} kr`

    // Delete-knapp (DU SAKNADE DENNA)
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Ta bort'

    deleteButton.addEventListener('click', () => {
      expenses.splice(index, 1)
      saveExpenses()
      renderExpenses()
      updateSummary()
    })

    // Lägg in allt i li
    li.appendChild(left)
    li.appendChild(amount)
    li.appendChild(deleteButton)

    ulElement.appendChild(li)
  })
}

// ======================
// SUMMARY
// ======================

const updateSummary = () => {
  const totalExpenses = calculateTotalExpenses()
  const totalIncome = calculateTotalIncome()
  const paid = calculatePaidPerPerson()

  totalExpenseEl.textContent =
    totalExpenses.toLocaleString('sv-SE')

  totalIncomeEl.textContent =
    totalIncome.toLocaleString('sv-SE')

  personATotalEl.textContent =
    paid.A.toLocaleString('sv-SE')

  personBTotalEl.textContent =
    paid.B.toLocaleString('sv-SE')

  const balance = totalIncome - totalExpenses
  balanceEl.textContent =
    balance.toLocaleString('sv-SE')
  balanceEl.style.color =
    balance >= 0 ? 'green' : 'red'

  const selectedMode =
    document.querySelector<HTMLInputElement>(
      'input[name="splitMode"]:checked'
    )!.value

  let personAShare = 0
  let personBShare = 0

  // =========================
  // 1️⃣ PROCENT
  // =========================
  if (selectedMode === 'percentage') {

    const splitPercentage =
      Number(splitPercentageInput.value)

    personAShare =
      Math.round(totalExpenses * (splitPercentage / 100))

    personBShare =
      totalExpenses - personAShare
  }

  // =========================
  // 2️⃣ LIKA MYCKET KVAR (Excel-modell)
  // =========================
  else if (selectedMode === 'equalIncome') {

    const remainingA =
      incomes.personA - paid.A

    const remainingB =
      incomes.personB - paid.B

    const target =
      Math.round((remainingA + remainingB) / 2)

    const diffA = remainingA - target
    const diffB = remainingB - target

    if (diffA > 0) {
      settlementResultEl.innerHTML =
        `<strong>${getPersonName('A')}</strong> ska swisha <strong>${getPersonName('B')}</strong> ${Math.round(diffA).toLocaleString('sv-SE')} kr`
    }
    else if (diffB > 0) {
      settlementResultEl.innerHTML =
        `<strong>${getPersonName('B')}</strong> ska swisha <strong>${getPersonName('A')}</strong> ${Math.round(diffB).toLocaleString('sv-SE')} kr`
    }
    else {
      settlementResultEl.textContent =
        'Ingen behöver swisha.'
    }

    personARemainingEl.textContent =
      `${getPersonName('A')} har kvar: ${target.toLocaleString('sv-SE')} kr`

    personBRemainingEl.textContent =
      `${getPersonName('B')} har kvar: ${target.toLocaleString('sv-SE')} kr`

    return
  }

  // =========================
  // 3️⃣ GEMENSAM POTT
  // =========================
  else if (selectedMode === 'sharedPool') {

    const totalRemaining =
      totalIncome - totalExpenses

    const equalRemaining =
      Math.round(totalRemaining / 2)

    personAShare =
      incomes.personA - equalRemaining

    personBShare =
      incomes.personB - equalRemaining
  }

  // =========================
  // SWISH (för 1 & 3)
  // =========================

  const diffA = paid.A - personAShare
  const diffB = paid.B - personBShare

  if (diffA > 0) {
    settlementResultEl.innerHTML =
      `<strong>${getPersonName('B')}</strong> ska swisha <strong>${getPersonName('A')}</strong> ${Math.round(diffA).toLocaleString('sv-SE')} kr`
  }
  else if (diffB > 0) {
    settlementResultEl.innerHTML =
      `<strong>${getPersonName('A')}</strong> ska swisha <strong>${getPersonName('B')}</strong> ${Math.round(diffB).toLocaleString('sv-SE')} kr`
  }
  else {
    settlementResultEl.textContent =
      'Ingen behöver swisha.'
  }

  const remainingA =
    Math.round(incomes.personA - personAShare)

  const remainingB =
    Math.round(incomes.personB - personBShare)

  personARemainingEl.textContent =
    `${getPersonName('A')} har kvar: ${remainingA.toLocaleString('sv-SE')} kr`

  personBRemainingEl.textContent =
    `${getPersonName('B')} har kvar: ${remainingB.toLocaleString('sv-SE')} kr`
}

// ======================
// LOCAL STORAGE
// ======================

function saveExpenses() {
  localStorage.setItem(
    'expenses',
    JSON.stringify(expenses)
  )
}

function saveIncomes() {
  localStorage.setItem(
    'incomes',
    JSON.stringify(incomes)
  )
}

function saveNames() {
  localStorage.setItem(
    'names',
    JSON.stringify({
      personA: personANameInput.value,
      personB: personBNameInput.value
    })
  )
}

function saveSplitSettings() {
  localStorage.setItem(
    'splitSettings',
    JSON.stringify({
      mode: document.querySelector<HTMLInputElement>(
        'input[name="splitMode"]:checked'
      )!.value,
      percentage: splitPercentageInput.value
    })
  )
}

function loadFromStorage() {

  const savedExpenses =
    localStorage.getItem('expenses')
  if (savedExpenses)
    expenses = JSON.parse(savedExpenses)

  const savedIncomes =
    localStorage.getItem('incomes')
  if (savedIncomes) {
    const parsed =
      JSON.parse(savedIncomes)
    incomes.personA = parsed.personA || 0
    incomes.personB = parsed.personB || 0
    personAIncomeInput.value =
      String(incomes.personA)
    personBIncomeInput.value =
      String(incomes.personB)
  }

  const savedNames =
    localStorage.getItem('names')
  if (savedNames) {
    const parsed =
      JSON.parse(savedNames)
    personANameInput.value =
      parsed.personA || ''
    personBNameInput.value =
      parsed.personB || ''
  }

  const savedSplit =
    localStorage.getItem('splitSettings')
  if (savedSplit) {
    const parsed =
      JSON.parse(savedSplit)
    document.querySelector<HTMLInputElement>(
      `input[name="splitMode"][value="${parsed.mode}"]`
    )!.checked = true

    splitPercentageInput.value =
      parsed.percentage
  }
}

// ======================
// EVENTS
// ======================

categories.expenses.forEach(category => {
  const option =
    document.createElement('option')
  option.value = category.value
  option.textContent = category.text
  categoryInput.appendChild(option)
})

personANameInput.addEventListener('input', () => {
  radioPersonASpan.textContent =
    personANameInput.value || 'Person A'
  saveNames()
  updateSummary()
})

personBNameInput.addEventListener('input', () => {
  radioPersonBSpan.textContent =
    personBNameInput.value || 'Person B'
  saveNames()
  updateSummary()
})

personAIncomeInput.addEventListener('input', () => {
  incomes.personA =
    Number(personAIncomeInput.value)
  saveIncomes()
  updateSummary()
})

personBIncomeInput.addEventListener('input', () => {
  incomes.personB =
    Number(personBIncomeInput.value)
  saveIncomes()
  updateSummary()
})

splitModeInputs.forEach(input => {
  input.addEventListener('change', () => {

    const mode =
      document.querySelector<HTMLInputElement>(
        'input[name="splitMode"]:checked'
      )!.value

    percentageContainer.style.display =
      mode === 'percentage'
        ? 'block'
        : 'none'

    saveSplitSettings()
    updateSummary()
  })
})

splitPercentageInput.addEventListener('input', () => {
  saveSplitSettings()
  updateSummary()
})

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const paidBy =
    document.querySelector<HTMLInputElement>(
      'input[name="paidBy"]:checked'
    )!.value

  const expense: IExpense = {
    amount: Number(amountInput.value),
    description: descriptionInput.value,
    category: categoryInput.value,
    paidBy: paidBy as 'A' | 'B'
  }

  expenses.push(expense)
  saveExpenses()
  form.reset()
  renderExpenses()
  updateSummary()
})

// ======================
// INIT
// ======================

loadFromStorage()
renderExpenses()
updateSummary()