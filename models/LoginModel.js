/*
  Implements Login and Register busniness logic 
  - Get the data from view sent by controller
  - Performs business logic (Firebase operations)
  - Sends a satus code back to view through controller based 
  on the outcome of the operation
*/

import { auth, db } from "../app";
// Firebase libraries
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, update, set } from "firebase/database";


export const login_result = {
  status: "",
  error: null
}

// Signs-in an existing user with firebase
export class Login {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  // Signs the user into firebase
  signUserIn() {
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredentials) => {
        // Current signed in user
        const user = userCredentials.user;

        // Updated user last_login in db
        const user_data = {
          last_login: Date.now(),
        };
        update(ref(db, "users/" + user.uid), user_data);

        // Notify View of successful login
        login_result.status = "success";
      })
      .catch((err) => {
        // Display firebase error to View
        login_result.status = "error";
        login_result.error = err.message;
      });
  }
}