/**
 * Format a Date object into a human‑friendly string.
 * Example: 2025-08-19 → "Aug 19, 2025"
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
