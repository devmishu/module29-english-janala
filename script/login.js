
const LoginNameInput = document.getElementById('LoginName');
const LoginPasswordInput = document.getElementById('LoginPassword');
const LoginButtonElement = document.getElementById('LoginButton');

LoginButtonElement.addEventListener('click', () => {

    if (LoginNameInput.value === 'Mishu Debnath' && LoginPasswordInput.value === 'bdbangla') {
        alert('Login Sessussfull');
        window.location.replace('index.html')
    } else {
        alert('Invalid Name and password');
    }

});