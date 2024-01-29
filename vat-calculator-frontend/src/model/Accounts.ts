export type AccountType = {
  id: number;
  name: string;
  email: string;
  role: string;
  expiryDate: string;
};

export type AccountFilterType = {
  page: number;
  perPage: number;
  search: string;
};

export type LoginType = {
  email: string;
  password: string;
};
