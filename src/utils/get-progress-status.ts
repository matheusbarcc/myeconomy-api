export function getProgressStatus(date: Date) {
  const currentYear = new Date().getUTCFullYear();
  const currentMonth = new Date().getUTCMonth();

  if (date.getUTCFullYear() < currentYear) {
    return "completed";
  }

  if (date.getUTCFullYear() > currentYear) {
    return "pending";
  }

  if (
    date.getUTCFullYear() === currentYear &&
    date.getUTCMonth() < currentMonth
  ) {
    return "completed";
  }

  if (
    date.getUTCFullYear() === currentYear &&
    date.getUTCMonth() === currentMonth
  ) {
    return "ongoing";
  }

  if (
    date.getUTCFullYear() === currentYear &&
    date.getUTCMonth() > currentMonth
  ) {
    return "pending";
  }
}
