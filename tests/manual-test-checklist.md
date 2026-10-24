# DevStarter — Manual Test Checklist

Use this checklist to verify the core features of DevStarter before opening a pull request.

Run the site with a local HTTP server, for example:

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000
```

## Setup

- [ ] The page loads without console errors (check browser DevTools console).
- [ ] The page title is "DevStarter | Free Developer Resources".
- [ ] All styles and scripts load correctly (no unstyled or frozen content).

## Search

- [ ] Typing in the search field filters the resource cards immediately.
- [ ] Searching for a word that appears in a tag (e.g. "ui-ux") shows matching cards.
- [ ] Searching for a category name (e.g. "Design") shows resources from that category.
- [ ] Searching for a word that appears in a description works too.
- [ ] Clicking a tag filters the grid to resources with that tag; clicking it again clears
      the filter.
- [ ] Clearing the search restores all resources.
- [ ] Searching for gibberish (e.g. "zzzz") shows the empty state.

## Category filters

- [ ] Clicking a category button filters the grid to that category.
- [ ] Clicking "All" shows every resource again.
- [ ] Search and category filters can be combined (search within a category).
- [ ] Clicking the same category button twice toggles it back to "All".
- [ ] An always-visible "Reset filters" button clears the search, category, and tag filter,
      returning the view to "All".

## Empty state

- [ ] The empty state is hidden when there are results.
- [ ] The empty state appears with a helpful message when nothing matches.
- [ ] The "Clear search and filters" button restores the full list.

## Theme toggle

- [ ] Clicking the theme toggle switches between light and dark.
- [ ] The chosen theme is remembered after a page reload (localStorage).
- [ ] The toggle button has a clear accessible label and pressed state.

## External links

- [ ] Each card shows a working external link.
- [ ] The external link opens in a new tab with `rel="noopener noreferrer"`.

## Accessibility and keyboard

- [ ] The skip link is visible when focused via the keyboard.
- [ ] Focus order is logical and visible focus styles appear on focus.
- [ ] Pressing "/" outside a form control focuses the search input.
- [ ] Pressing "/" inside an input, textarea, select, or editable element does not
      trigger the search shortcut.
- [ ] All interactive controls (search input, filters, toggle, reset) are reachable via keyboard.
- [ ] The theme toggle, category filters, and primary nav link are at least 44 px tall on
      mobile.
- [ ] The page uses semantic landmarks (header, nav, main, section, footer).

## Responsive

- [ ] Desktop layout shows a multi-column resource grid.
- [ ] Tablet layout shows an adapted grid.
- [ ] Mobile layout shows a single-column grid and no horizontal scrolling.

## Browser console

- [ ] No errors or warnings related to DevStarter code appear in the console.
