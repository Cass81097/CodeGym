async function loadHomeCar() {
  try {
    const res = await axios.get('http://localhost:3000/car');
    let data = res.data;
    let str = `
              <thead>
                <tr>
                  <th>Danh sách xe</th>
                  <th colspan="2">
                  </th>
                  <th><a onclick="loadAddCar()" class="btn btn-primary" href="#" role="button">Thêm xe</a></th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
          `;

    data.map((item, i) => {
      str += `   
            <tr>
              <td>${i + 1}</td>
              <td class="name-car" onclick=seeDetailCar(${item.id})>${item.name}</td>
              <td>${item.price}</td>
              <td>
              <button onclick="showEditCar(${item.id})" type="button" class="btn btn-outline-primary">Sửa</button>
              <button onclick="showDeleteCar(${item.id})" type="button" class="btn btn-outline-danger">Xoá</button>
              </td>
            </tr>       
          `;
    });

    document.getElementById(`table`).innerHTML = str;
  } catch (error) {
    console.error(error);
  }
}

async function seeDetailCar(id) {
  try {
    const res = await axios.get(`http://localhost:3000/car/${id}`);
    let data = res.data;
    let str = `
              <thead>
                <tr>
                  <th>Danh sách xe</th>
                  <th><a onclick="backToHomeCar()" class="btn btn-primary" href="#" role="button">Danh sách xe</a></th>
                </tr>
              </thead>
          `;

    str += `   
            <tr>
              <td>Name</td>
              <td>${data.name}</td>
            </tr> 
            <tr>
              <td>Hãng</td>
              <td>${data.brandInfo.name}</td>
            </tr>
            <tr>
              <td>Giá</td>
              <td>${data.price}</td>
            </tr>
            <tr>
              <td>Mô tả</td>
              <td>${data.description}</td>
            </tr> 
            <tr>
              <td></td>
              <td> 
              <button onclick="showEditCar(${data.id})" type="button" class="btn btn-primary">Chỉnh sửa</button>
              <button onclick="backToHomeCar()" type="button" class="btn btn-secondary">Thoát</button>
              </td>
            </tr>              
          `;

    document.getElementById(`table`).innerHTML = str;
    // let removeTable = document.getElementById('table');
    // removeTable.classList.remove('table', 'table-striped');
  } catch (error) {
    console.error(error);
  }
}

async function loadAddCar() {
  try {
    const res = await axios.get('http://localhost:3000/car');
    let lastId;
    let data = res.data;
    console.log(data);
    if (data.length === 0) {
      lastId = 0;
      console.log(lastId);
    } else {
      lastId = data[data.length - 1].id;
    }

    let str = `
      <input type="text" placeholder="ID" id="id" value="${lastId + 1}" hidden>
      <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Tên : </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="name" placeholder="Nhập tên">
          </div>
      </div>
      <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Hãng : </label>
            <div class="col-sm-10">
              <select id="brandId">      
              </select>
          </div>
      </div>
      <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Giá : </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="price" placeholder="Nhập giá">
          </div>
      </div>
      <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Mô Tả</label>
            <div class="col-sm-10">
              <textarea class="form-control" id="description" placeholder="Nhập mô tả"></textarea>
          </div>
      </div> 
      <div class="my-button">
          <button onclick=saveCar()  type="button" class="btn btn-primary">Lưu</button>
          <button onclick=backToHomeCar() style="margin-left:10px" type="button" class="btn btn-secondary">Thoát</button>
      </div>
          `;

    const resClass = await axios.get('http://localhost:3000/brand');
    let dataClass = resClass.data;

    let optionClass = `<option value="">Chọn hãng</option>`
    for (const item of dataClass) {
      optionClass += `    
                  <option value="${item.id}">${item.name}</option>
                   `
    }

    document.getElementById(`table`).innerHTML = str;
    document.getElementById(`brandId`).innerHTML = optionClass;
  } catch (error) {
    console.error(error);
  }
}

async function saveCar() {
  let data = {
    id: document.getElementById('id').value,
    name: document.getElementById('name').value,
    price: document.getElementById('price').value,
    brandInfo: {
      id: document.getElementById('brandId').value,
    },
    description: document.getElementById('description').value,
  };
  console.log(data);

  try {
    const res = await axios.post('http://localhost:3000/car', data);
    console.log(res);
    loadHomeCar();
  } catch (error) {
    console.error(error);
  }
}

function backToHomeCar() {
  loadHomeCar();
}


async function saveCar() {
  let data = {
    id: document.getElementById('id').value,
    name: document.getElementById('name').value,
    price: document.getElementById('price').value,
    brandInfo: {
      id: document.getElementById('brandId').value,
    },
    description: document.getElementById('description').value,
  };
  console.log(data);

  try {
    const res = await axios.post('http://localhost:3000/car', data);
    console.log(res);
    loadHomeCar();
  } catch (error) {
    console.error(error);
  }
}

function backToHomeCar() {
  loadHomeCar();
}

function showDeleteCar(id) {
  const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa xe này?");
  if (confirmDelete) {
    deleteCar(id);
  }
}

async function deleteCar(id) {
  try {
    const res = await axios.delete(`http://localhost:3000/car/delete/${id}`);
    loadHomeCar();
  } catch (error) {
    console.error(error);
  }
}

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

async function showEditCar(id) {
  try {
    const res = await axios.get(`http://localhost:3000/car/search/${id}`);
    let data = res.data;
    console.log(data);
    let str = `
      <input type="text" placeholder="ID" id="id" value="${data.id}" hidden>
      <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Tên : </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="name" value="${data.name}" placeholder="Nhập tên">
          </div>
      </div>
      <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Hãng : </label>
            <div class="col-sm-10">
              <select id="brandId">      

              </select>
          </div>
      </div>
      <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Giá : </label>
            <div class="col-sm-10">
              <input type="number" class="form-control" value="${data.price}" id="price" placeholder="Nhập giá">
          </div>
      </div>
      <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Mô Tả</label>
            <div class="col-sm-10">
              <textarea class="form-control" id="description" value="${data.description}" placeholder="Nhập mô tả"></textarea>
          </div>
      </div> 
      <div class="my-button">
          <button onclick=editCar()  type="button" class="btn btn-primary">Lưu</button>
          <button onclick=backToHomeCar() style="margin-left:10px" type="button" class="btn btn-secondary">Thoát</button>
      </div>
          `;

    const resClass = await axios.get('http://localhost:3000/brand');
    let dataClass = resClass.data;

    let optionClass = `<option value="">Chọn hãng</option>`
    for (const item of dataClass) {
      optionClass += `    
                  <option value="${item.id}">${item.name}</option>
                   `
    }

    document.getElementById(`table`).innerHTML = str;
    document.getElementById(`brandId`).innerHTML = optionClass;
  } catch (error) {
    console.error(error);
  }
}

async function editCar() {
  let id = document.getElementById('id').value
  let data = {
    name: document.getElementById('name').value,
    price: document.getElementById('price').value,
    description: document.getElementById('description').value,
    brandInfo: {
      id: document.getElementById('brandId').value,
    }
  };

  try {
    const res = await axios.put(`http://localhost:3000/car/edit/${id}`, data);
    console.log(res);
    loadHomeCar();
  } catch (error) {
    console.error(error);
  }
}
