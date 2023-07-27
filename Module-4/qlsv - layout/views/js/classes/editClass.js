function loadEditClass() {
    let str = `
        <div id="home"></div> 
        <div id="main"></div>
        `;
    let home = `
             <span style="color:red" onclick="loadHome()">Home</span>
             `
    document.getElementById(`display`).innerHTML = str;
    document.getElementById(`home`).innerHTML = home;

    axios.get('http://localhost:3000/classes')
        .then((res) => {
            let data = res.data;
            let str = '';
            data.map(item => {
                str += `<h3>${item.id}. Lớp: ${item.name} - Giảng viên: ${item.teacherName} - Tổng SV: ${item.totalStudent}</h3>
                        <button onclick="editButtonClass(${item.id})">Edit</button>
                `;
            });
            document.getElementById('main').innerHTML = str;
        })
        .catch((error) => {
            console.error(error);
        });
}

function editButtonClass(id) {
    axios.get(`http://localhost:3000/classes/search?id=${id}`)
        .then((res) => {
            let data = res.data;
            let str = `
            <div id="home"></div> 
            <div id="main"></div>
            `;
            let home = `
             <span onclick="loadHome()">Home</span> | <span onclick="loadEditClass()">Edit Class</span>
             `
            let main = `
                <input type="text" id="id" value="${data.id}" hidden>
                <input type="text" id="name" value="${data.name}">
                <input type="text" id="teacherName" value="${data.teacherName}">
                <input type="text" id="totalStudent" value="${data.totalStudent}">
                <button onclick="editClass()">Save</button>
                 `
            document.getElementById(`display`).innerHTML = str;
            document.getElementById(`home`).innerHTML = home;
            document.getElementById(`main`).innerHTML = main;
        })
        .catch((error) => {
            console.error(error);
        });
}

function editClass() {
    let id = document.getElementById('id').value;
    let data = {
        name: document.getElementById('name').value,
        teacherName: document.getElementById('teacherName').value,
        totalStudent: document.getElementById('totalStudent').value,
    }
    console.log(data);

    axios.put(`http://localhost:3000/classes/edit?id=${id}`, data).then(res => {
        console.log(res);
        loadClass();
    })
}