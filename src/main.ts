
// @ts-nocheck


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


import './style.scss';


let expenses = [];

const amountinput =document.querySelector('#expense-amount');
const descriptioninput =document.querySelector('#expense-description');
const categoryinput =document.querySelector('#expense-category');
const Forminput =document.querySelector('#expense-form');
const ulElement = document.querySelector('#posts-list');
const totalExpenseEl = document.querySelector('#total-expense');


Forminput.addEventListener('submit', function(event){
  event.preventDefault();

const amount =Number(amountinput.value);
const description =descriptioninput.value;
const category =categoryinput.value;

const expense = {
  amount: amount,
  description: description,
  category: category,
  paidBy: "A" // Hardcoded for now, can be dynamic later

};

expenses.push(expense);
renderExpenses();
updateSummary();


console.log('form submitted');
console.log('Expenses Array:', expenses);
console.log(amountinput.value)
console.log(descriptioninput.value)
console.log(categoryinput.value)

});

const renderExpenses = () => {
  ulElement.innerHTML = '';

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');

    li.textContent = `${expense.description} - ${expense.category} - ${expense.amount} kr (Person ${expense.paidBy})`;
     
    const deleteButton = document.createElement('button');
     deleteButton.textContent = 'Ta bort';
     
     deleteButton.addEventListener('click', function() {
       expenses.splice(index, 1);
       renderExpenses();
       updateSummary();
     });
    li.appendChild(deleteButton);
    ulElement.appendChild(li);
  });
};

const updateSummary = () => {
  const totalExpenses = calculateTotalExpenses();
  totalExpenseEl.textContent = totalExpenses.toLocaleString('sv-SE');
};


const calculateTotalExpenses = () => {
  let total = 0;

  expenses.forEach(expense => {
    total += expense.amount;
  });

  return total;
};

