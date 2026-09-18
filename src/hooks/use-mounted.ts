"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Evita mismatch de hidratação em valores persistidos (cart/favoritos):
 * retorna `false` no servidor e na primeira renderização, `true` depois.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
