function loadStudent() {
    let str = `
        <div id="home"></div> 
        <div id="main"></div>
        `;
    let home = `
             <span style="color:red" onclick="loadHome()">Home</span> | <span onclick="loadAddStudent()">Add Student</span> | <span onclick="loadEditStudent()">Edit Student</span> | <span onclick="loadDeleteStudent()">Delete Student</span> | <span style="color:blue" onclick="loadClass()">List Class</span>
             `

    document.getElementById(`display`).innerHTML = str;
    document.getElementById(`home`).innerHTML = home;
    axios.get('http://localhost:3000/students')
        .then((res) => {
            let data = res.data;
            let str = '';
            data.map(item => {
                str += `<h3>${item.id}. Tên: ${item.name} - Tuổi: ${item.age} - Điểm: ${item.point} - HS lớp: ${item.classRef.name}</h3>
                `;
            });
            document.getElementById('main').innerHTML = str;
        })
        .catch((error) => {
            console.error(error);
        });
}