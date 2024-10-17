export function formatCurrencyVND(amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  