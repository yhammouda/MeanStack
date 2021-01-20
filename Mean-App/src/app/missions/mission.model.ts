export interface Mission {
  id: string;
  title: string;
  creator: string;
  transactions: Transaction[];
  status: string;
  totalAmount:number;
}


export interface Transaction {
  id: string;
  date: Date;
  typeOfFees: string; /*drop down list*/
  label: string;
  amount: number;
  imagePath: File | string;
  transactionType: string; /*cash or credit or debit*/
  description:string;
}
