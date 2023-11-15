/*
  Responsible for getting data from html and updating it
  - Sends data to model through the controller
  - Validates user input and responses
*/

// Registration and login controllers
import { loginController } from "../controllers/LoginController";

export function loginView() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  if (
    validate_email(email.value) === false ||
    validate_password(password.value) === false
  ) {
    // Exit function
    alert("Invalid email or password fields");
    return;
  }

  // Email and password input fields are valid
  const login_result = loginController(email.value, password.value);

  // Delay execution for 500ms to allow for data retrival from 
  // firebase DB
  setTimeout(() => {
    // check for any errors from LoginModel
    if (login_result.status === "success") {
      alert("User signed in");
      // Reset input fields
      email.value = "";
      password.value = "";
    } 
    else if (login_result.status === "error") {
      alert(`Error signing in, ${login_result.error}`);
      // Reset input fields
      email.value = "";
      password.value = "";
    }
  }, 500);
}

function validate_email(email) {
  let expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  return password.length > 6;
}