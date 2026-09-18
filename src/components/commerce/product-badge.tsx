import { BADGE_LABELS, type BadgeId } from "@/lib/data";
import { cn } from "@/lib/utils";

const BADGE_STYLES: Record<BadgeId, string> = {
  "mais-vendido": "bg-gold text-[#241B05]",
  novo: "bg-white text-foreground shadow-sm",
  "em-alta": "bg-brand text-white",
  oferta: "bg-sale text-white",
  tendencia: "bg-[#A67C3D] text-white",
};

export function ProductBadge({
  badge,
  className,
}: {
  badge: BadgeId;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm",
        BADGE_STYLES[badge],
        className
      )}
    >
      {BADGE_LABELS[badge]}
    </span>
  );
}
