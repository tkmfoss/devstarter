/**
 * Category definitions and filtering logic for DevStarter.
 *
 * Keeping the category list here means both the filter buttons and the
 * rendering code use one source of truth.
 */

export const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "programming", label: "Programming" },
  { key: "web-development", label: "Web Development" },
  { key: "git-github", label: "Git & GitHub" },
  { key: "design", label: "Design" },
  { key: "tools-deployment", label: "Tools & Deployment" },
];

/**
 * Return the human-friendly label associated with a category key.
 *
 * If the key is not defined in `CATEGORIES`, the key itself is returned.
 *
 * @param {string} categoryKey - The category key to look up.
 * @returns {string} The matching category label, or the original key.
 */
export function getCategoryLabel(categoryKey) {
  const match = CATEGORIES.find((category) => category.key === categoryKey);
  return match ? match.label : categoryKey;
}

/**
 * Filter resources to those in the selected category.
 * An empty or "all" category returns the full list unchanged.
 *
 * @template T
 * @param {T[]} resources - The resources to filter; each resource has a `category` field.
 * @param {string} category - The category key to match, or "all"/an empty value for every resource.
 * @returns {T[]} The resources matching the selected category.
 */
export function filterByCategory(resources, category) {
  const selectedCategory = category || "all";
  if (selectedCategory === "all") {
    return resources;
  }
  return resources.filter((resource) => resource.category === selectedCategory);
}
