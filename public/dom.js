const registerForm = document.querySelector(".register__form__body");
const usernameInput = document.querySelector("#new__user");
const passwordInput = document.querySelector("#new__password");
const retypePasswordInput = document.querySelector("#retype__password");
const loginForm = document.querySelector(".login__form__body");
const loginInput = document.querySelector("#login__name");
const loginPasswordInput = document.querySelector("#login__password");
const warning = document.createElement("p");

const removeBorder = () => {
  const inputs = Array.from(document.getElementsByClassName("redBorder"));
  inputs.forEach(element => {
    element.classList.remove("redBorder");
  });
};

registerForm.addEventListener("submit", e => {
  removeBorder();
  if (usernameInput.value === "") {
    e.preventDefault();
    warning.textContent = "Please enter a username";
    registerForm.appendChild(warning);
    usernameInput.classList.add("redBorder");
  } else if (passwordInput.value === "") {
    e.preventDefault();
    warning.textContent = "Please enter a password";
    registerForm.appendChild(warning);
    passwordInput.classList.add("redBorder");
  } else if (passwordInput.value !== retypePasswordInput.value) {
    e.preventDefault();
    warning.textContent = "Passwords do not match";
    registerForm.appendChild(warning);
    retypePasswordInput.classList.add("redBorder");
  }
});

loginForm.addEventListener("submit", e => {
  removeBorder();
  if (loginInput.value === "") {
    e.preventDefault();
    warning.textContent = "Please enter a username";
    loginForm.appendChild(warning);
    loginInput.classList.add("redBorder");
  } else if (loginPasswordInput.value === "") {
    e.preventDefault();
    warning.textContent = "Please enter a password";
    loginForm.appendChild(warning);
    loginPasswordInput.classList.add("redBorder");
  }
});
