async function loadEditStudent() {
    let str = `
        <div id="home"></div> 
        <div id="main"></div>
        `;
    let home = `
        <span style="color:red" onclick="loadHome()">Home</span> | <span onclick="loadStudent()">List Student</span>
    `
    document.getElementById(`display`).innerHTML = str;
    document.getElementById(`home`).innerHTML = home;

    try {
        const res = await axios.get('http://localhost:3000/students');
        let data = res.data;
        let str = '';
        data.map(item => {
            str += `<h3>${item.id}. Name: ${item.name} - Age: ${item.age} - Point: ${item.point} - Class: ${item.classRef.name}</h3>
                    <button onclick="editButtonStudent(${item.id})">Edit</button>
            `;
        });
        document.getElementById('main').innerHTML = str;
    } catch (error) {
        console.error(error);
    }
}

async function editButtonStudent(id) {
    try {
        const res = await axios.get(`http://localhost:3000/students/search?id=${id}`);
        let data = res.data;
        console.log(data);
        let str = `
        <div id="home"></div> 
        <div id="main"></div>
        `;
        let home = `
            <span onclick="loadHome()">Home</span> | <span onclick="loadEditStudent()">Edit Student</span>
        `
        document.getElementById(`display`).innerHTML = str;
        document.getElementById(`home`).innerHTML = home;
        
        let main = `
            <input type="text" id="id" value="${data.id}" hidden>
            <input type="text" id="name" value="${data.name}">
            <input type="text" id="age" value="${data.age}">
            <input type="text" id="point" value="${data.point}">
            <input type="text" id="classRefId" value="${data.classRef.id}">
            <button onclick="editStudent()">Save</button>
        `

        document.getElementById(`main`).innerHTML = main;
    } catch (error) {
        console.error(error);
    }
}

async function editStudent() {
    let id = document.getElementById('id').value;
    let data = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        point: document.getElementById('point').value,
        classRef: {
            id: document.getElementById('classRefId').value,
        }
    };
    console.log(data);

    try {
        const res = await axios.put(`http://localhost:3000/students/edit?id=${id}`, data);
        console.log(res);
        loadStudent();
    } catch (error) {
        console.error(error);
    }
}
