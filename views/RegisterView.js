import { registerController } from "../controllers/RegisterController";

export function registerView() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  if (validate_email(email.value) === false || validate_password(password.value) === false) {
    // Exit function
    alert("Invalid email or password fields");
    return;
  }

  const registration_result = registerController(email.value, password.value);
  console.log(registration_result);
}

function validate_email(email) {
  let expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  return password.length > 6;
}