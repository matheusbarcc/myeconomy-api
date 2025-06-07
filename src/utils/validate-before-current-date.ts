import { BudgetBeforeCurrentDateError } from "@/services/errors/budget-before-current-date-error";
import { ExpenseBeforeCurrentDateError } from "@/services/errors/expense-before-current-date-error";
import dayjs from "dayjs";

export function validateBeforeCurrentDate(
  date: Date,
  type: "budget" | "expense"
) {
  const currentYear = new Date().getUTCFullYear();
  const currentMonth = new Date().getUTCMonth();

  if (date.getUTCFullYear() < currentYear) {
    if (type === "budget") {
      throw new BudgetBeforeCurrentDateError();
    } else {
      throw new ExpenseBeforeCurrentDateError();
    }
  }

  if (
    date.getUTCFullYear() === currentYear &&
    date.getUTCMonth() < currentMonth
  ) {
    if (type === "budget") {
      throw new BudgetBeforeCurrentDateError();
    } else {
      throw new ExpenseBeforeCurrentDateError();
    }
  }
}
