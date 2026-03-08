
const LoginNameInput = document.getElementById('LoginName');
const LoginPasswordInput = document.getElementById('LoginPassword');
const LoginButtonElement = document.getElementById('LoginButton');

LoginButtonElement.addEventListener('click', () => {

    if (LoginNameInput.value === 'admin' && LoginPasswordInput.value === 'admin123') {
        alert('Login Successful ✅');
        window.location.assign('main.html');
    } else {
        alert('Invalid Name and password');
    }

});