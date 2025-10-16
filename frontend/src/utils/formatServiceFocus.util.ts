/**
 * Format the service focus string into readable text
 * @param {string} serviceFocus - One of: "sales", "administrative-support", "customer-service"
 * @returns {string} Formatted readable text (e.g., "Administrative Support")
 */
export function formatServiceFocus(serviceFocus: string): string {
  if (!serviceFocus) return "";

  // Define custom mappings for specific cases
  const customTitles: Record<string, string> = {
    sales: "Sales & Lead Generation",
    "administrative-support": "Administrative Support",
    "customer-service": "Customer Service",
  };

  // Return custom title if exists, otherwise apply generic formatter
  return (
    customTitles[serviceFocus] ||
    serviceFocus
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}
