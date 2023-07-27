async function loadDeleteClass() {
    let str = `
        <div id="home"></div> 
        <div id="main"></div>
    `;
    let home = `
         <span style="color:red" onclick="loadHome()">Home</span>
    `;
    document.getElementById(`display`).innerHTML = str;
    document.getElementById(`home`).innerHTML = home;

    try {
        const res = await axios.get('http://localhost:3000/classes');
        let data = res.data;
        let str = '';
        data.map(item => {
            str += `<h3>${item.id}. Class: ${item.name} - Teacher: ${item.teacherName} - Total Student: ${item.totalStudent}</h3>
                    <button onclick="deleteClass(${item.id})">Delete</button>
            `;
        });
        document.getElementById('main').innerHTML = str;
    } catch (error) {
        console.error(error);
    }
}

async function deleteClass(id) {
    try {
        const res = await axios.delete(`http://localhost:3000/classes/delete?id=${id}`);
        console.log(res);
        loadClass();
    } catch (error) {
        console.error(error);
    }
}
