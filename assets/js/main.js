// @ts-check

function onReady() {
  const categoryPicker = /** @type HTMLSelectElement */ (document.getElementById("category_picker"));
  categoryPicker.classList.remove("invisible");
}

function selectCategory(evt) {
  const selectElement = evt.target;
  /** @type String */
  const newLocation = selectElement.value;
  document.location = newLocation;
}