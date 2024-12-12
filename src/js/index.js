'use strict';
import { select, listen } from './utils.js';

const loginForm = select('.login-form');
const usernameInput = select('.username-input');
const passwordInput = select('.password-input');
const rememberMeCheckbox = select('.remember-me-checkbox');
const usernameError = select('.username-error');
const passwordError = select('.password-error');
const loginButton = select('.login-btn');

localStorage.setItem('savedUsername', 'testUser');
localStorage.setItem('savedPassword', 'testPass');

function validateForm() {
  let isValid = true;

  if (usernameInput.value.trim() === '') {
    usernameError.textContent = 'Username is required.';
    isValid = false;
  } else {
    usernameError.textContent = '';
  }

  if (passwordInput.value.trim() === '') {
    passwordError.textContent = 'Password is required.';
    isValid = false;
  } else {
    passwordError.textContent = '';
  }

  return isValid;
}

listen('load', window, () => {
  if (localStorage.getItem('rememberMe') === 'true') {
    usernameInput.value = localStorage.getItem('username') || '';
    passwordInput.value = localStorage.getItem('password') || '';
    rememberMeCheckbox.checked = true;
  }
});

listen('click', loginButton, () => {
  if (validateForm()) {
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    const savedUsername = localStorage.getItem('savedUsername');
    const savedPassword = localStorage.getItem('savedPassword');

    if (enteredUsername === savedUsername && enteredPassword === savedPassword) {
      if (rememberMeCheckbox.checked) {
        if (!localStorage.getItem('rememberMe')) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('username', enteredUsername);
          localStorage.setItem('password', enteredPassword);
        }
      } else {
        localStorage.setItem('rememberMe', 'false');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
      window.location.href = './home.html';
    } else {
      passwordError.innerText = 'Invalid username or password.';
    }
  }
});
