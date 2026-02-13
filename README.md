[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/fEntiP9j)


# FAIRLY 💸

Fairly är en budgetapp för sambos som inte har gemensamt konto men vill dela på gemensamma utgifter på ett rättvist och transparent sätt.

Appen gör det enkelt att:

- Lägga till två personer
- Ange inkomster
- Registrera gemensamma utgifter
- Se vem som betalat vad
- Få en automatisk uträkning på vem som ska swisha vem

---

## 🚀 Live-demo

🔗 https://medieinstitutet.github.io/fed25d-js-inl-2-budget-app-jenniemodd/

---

## 🛠️ Funktioner

- Ange namn för Person A och Person B
- Ange inkomst per person
- Lägga till utgifter med:
  - Belopp
  - Beskrivning
  - Kategori
  - Vem som betalade
- Radera utgifter
- Automatisk uppdatering av:
  - Totala inkomster
  - Totala utgifter
  - Balans
  - Total utgift per person
- Dynamiskt swish-resultat
- Sparar data i LocalStorage
- Deployad med GitHub Actions till GitHub Pages

---

## 🧠 Teknisk implementation

Projektet är byggt med:

- Vite
- TypeScript
- HTML
- SCSS
- GitHub Actions (CI/CD)
- JSON
- Interface

---

## 📦 Data-struktur

Appen använder ett TypeScript-interface för att typa utgifter:

```ts
export interface IExpense {
  amount: number;
  description: string;
  category: string;
  paidBy: 'A' | 'B';
}
```

Alla utgifter sparas i en array:

```ts
let expenses: IExpense[] = [];
```

---

## 🔒 TypeScript

- DOM-element är typade med generics (t.ex. `HTMLInputElement`)
- `import type` används korrekt för interface
- Non-null assertion (`!`) används för säker DOM-hantering
- Bygget kör full TypeScript-check via `npm run build`

---

## 🔁 State & Rendering

Appen arbetar med:

- Ett centralt state (`expenses`)
- Separata inkomstvärden per person
- Dynamiska render-funktioner
- Automatisk summering vid varje förändring

---

## 💾 LocalStorage

- Alla utgifter sparas i LocalStorage
- Data läses in vid sidladdning
- UI renderas baserat på sparad state

---

## 📐 Struktur / Wireframe

```
-------------------------------------------------
|                   FAIRLY                    |
-------------------------------------------------

[ Personer ]
-------------------------------------------------
| Person A                    | Person B        |
|-----------------------------|-----------------|
| Namn:     [ Anna      ]     | Namn:  [ Erik ] |
| Inkomst:  [ 40 000    ]     | Inkomst:[13000] |
-------------------------------------------------

-------------------------------------------------
| Lägg till utgift                              |
-------------------------------------------------
| Belopp:       [            ]                  |
| Beskrivning:  [            ]                  |
| Kategori:     [ select ▾   ]                  |
| Vem betalade?                                 |
|   ( ) Person A   ( ) Person B                 |
| [ Lägg till ]                                 |
-------------------------------------------------

-------------------------------------------------
| Sammanställning                               |
-------------------------------------------------
Totala inkomster
Totala utgifter
Balans
Resultat: Vem ska swisha vem
-------------------------------------------------
```

---

## 🔮 Vidareutveckling

Planerade funktioner:

- Procentuell fördelning av utgifter
- "Lika mycket över"-beräkning
- Möjlighet att hantera flera månader
- Fler än två personer
- Export till PDF eller CSV

---

## 🎓 Syfte

Projektet är en del av en inlämningsuppgift i JavaScript / TypeScript där fokus låg på:

- DOM-manipulation
- State-hantering
- TypeScript-interfaces
- LocalStorage
- CI/CD med GitHub Actions
- Deploy till GitHub Pages

---

## 👩‍💻 Utvecklad av

Jennie Modd  
Frontend Developer Student