function loadDeleteStudent() {
    let str = `
        <div id="home"></div> 
        <div id="main"></div>
        `;
    let home = `
             <span style="color:red" onclick="loadHome()">Home</span>
             `
    document.getElementById(`display`).innerHTML = str;
    document.getElementById(`home`).innerHTML = home;

    axios.get('http://localhost:3000/students')
        .then((res) => {
            let data = res.data;
            let str = '';
            data.map(item => {
                str += `<h3>${item.id}. Tên: ${item.name} - Tuổi: ${item.age} - Điểm: ${item.point} - HS lớp: ${item.classRef.name}</h3>
                        <button onclick="deleteStudent(${item.id})">Delete</button>
                `;
            });
            document.getElementById('main').innerHTML = str;
        })
        .catch((error) => {
            console.error(error);
        });
}

function deleteStudent(id) {
    axios.delete(`http://localhost:3000/students/delete?id=${id}`).then(res => {
        console.log(res);
        loadStudent();
    })
}