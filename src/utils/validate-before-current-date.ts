import { BudgetBeforeCurrentDateError } from "@/services/errors/budget-before-current-date-error";

export function validateBeforeCurrentDate(date: Date) {
  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getUTCFullYear();

  if (
    date.getUTCMonth() < currentMonth &&
    date.getUTCFullYear() <= currentYear
  ) {
    throw new BudgetBeforeCurrentDateError();
  }
}
