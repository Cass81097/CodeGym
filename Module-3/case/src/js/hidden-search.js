window.onload = hideMyDivBasedOnURL;

function hideMyDivBasedOnURL() {
    var myDiv = document.querySelector('.search-box')
    if (window.location.href.includes("products/sortId") || window.location.href.includes("products/sortPrice")){
      myDiv.style.display = "none";
    }
}


