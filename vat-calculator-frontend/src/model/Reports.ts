export type lineChartDataType = {
  day: string;
  total: number;
};

export type TodayReportType = {
  totalSales: number;
  totalCollected: number;
  totalPurchase: number;
  totalPurchaseCount: number;
  profit: number;
  outstandingCreditList: OutstandingCreditListType[];
  popularItems: popularItemType[];
};

export type FilteredReportType = {
  transactions: lineChartDataType[];
  purchases: lineChartDataType[];
};

export type OutstandingCreditListType = {
  createdAt: string;
  totalAmount: number;
  remainingAmount: number;
};

export type popularItemType = {
  name: string;
  itemId: number;
  total: number;
};
