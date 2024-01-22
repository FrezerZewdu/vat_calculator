import { DATETIME_OPTIONS } from "./constant";

const filter = {
  readableDate(rawDate: string): string {
    return rawDate != null
      ? new Date(rawDate).toLocaleDateString("en-US", DATETIME_OPTIONS)
      : "-";
  },
};

export default filter;
