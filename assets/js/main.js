// @ts-check

function onReady() {
  initCategoryPicker();
}

const categoryClassPrefix = "portfolio_thumb_category_";

/** @type Array<Element> | null */
let thumbItems = null;

function initCategoryPicker() {
  thumbItems = Array.from(document.getElementsByClassName('portfolio_thumb_item'));
  const allClasses = Array.from(new Set(thumbItems.flatMap(x => Array.from(x.classList))));
  const categories = allClasses.filter(x => x.startsWith(categoryClassPrefix))
    .map(x => x.replace(categoryClassPrefix, ""));

  const categoryPicker = /** @type HTMLSelectElement */ (document.getElementById("category_picker")); 
  categories.forEach(category => {
    categoryPicker.add(new Option(category));
  });
}

function selectCategory(evt) {
  if (thumbItems == null) { throw new Error("Expected thumbItems to not be null."); }
  const isVisibleClass = "is_visible";
  const selectElement = evt.target;
  const value = selectElement.value;
  const selectedCategoryClass = `${categoryClassPrefix}${value}`;

  const [selectedItems, unselectedItems] = (() => {
    if (value == 'All') return [thumbItems, []];
    const selectedItems = thumbItems.filter(x => x.classList.contains(selectedCategoryClass));
    const unselectedItems = thumbItems.filter(x => !x.classList.contains(selectedCategoryClass));
    return [selectedItems, unselectedItems];
  })();

  selectedItems.forEach(item => {
    item.classList.add(isVisibleClass);
  });
  unselectedItems.forEach(item => {
    item.classList.remove(isVisibleClass);
  });
}