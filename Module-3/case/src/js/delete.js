
function sendFetchDelete(id) {
    fetch(`http://localhost:8080/products/delete?id=${id}`)
        .then(res => {
        console.log(res);
        // alert('Xóa thành công!');
        location.reload();
    })
}

function sendFetchSort() {
    fetch(`http://localhost:8080/products/sort`)
        .then(res => {
        console.log(res);
            document.getElementById("sort").addEventListener("click", function() {
                window.location.href = "products/sort";
            });
        })
    }

    function sendFetchReSort() {
    fetch(`http://localhost:8080/products/reSort`)
        .then(res => {
        console.log(res);
        location.reload();
    })
}


