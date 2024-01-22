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
  name: string;
  unitPrice: number;
  quantity: number;
  isVat: boolean;
};

export type CreditRecordType = {
  amountPayed: number;
  file: string;
};

export interface TransactionFilters {
  page: number;
  perPage: number;
  date: string;
  type: string;
}
