function sendFetchDelete(id) {
    fetch(`http://localhost:8080/products/delete?id=${id}`)
        .then(res => {
        console.log(res);
        alert('Xóa thành công!');
        location.reload();
    })
}

