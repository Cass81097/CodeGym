let listUser = JSON.parse(localStorage.getItem('listUser')) || [];

document.getElementById('form-1').addEventListener('submit', function(event) {
    event.preventDefault(); 
    login();
});

function getUsersFromLocalStorage() {
    let storedListUser = localStorage.getItem('listUser');
    if (storedListUser) {
        return JSON.parse(storedListUser);
    }
    return [];
}

function login(){
    let email = document.getElementById('email').value
    let pass = document.getElementById('password').value
    
    listUser = getUsersFromLocalStorage();

    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].email == email && listUser[i].password == pass){
            window.location.href = '/project/product-management/index.html'
            return;
        }  
    }
    document.getElementById('alert').innerHTML  = `<p><img src="../img/alert.jpeg"><span>Sai email hoặc mật khẩu.</span></p>`

}

document.getElementById('password').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { 
      event.preventDefault(); 
      login(); 
    }
});




