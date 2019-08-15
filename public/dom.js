// console.log('runnnig');

// const registerName = document.querySelector('#new__user');
// const registerPassword = document.querySelector('#new__password');


// const registerUser = (e) => {
//   e.preventDefault();
//   console.log('name = ', registerName.value);
//   console.log('password = ', registerPassword.value);
// };

// const registerSubmit = document.querySelector('#register__submit');

// registerSubmit.addEventListener('click', registerUser);

const registerForm = document.querySelector('.register__form__body');
const usernameInput = document.querySelector('#new__user');
const passwordInput = document.querySelector('#new__password');
const retypePasswordInput = document.querySelector('#retype__password');
const loginForm = document.querySelector('.login__form__body');
const loginInput = document.querySelector('#login__name');
const loginPasswordInput = document.querySelector('#login__password');
let warning = document.createElement('p');


registerForm.addEventListener('submit', e => {

if (usernameInput.value === "") {
  e.preventDefault();
  warning.textContent = "Please enter a username";
  registerForm.appendChild(warning);
}

else if (passwordInput.value === "" || retypePasswordInput.value === "") {
  e.preventDefault();
  warning.textContent = "Please enter a password";
  registerForm.appendChild(warning);
}

});

loginForm.addEventListener('submit', e => {

  if (loginInput.value === "") {
    e.preventDefault();
    warning.textContent = "Please enter a username";
    loginForm.appendChild(warning);
  }

  if (loginPasswordInput.value === "") {
    e.preventDefault();
    warning.textContent = "Please enter a password";
    loginForm.appendChild(warning);
  }

});
