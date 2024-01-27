export class TransactionFiltersDto {
  date?: string;
  type?: TransactionType;
}

export enum TransactionType {
  all = 'all',
  creditOnly = 'creditOnly',
  vatOnly = 'vatOnly',
  nonVatOnly = 'nonVatOnly',
}
