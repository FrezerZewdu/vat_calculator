import { DATETIME_OPTIONS } from "./constant";

export function readableDate(rawDate: string): string {
  return rawDate != null
    ? new Date(rawDate).toLocaleDateString("en-US", DATETIME_OPTIONS)
    : "-";
}
