function loadDeleteClass() {
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
                        <button onclick="deleteClass(${item.id})">Delete</button>
                `;
            });
            document.getElementById('main').innerHTML = str;
        })
        .catch((error) => {
            console.error(error);
        });
}

function deleteClass(id) {
    axios.delete(`http://localhost:3000/classes/delete?id=${id}`).then(res => {
        console.log(res);
        loadClass();
    })
}