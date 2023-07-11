function sendFetchDelete(id) {
    fetch(`http://localhost:3000/profile/delete?id=${id}`)
        .then(res => {
        console.log(res);
        // alert('Xóa thành công!');
        location.reload();
    })
}

// function sendFetchSort() {
//     fetch(`http://localhost:8080/products`)
//         .then(res => {
//         console.log(res);
//         })
//     }

//     function sendFetchReSort() {
//     fetch(`http://localhost:8080/products/reSort`)
//         .then(res => {
//         console.log(res);
//         location.reload();
//     })
// }



