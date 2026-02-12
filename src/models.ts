export interface IExpense {
  amount: number;
  description: string;
  category: string;
  paidBy: 'A' | 'B';
}
