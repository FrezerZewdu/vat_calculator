export type TransactionListType = {
  id: number;
  createdAt: string;
  creditCloseDate: string;
  totalAmount: number;
  remainingAmount: number;
  isVat: boolean;
  void: boolean;
  voidDate: boolean;
  soldItems: SoldItemsType[];
  creditPayments: CreditRecordType[];
};

export type SoldItemsType = {
  transactionId: number;
  itemId: number;
  unitPrice: number;
  quantity: number;
  isVat: false;
  item: item;
};

export type item = {
  name: string;
  unit: string;
};

export type CreditRecordType = {
  transactionId: number;
  date: string;
  amountPayed: number;
  fileLocation: string;
};

export type CreateCreditRecordType = {
  transactionId: number;
  amountPayed: number;
  file?: File;
};

export interface TransactionFilters {
  page: number;
  perPage: number;
  date: string;
  type: string;
}
