import { Register, registration } from "../models/RegisterModel";

export function registerController(email, password) {
  const register = new Register(email, password);
  register.createUser();
  return registration;
}