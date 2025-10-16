/**
 * Format a MongoDB createdAt timestamp into a readable date string.
 * Example: "2025-10-15T16:52:57.990Z" → "Oct 15, 2025"
 */
export function formatCreatedAtDate(isoDate: string): string {
  const date = new Date(isoDate);

  // Format options for "Mon DD, YYYY"
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}
