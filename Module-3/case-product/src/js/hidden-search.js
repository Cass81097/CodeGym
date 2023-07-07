window.onload = hideElementsBasedOnURL;

function hideElementsBasedOnURL() {
  const searchBox = document.querySelector('.search-box');
  const addButton = document.querySelector('#btn-add-product');

  if (window.location.href.includes("products/sortId") || window.location.href.includes("products/sortPrice")) {
    searchBox.style.display = "none";
    addButton.style.display = "none";
  }
}
