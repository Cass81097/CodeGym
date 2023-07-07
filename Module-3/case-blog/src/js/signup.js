let listUser = JSON.parse(localStorage.getItem('listUser')) || [];

document.getElementById('form-1').addEventListener('submit', function(event) {
    event.preventDefault(); 
    register();
});

function registerInfo(usn, pass, email) {
    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].email == email) {
            document.getElementById('alert').innerHTML = `<p><img src="../img/alert.jpeg"><span>Email <span style="color:red">${email}</span> đã có người sử dụng</span></p>`
            return;
        }
    }

    listUser.push({
        username: usn,
        password: pass,
        email: email
    });

    localStorage.setItem('listUser', JSON.stringify(listUser));

    empty();
    window.location.href = '/project/product-management/myhtml/finishregister.html';
}


function register() {
    let usn = document.getElementById('usn').value.trim();
    let email = document.getElementById('email').value.trim();
    let pass = document.getElementById('password').value.trim();
    let passConfirm = document.getElementById('password-confirmation').value.trim();

    if (usn === '' || email === '' || pass === '' || passConfirm === '') {
        document.getElementById('alert').innerHTML = `<p><img src="../img/alert.jpeg"><span> Vui lòng nhập đầy đủ thông tin </span></p>`;
        return;
    }

    if (pass !== passConfirm) {
        document.getElementById('alert').innerHTML = `<p><img src="../img/alert.jpeg"><span> Mật khẩu không khớp</span></p>`;
        return;
    }
    
    registerInfo(usn, pass, email);
}

document.getElementById('password').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { 
      event.preventDefault(); 
      register(); 
    }
});

function empty(){
    document.getElementById('usn').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirmation').value = '';
    document.getElementById('alert').innerHTML = '';
}


