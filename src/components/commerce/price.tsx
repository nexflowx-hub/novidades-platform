import { formatMoney, type SupportedCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceProps {
  price: number;
  currency?: SupportedCurrency;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  paymentHint?: string;
}

export function Price({
  price,
  currency = "BRL",
  originalPrice,
  size = "md",
  className,
  paymentHint,
}: PriceProps) {
  const priceClass = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  }[size];

  return (
    <div className={cn("leading-tight", className)}>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={cn("font-extrabold tracking-tight", priceClass)}>
          {formatMoney(price, currency)}
        </span>
        {originalPrice && originalPrice > price ? (
          <span className="text-xs text-faint line-through">
            {formatMoney(originalPrice, currency)}
          </span>
        ) : null}
      </div>
      {paymentHint ? (
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {paymentHint}
        </p>
      ) : null}
    </div>
  );
}
