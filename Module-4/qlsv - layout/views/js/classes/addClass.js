async function loadAddClass() {
    try {
        const res = await axios.get('http://localhost:3000/classes');
        let data = res.data;
        let lastId = data[data.length - 1].id;
        console.log(data);
        let str = `
            <div id="home"></div> 
            <div id="main"></div>
        `;
        let home = `
            <span style="color:red" onclick="loadHome()">Home</span> | <span onclick="loadClass()">List Class</span>
        `;

        let main = `
            <input type="text" placeholder="ID" id="id" value="${lastId + 1}" disabled>
            <input type="text" placeholder="Name" id="name">
            <input type="text" placeholder="Teacher Name" id="teacherName">
            <input type="text" placeholder="Total Student" id="totalStudent">
            <button onclick="saveClass()">Save</button>
        `;
        document.getElementById(`display`).innerHTML = str;
        document.getElementById(`home`).innerHTML = home;
        document.getElementById(`main`).innerHTML = main;
    } catch (error) {
        console.error(error);
    }
}

async function saveClass() {
    let data = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        teacherName: document.getElementById('teacherName').value,
        totalStudent: document.getElementById('totalStudent').value,
    };
    console.log(data);

    try {
        const res = await axios.post('http://localhost:3000/classes', data);
        console.log(res);
        this.loadClass();
    } catch (error) {
        console.error(error);
    }
}
