/* <a class="edit-product" href="products/edit-product?idEdit=${product.id}"></a> */

document.getElementById("edit-icon").addEventListener("click", function() {
    window.location.href = "products/edit-product?idEdit=${product.id}";
  });