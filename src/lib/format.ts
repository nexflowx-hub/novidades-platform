export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatInstallment(price: number, months = 12): string {
  return `ou ${months}x de ${formatBRL(price / months)}`;
}

export function discountPercent(price: number, originalPrice: number): number {
  return Math.round((1 - price / originalPrice) * 100);
}
