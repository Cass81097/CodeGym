function loadAddClass() {
    axios.get('http://localhost:3000/classes')
        .then((res) => {
            let data = res.data;
            let lastId;
            console.log(data);
            let str = `
                <div id="home"></div> 
                <div id="main"></div>
            `;
            let home = `
                <span style="color:red" onclick="loadHome()">Home</span> | <span onclick="loadClass()">List Class</span>
            `

            for (let i = 0; i < data.length; i++) {
                lastId = data[i].id;
            }

            let main = `
                <input type="text" placeholder="ID" id="id" value="${lastId + 1}" disabled >
                <input type="text" placeholder="Name" id="name">
                <input type="text" placeholder="Teacher Name" id="teacherName">
                <input type="text" placeholder="Total Student" id="totalStudent">
                <button onclick="saveClass()">Save</button>
                `
            document.getElementById(`display`).innerHTML = str;
            document.getElementById(`home`).innerHTML = home;
            document.getElementById(`main`).innerHTML = main;
        })
        .catch((error) => {
            console.error(error);
        });
}

function saveClass() {
    let data = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        teacherName: document.getElementById('teacherName').value,
        totalStudent: document.getElementById('totalStudent').value,
    }
    console.log(data);

    axios.post('http://localhost:3000/classes', data).then(res => {
        console.log(res);
        loadClass();
    })
}