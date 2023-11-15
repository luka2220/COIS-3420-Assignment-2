import { auth, db } from "../app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export const registration = {
  status: "",
  error: null,
};

// Registers a new user with firebase authentication
export class Register {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  // Registering a new user with firebase
  createUser() {
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        const user = auth.currentUser;

        // Storing new fields for user in DB
        const user_data = {
          email: this.email,
          first_name: "",
          last_name: "",
          saved_products: {},
          last_login: Date.now(),
        };
        set(ref(db, "users/" + user.uid), user_data);

        // Noitfy RegistrationView of successful signup
        registration.status = "success";
      })
      .catch((err) => {
        // Display firebase error to View
        registration.status = "error";
        registration.error = err.message;
      });
  }
}
