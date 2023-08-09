async function loadAddStudent() {
    try {
        const resStudent = await axios.get('http://localhost:3000/students');
        let data = resStudent.data;
        let lastId = data[data.length - 1].id;
        let str = `
            <div id="home"></div> 
            <div id="main"></div>
        `;
        let home = `
            <span style="color:red" onclick="loadHome()">Home</span> | <span onclick="loadStudent()">List Student</span>
        `;

        let main = `
            <input type="text" placeholder="ID" id="id" value="${lastId + 1}" disabled>
            <input type="text" placeholder="Name" id="name">
            <input type="text" placeholder="Age" id="age">
            <input type="text" placeholder="Point" id="point">
            <select id="classRefId">      
            </select>
            <button onclick="saveStudent()">Save</button>
        `;

        const resClass = await axios.get('http://localhost:3000/classes');
        let dataClass = resClass.data;

        let optionClass = `<option value="">Select Class</option>`
        for (const item of dataClass) {
            optionClass += `    
                    <option value="${item.id}">${item.name}</option>
                     `
        }

        document.getElementById(`display`).innerHTML = str;
        document.getElementById(`home`).innerHTML = home;
        document.getElementById(`main`).innerHTML = main;
        document.getElementById(`classRefId`).innerHTML = optionClass;


    } catch (error) {
        console.error(error);
    }
}

async function saveStudent() {
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

    try {
        const res = await axios.post('http://localhost:3000/students', data);
        console.log(res);
        this.loadStudent();
    } catch (error) {
        console.error(error);
    }
}
