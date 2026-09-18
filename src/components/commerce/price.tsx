import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showInstallment?: boolean;
}

export function Price({
  price,
  originalPrice,
  size = "md",
  className,
  showInstallment = true,
}: PriceProps) {
  const priceClass = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  }[size];

  return (
    <div className={cn("leading-tight", className)}>
      <div className="flex items-baseline gap-2">
        <span className={cn("font-extrabold tracking-tight", priceClass)}>
          {formatBRL(price)}
        </span>
        {originalPrice && originalPrice > price ? (
          <span className="text-xs text-faint line-through">
            {formatBRL(originalPrice)}
          </span>
        ) : null}
      </div>
      {showInstallment ? (
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          ou 12x de {formatBRL(price / 12)}
        </p>
      ) : null}
    </div>
  );
}
