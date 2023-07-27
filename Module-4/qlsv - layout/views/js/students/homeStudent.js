async function loadStudent() {
  let str = `
        <div id="home"></div> 
        <div id="main"></div>
      `;
  let home = `
        <h2 onclick="exit()" style="cursor: pointer;max-width: fit-content;">Sign Out</h2>
        <span style="color:red" onclick="loadHome()">Home</span> | <span onclick="loadAddStudent()">Add Student</span> |
        <span onclick="loadEditStudent()">Edit Student</span> | <span onclick="loadDeleteStudent()">Delete Student</span> |
        <span style="color:blue" onclick="loadClass()">List Class</span>
      `;

  document.getElementById(`display`).innerHTML = str;
  document.getElementById(`home`).innerHTML = home;

  try {
    const res = await axios.get('http://localhost:3000/students');
    let data = res.data;
    let str = '';

    data.map(item => {
      str += `<h3>${item.id}. Name: ${item.name} - Age: ${item.age} - Point: ${item.point} - Total Student: ${item.classRef.name}</h3>`;
    });

    document.getElementById('main').innerHTML = str;
  } catch (error) {
    console.error(error);
  }
}
