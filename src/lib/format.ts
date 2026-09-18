export type SupportedCurrency = "BRL" | "EUR" | "GBP" | "USD";

export function formatMoney(
  value: number,
  currency: SupportedCurrency = "BRL",
  locale?: string,
): string {
  const resolvedLocale =
    locale ??
    (currency === "BRL"
      ? "pt-BR"
      : currency === "EUR"
        ? "en-GB"
        : currency === "GBP"
          ? "en-GB"
          : "en-US");

  return new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatBRL(value: number): string {
  return formatMoney(value, "BRL", "pt-BR");
}

export function discountPercent(price: number, originalPrice: number): number {
  if (originalPrice <= 0 || price >= originalPrice) return 0;
  return Math.round((1 - price / originalPrice) * 100);
}
