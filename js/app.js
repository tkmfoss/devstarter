/**
 * DevStarter — application entry point.
 *
 * Wires the UI together:
 * - Loads resources from the local data modules.
 * - Renders them as cards in the grid.
 * - Handles search input and category filter clicks.
 * - Shows or hides the empty state.
 *
 * Pure helpers live in js/search.js and js/filters.js; theme handling lives in js/theme.js.
 */
import { initTheme } from "./theme.js";
import { filterByCategory, getCategoryLabel } from "./filters.js";
import { filterBySearch } from "./search.js";
import { programmingResources } from "./data/resources/programming.js";
import { webDevelopmentResources } from "./data/resources/web-development.js";
import { gitGithubResources } from "./data/resources/git-github.js";
import { designResources } from "./data/resources/design.js";
import { toolsDeploymentResources } from "./data/resources/tools-deployment.js";

/** All resources that the app knows about, from every category module. */
const allResources = [
  ...programmingResources,
  ...webDevelopmentResources,
  ...gitGithubResources,
  ...designResources,
  ...toolsDeploymentResources,
];

let currentCategory = "all";
let currentQuery = "";

/** Apply search + category filters and return the final list. */
function getVisibleResources() {
  const categoryResources = filterByCategory(allResources, currentCategory);
  const searchedResources = filterBySearch(categoryResources, currentQuery);
  return searchedResources;
}

/** Create an external resource link element. */
function createExternalLink(resource) {
  if (!resource.url) {
    return null;
  }

  const link = document.createElement("a");
  link.className = "resource-card__link";
  link.href = resource.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("class", "icon icon-external");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "2");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("focusable", "false");

  const firstPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  firstPath.setAttribute("d", "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6");
  icon.appendChild(firstPath);

  const secondPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  secondPath.setAttribute("d", "M15 3h6v6");
  icon.appendChild(secondPath);

  const thirdPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  thirdPath.setAttribute("d", "M10 14 21 3");
  icon.appendChild(thirdPath);

  link.appendChild(icon);
  link.appendChild(document.createTextNode("Visit resource"));

  return link;
}

/** Create a full resource card element from a data object. */
function createResourceCard(resource) {
  const card = document.createElement("article");
  card.className = "resource-card";

  const title = document.createElement("h3");
  title.className = "resource-card__title";
  title.textContent = resource.title ?? "Untitled resource";

  const description = document.createElement("p");
  description.className = "resource-card__description";
  description.textContent = resource.description ?? "No description available.";

  const tags = document.createElement("ul");
  tags.className = "resource-card__tags";
  const tagList = Array.isArray(resource.tags) ? resource.tags : [];
  tagList.forEach((tag) => {
    const tagElement = document.createElement("li");
    tagElement.className = "resource-card__tag";
    tagElement.textContent = tag;
    tags.appendChild(tagElement);
  });

  const footer = document.createElement("div");
  footer.className = "resource-card__footer";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = getCategoryLabel(resource.category);

  footer.appendChild(badge);

  const link = createExternalLink(resource);
  if (link) {
    footer.appendChild(link);
  }

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(tags);
  card.appendChild(footer);

  return card;
}

/** Render the resource grid, or show the empty state when nothing matches. */
function renderResources(resources) {
  const grid = document.getElementById("resource-grid");
  const emptyState = document.getElementById("empty-state");
  const emptyStateMessage = document.getElementById("empty-state-message");

  console.log("[DevStarter] Rendering resources:", resources.length);

  grid.textContent = ""; // clears previous cards safely

  if (resources.length === 0) {
    emptyStateMessage.textContent =
      "We could not find any resources matching your search. Try different keywords or pick another category.";

    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  resources.forEach((resource) => {
    grid.appendChild(createResourceCard(resource));
  });
}

/** Re-render the list whenever search or category state changes. */
function refreshResources() {
  renderResources(getVisibleResources());
}

/** Handle free-text search input changes. */
function handleSearchChange(event) {
  currentQuery = event.target.value;
  console.log("[DevStarter] Search query changed:", currentQuery);
  refreshResources();
}

/** Handle category button clicks from the filter group. */
function handleCategoryClick(event) {
  const button = event.target.closest(".filter-button");
  if (!button) {
    return;
  }

  const clickedCategory = button.dataset.category || "all";

  // Clicking the active category again returns to the "all" view.
  if (clickedCategory === currentCategory && clickedCategory !== "all") {
    currentCategory = "all";
  } else {
    currentCategory = clickedCategory;
  }

  console.log("[DevStarter] Category changed:", currentCategory);
  updateCategoryButtons();
  refreshResources();
}

/** Keep button active state and ARIA state in sync. */
function updateCategoryButtons() {
  const filterGroup = document.getElementById("category-filters");
  const buttons = filterGroup.querySelectorAll(".filter-button");

  buttons.forEach((button) => {
    const isSelected = button.dataset.category === currentCategory;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

/** Wire up all interactive behaviour for the DevStarter app. */
function initApp() {
  console.log("[DevStarter] Initialising application");
  initTheme();

  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const categoryFilters = document.getElementById("category-filters");
  const emptyStateReset = document.getElementById("empty-state-reset");

  searchForm.addEventListener("submit", (event) => event.preventDefault());
  searchInput.addEventListener("input", handleSearchChange);
  categoryFilters.addEventListener("click", handleCategoryClick);

  emptyStateReset.addEventListener("click", () => {
    currentQuery = "";
    currentCategory = "all";
    updateCategoryButtons();
    searchInput.value = "";
    refreshResources();
  });

  updateCategoryButtons();
  refreshResources();
}

initApp();
