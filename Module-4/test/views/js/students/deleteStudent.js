async function loadDeleteStudent() {
    let str = `
        <div id="home"></div> 
        <div id="main"></div>
        `;
    let home = `
             <span style="color:red" onclick="loadHome()">Home</span>
             `
    document.getElementById(`display`).innerHTML = str;
    document.getElementById(`home`).innerHTML = home;

    try {
        const res = await axios.get('http://localhost:3000/students');
        let data = res.data;
        let str = '';
        data.map(item => {
            str += `<h3>${item.id}. Name: ${item.name} - Age: ${item.age} - Point: ${item.point} - Class: ${item.classRef.name}</h3>
                    <button onclick="deleteStudent(${item.id})">Delete</button>
            `;
        });
        document.getElementById('main').innerHTML = str;
    } catch (error) {
        console.error(error);
    }
}

async function deleteStudent(id) {
    try {
        const res = await axios.delete(`http://localhost:3000/students/delete?id=${id}`);
        console.log(res);
        loadStudent();
    } catch (error) {
        console.error(error);
    }
}
