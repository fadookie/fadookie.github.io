function onReady() {
  console.log('onReady');
}

function selectCategory(evt) {
  const selectElement = evt.target;
  const value = selectElement.value;
  console.log(`selectCategory evt:`, evt, 'value:', value);
}