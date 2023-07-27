function loadLogin() {
    const token = getCookie('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        loadClass();
    } else {
        let str = `
            <h1>Login</h1>
            <button onclick="formLogin()">Login</button>
            <button onclick="formRegister()">Register</button>
        `;
    
        document.getElementById(`display`).innerHTML = str;
    }
}


function formLogin() {
    let str = `
        <input type="text" placeholder="username" id="username">
        <input type="password" placeholder="password" id="password">
        <button onclick="login()">Login</button>
    `;

    document.getElementById(`display`).innerHTML = str;
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

async function login() {
    let data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    try {
        const res = await axios.post('http://localhost:3000/login', data);
        const token = res.data;
        setCookie('token', token, 7);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie('token');
        loadClass();

    } catch (error) {
        console.error(error);
    }
}
