/**
 * Search logic for DevStarter.
 *
 * A search term may contain several words (e.g. "flexbox grid").
 * Every word must appear in the resource haystack for it to match,
 * which keeps multi-word searches predictable.
 */

/** Build a lowercase haystack string from a resource's text fields. */
function buildResourceHaystack(resource) {
  return [
    resource.title ?? "",
    resource.description ?? "",
  ]
    .join(" ")
    .toLowerCase();
}

/**
 * Filter resources by a free-text search query.
 * Matches against title and description (case-insensitive).
 */
export function filterBySearch(resources, query) {

  const searchTerm = (query ?? "").toLowerCase();

  /**
   * @param {Array<objects>} resources - Resources to search
   * @param {string} query - User-entered search text.
   * @returns {Array<object>} Resources that match every search term.
   */
  // An empty query returns the full list.
  if (searchTerm.length === 0) {
    return resources;
  }

  const terms = searchTerm.split(/\s+/);

  return resources.filter((resource) => {
    const haystack = buildResourceHaystack(resource);
    return terms.every((term) => term.length > 0 && haystack.includes(term));
  });
}
