export const DATETIME_OPTIONS = {
  weekday: "long" as const,
  year: "numeric" as const,
  month: "short" as const,
  day: "numeric" as const,
  hour: "numeric" as const,
  minute: "numeric" as const,
};
export const SHORT_DATETIME_OPTIONS = {
  hour: "numeric" as const,
  minute: "numeric" as const,
  day: "numeric" as const,
  month: "numeric" as const,
};

export const FETCH_SUCCESS_STATUS = 200;
export const POST_SUCCESS_STATUS = 201;
export const PUT_SUCCESS_STATUS = 202;
export const SERVER_ERROR_STATUS = 500;
export const UNAUTHORIZED_ERROR_STATUS = 401 | 403;
export const UNPROCESSABLE_CONTENT_STATUS = 422;

export const VAT_PERCENTAGE = 0.15;
