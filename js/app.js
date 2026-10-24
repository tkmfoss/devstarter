
function getSavedBookmarks() {
    try {
        const bookmarks = JSON.parse(
            localStorage.getItem(BOOKMARKS_KEY) || "[]"
        );

        return Array.isArray(bookmarks) ? bookmarks : [];
    } catch {
        return [];
    }
}

function updateBookmarkButton(button, url) {
    const isSaved = getSavedBookmarks().includes(url);

    button.textContent = isSaved ? "Saved" : "Save";
    button.setAttribute("aria-pressed", String(isSaved));
    button.setAttribute(
        "aria-label",
        isSaved ? "Remove bookmark" : "Save bookmark"
    );
}

function toggleBookmark(url, button) {
    const bookmarks = getSavedBookmarks();
    const isSaved = bookmarks.includes(url);

    const updatedBookma…
[6:13 pm, 24/10/2026] nivedhika~: if (resource.url) {
    const link = document.createElement("a");
    link.className = "resource-card__link";
    link.href = resource.url;
[6:14 pm, 24/10/2026] nivedhika~: const bookmarkButton = document.createElement("button");

bookmarkButton.type = "button";
bookmarkButton.className = "bookmark-btn";

updateBookmarkButton(bookmarkButton, resource.url);

bookmarkButton.addEventListener("click", () => {
    toggleBookmark(resource.url, bookmarkButton);
});

footer.appendChild(bookmarkButton);