function loadAddStudent() {
    let str = `
        <div id="home"></div> 
        <div id="main"></div>
    `;
    let home = `
        <span style="color:red" onclick="loadHome()">Home</span> | <span onclick="loadStudent()">List Student</span>
    `
    let main = `
        <input type="text" placeholder="ID" id="id">
        <input type="text" placeholder="Name" id="name">
        <input type="text" placeholder="Age" id="age">
        <input type="text" placeholder="Point" id="point">
        <input type="text" placeholder="Class ID" id="classRefId">
        <button onclick="saveStudent()">Save</button>
    `
    document.getElementById(`display`).innerHTML = str;
    document.getElementById(`home`).innerHTML = home;
    document.getElementById(`main`).innerHTML = main;
}


function saveStudent() {
    let data = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        point: document.getElementById('point').value,
        classRef: {
            id: document.getElementById('classRefId').value,
        }
    };
    console.log(data);

    axios.post('http://localhost:3000/students', data)
        .then(res => {
            console.log(res);
            loadStudent();
        })
        .catch(error => {
            console.error(error);
        });
}