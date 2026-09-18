import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Exibe avaliação. IMPORTANTE: os valores atuais são placeholders de
 * demonstração (spec.critical_notes) — nunca exibir avaliações reais
 * até que existam reviews reais no Commerce Core.
 */
export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  className,
}: RatingStarsProps) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      aria-label={`Avaliação ${rating.toFixed(1)} de 5`}
    >
      <div className="relative inline-flex" aria-hidden="true">
        <div className="flex gap-px text-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn(starSize, "fill-border")} strokeWidth={0} />
          ))}
        </div>
        <div
          className="absolute inset-0 flex gap-px overflow-hidden"
          style={{ width: `${pct}%` }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(starSize, "shrink-0 fill-rating text-rating")}
              strokeWidth={0}
            />
          ))}
        </div>
      </div>
      <span className={cn("font-semibold", size === "sm" ? "text-xs" : "text-sm")}>
        {rating.toFixed(1)}
      </span>
      {typeof reviewCount === "number" ? (
        <span
          className={cn(
            "text-muted-foreground",
            size === "sm" ? "text-xs" : "text-sm"
          )}
        >
          ({reviewCount})
        </span>
      ) : null}
    </div>
  );
}
