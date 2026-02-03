
// @ts-nocheck


/*
PSEUDO KOD FÖR BUDGETAPP

1. Skapa grundläggande HTML-struktur
Skapa inputfält för inkomst med belopp och beskrivning.
Skapa inputfält för utgift med belopp och beskrivning.
Skapa dropdown-lista för kategori till varje budgetpost.
Skapa knappar för att lägga till inkomst och utgift.
Skapa en sektion där alla budgetposter visas.
Skapa en tydlig sektion där balansen visas.

2. Skapa datastrukturer i JavaScript
Skapa en lista där alla inkomster sparas.
Skapa en lista där alla utgifter sparas.
Varje post ska innehålla belopp, beskrivning och vald kategori.

3. Hantera inkomster
När användaren matar in en inkomst och klickar på lägg till:
Skapa en ny inkomstpost.
Lägg till posten i listan med inkomster.
Uppdatera listan som visas på sidan.
Räkna om balansen.

4. Hantera utgifter
När användaren matar in en utgift och klickar på lägg till:
Skapa en ny utgiftspost.
Lägg till posten i listan med utgifter.
Uppdatera listan som visas på sidan.
Räkna om balansen.

5. Visa budgetposter med radera-knapp
Visa varje inkomst och utgift i listan.
Bredvid varje post ska det finnas en radera-knapp.
När användaren klickar på radera:
Ta bort posten från rätt lista.
Uppdatera listan som visas.
Räkna om balansen.

6. Beräkna balansen
Varje gång inkomster eller utgifter ändras:
Räkna ihop alla inkomster.
Räkna ihop alla utgifter.
Räkna ut balansen som inkomster minus utgifter.

7. Visa och färgkoda balansen
Visa balansen tydligt på sidan.
Om balansen är positiv ska den visas i en positiv färg.
Om balansen är negativ ska den visas i en negativ färg.

8. Kategorier
Låt användaren välja kategori från en dropdown-lista.
Spara vald kategori tillsammans med varje budgetpost.
Visa kategorin i listan bredvid posten.

9. Förberedelse för local storage (implementeras senare)
Strukturera datan så att inkomster och utgifter enkelt kan sparas.
När local storage implementeras ska datan sparas vid varje förändring.
När sidan laddas ska sparad data läsas in och visas automatiskt.
*/






import './style.scss';


