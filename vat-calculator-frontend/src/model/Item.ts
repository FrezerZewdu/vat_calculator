export type ItemListType = {
  id: number;
  name: string;
  unit: string;
  isActive: boolean;
  createdBy: number;
  inventoryRecords: InventoryRecords[];
  soldItems: SoldItems[];
  vatStock: number;
  normalStock: number;
  latestPrice: number;
};

export type InventoryRecords = {
  isVat: boolean;
  quantity: number;
  unitPrice: number;
  startDate: string;
};

export type SoldItems = {
  isVat: boolean;
  quantity: number;
  unitPrice: number;
  transaction: TransactionDate;
};

export type TransactionDate = {
  createdAt: string;
};

export type CreateItemType = {
  name: string;
  unit: string;
  createdBy: number;
};

export type SaleItemsType = {
  id: number;
  name: string;
  unit: string;
  isActive: boolean;
  createdBy: number;
  vatStock: number;
  normalStock: number;
  latestPrice: number;
  unitPrice: number;
  quantity: number;
  isVat: boolean | undefined;
};

export type SaleInformation = {
  grandTotal: number;
  upFrontPayment: number;
};
export interface ItemsFetchFilter {
  page: number;
  perPage: number;
  search: string;
}
