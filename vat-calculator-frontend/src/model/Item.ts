export type ItemListType = {
  id: number;
  name: string;
  unit: string;
  currentPrice: number;
  inStock: number;
  inStockVat: number;
  isActive: boolean;
  createdBy: number;
};

export type ItemDetailType = {
  id: number;
  name: string;
  inStock: object;
  soldItem: object;
  isActive: boolean;
  currentPrice: number;
  revenue: number;
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
  currentPrice: number;
  inStock: number;
  inStockVat: number;
  isActive: boolean;
  createdBy: number;
  unitPrice: number;
  quantity: number;
  isVat: boolean;
};

export interface ItemsFetchFilter {
  page: number;
  perPage: number;
  search: string;
}
