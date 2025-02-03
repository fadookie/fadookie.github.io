// @ts-check

function onReady() {
}

function selectCategory(evt) {
  // const isVisibleClass = "is_visible";
  const selectElement = evt.target;
  /** @type String */
  const value = selectElement.value;
  const newLocation = (() => {
    if (value == 'Featured') return '/';
    return `/portfolio/${value.toLowerCase()}`;
  })();
  document.location = newLocation;
}