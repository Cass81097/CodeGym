function loadHome() {
    let str = `
        <div id="home"></div> 
        <div id="main"></div>
        `;
    let home = `
             <span style="color:red" onclick="loadHome()">Home</span> | <span onclick="loadAddClass()">Add Class</span> | <span onclick="loadEditClass()">Edit Class</span> | <span onclick="loadDeleteClass()">Delete Class</span> | <span style="color:blue" onclick="loadStudent()">List Student</span>
             `
    document.getElementById(`display`).innerHTML = str;
    document.getElementById(`home`).innerHTML = home;

    axios.get('http://localhost:3000/classes')
        .then((res) => {
            let data = res.data;
            let str = '';
            data.map(item => {
                str += `<h3>${item.id}. Lớp: ${item.name} - Giảng viên: ${item.teacherName} - Tổng SV: ${item.totalStudent}</h3>`;
            });
            document.getElementById('main').innerHTML = str;
        })
        .catch((error) => {
            console.error(error);
        });
}

function loadClass() {
    loadHome();
}

