/*
  Connection between view and model for each operation
  - Sends view data to model objects
  - Sends the model data back to update  view
*/

// Views

// Models
import { Login, login_result } from "../models/LoginModel";

export function loginController(email, password) {
  const login = new Login(email, password);
  login.signUserIn();
  return login_result;
}