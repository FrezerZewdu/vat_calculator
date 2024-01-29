import { DATETIME_OPTIONS, SHORT_DATETIME_OPTIONS } from "./constant";

const filter = {
  shortDate(rawDate: Date): string {
    return rawDate != null
      ? new Date(rawDate).toLocaleDateString("en-US", SHORT_DATETIME_OPTIONS)
      : "-";
  },
  readableDate(rawDate: string): string {
    return rawDate != null
      ? new Date(rawDate).toLocaleDateString("en-US", DATETIME_OPTIONS)
      : "-";
  },
  formatPriceCurrency(value: number, currencyISO3: string) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyISO3,
    });
    return value != null ? formatter.format(value) : "-";
  },
};

export default filter;
