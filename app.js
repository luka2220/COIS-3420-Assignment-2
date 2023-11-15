// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getDatabase, ref, update, get, child } from "firebase/database";

// Views
import { loginView } from "./views/LoginView";
import { registerView } from "./views/RegisterView";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLA1D8omzv5a9XxmnfHgn5VxRC-BF6fEQ",
  authDomain: "assignment-2-97296.firebaseapp.com",
  projectId: "assignment-2-97296",
  storageBucket: "assignment-2-97296.appspot.com",
  messagingSenderId: "817544862031",
  appId: "1:817544862031:web:791f13230876bd55c20d3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initializing firebase authentication and database
export const auth = getAuth(app);
export const db = getDatabase(app);

// Fuction to be called from login.html
// Executes the registerView function to 
// perform user registration operation 

export function register() {
  registerView();
}

// Function to be called from login.html
// Executes the loginView function to perform 
// user login operation
export function login() {
  loginView();
}

// Displays the users profile information if logged in.
// Function is executed on profile page load
export function display_profile_info() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in.
      const uid = user.uid;
      const dbRef = ref(db);
      get(child(dbRef, `users/${uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            document.getElementById("profile-email").innerHTML =
              snapshot.val().email;
            document.getElementById("profile-first-name").innerHTML =
              snapshot.val().first_name;
            document.getElementById("profile-last-name").innerHTML =
              snapshot.val().last_name;
          } else {
          }
        })
        .catch((err) => {
          console.log(err.error);
        });
    } else {
      // No user signed in.
      return;
    }
  });
}

// Updates users profile information based on form submit
// Executed in profile when submit button is pressed on form
export function update_user_profile() {
  // Updating user profile info
  const profileUpdateForm = document.getElementById("profile-update-form");
  profileUpdateForm.addEventListener("submit", (e) => {
    // prevent page from refreshing
    e.preventDefault();

    // Get updated profile info
    const updated_first_name = document.getElementById(
      "profile-update-first-name"
    ).value;
    const updated_last_name = document.getElementById(
      "profile-update-last-name"
    ).value;

    // Conditional check for empty input fields
    if (updated_first_name === "" || updated_last_name === "") {
      alert("Enter an input field for first and last name");
      return; // exit function
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        const uid = user.uid;

        // Update users first and last name
        const updated_data = {
          first_name: updated_first_name,
          last_name: updated_last_name,
        };
        update(ref(db, "users/" + uid), updated_data)
          .then(() => {
            alert("Profile info successfully updated.");
            display_profile_info();
          })
          .catch((err) => {
            alert(`Error updating data: ${err.message}`);
          });

        // reset input fields
        document.getElementById("profile-update-first-name").value = "";
        document.getElementById("profile-update-last-name").value = "";
      } else {
        // No user signed in.
        alert("Sign-in to update your profile info");
        return;
      }
    });
  });
}

// Function that sends user an email to reset password
// Executed in profile.html
export function reset_user_password() {
  // Send user an email to reset password
  sendPasswordResetEmail(auth, auth.currentUser.email)
    .then(() => {
      // Notify user that email was sent
      alert("Password reset link sent to email");
    })
    .catch((err) => {
      alert(`Error: ${err.message}`);
    });
}

// Function to sign user out 
// Executed in profile.html
export function signout() {
  signOut(auth)
    .then(() => {
      document.getElementById("profile-email").innerHTML = "";
      document.getElementById("profile-first-name").innerHTML = "";
      document.getElementById("profile-last-name").innerHTML = "";
      alert("You have signed out.");
    })
    .catch((err) => {
      alert(`${err.message}`);
    });
}

// Saves a product for user
// Executed in index.html
export function save_product(index) {
  // formatting price
  const price = document
    .getElementById("products-table")
    .rows[index].cells[2].innerText.slice(1);

  const product_data = {
    id: document.getElementById("products-table").rows[index].cells[0]
      .innerText,
    name: document.getElementById("products-table").rows[index].cells[1]
      .innerText,
    price,
    rating:
      document.getElementById("products-table").rows[index].cells[3].innerText,
    in_stock:
      document.getElementById("products-table").rows[index].cells[4].innerText,
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // There is a user signed-in.
      const uid = user.uid;
      const dbRef = ref(db);

      // check if any products exist
      get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          // Check if there are any saved products in firebase
          if (!snapshot.val().saved_products) {
            // Create a new array and add the product to be stored in firebase DB
            const products = [];
            products.push(product_data);

            // Products array of object will be stored as `saved_products` in firebase DB
            const user_data = {
              saved_products: products,
            };

            // Update the DB with the user data and notify user
            update(ref(db, "users/" + user.uid), user_data);
            alert("Product Saved");
          }
          // If there are products already saved in DB
          else {
            const products = snapshot.val().saved_products; // Get current saved products list

            // Check if product is already saved in DB
            for (let i = 0; i < products.length; i++) {
              if (products[i].id === product_data.id) {
                alert("Product already saved");
                return;
              }
            }

            products.push(product_data);
            const user_data = {
              saved_products: products,
            };

            // Update the DB with the newly saved products and notify user
            update(ref(db, "users/" + user.uid), user_data);
            alert("Product Saved");
          }
        }
      });
    } else {
      // No user is signed-in.
      alert("Sign-in to save products");
      return;
    }
  });
}

// Displays all of the users saved products
// Executed in products.html
export function display_products() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // There is a user signed-in.
      const uid = user.uid;
      const dbRef = ref(db);
      
      // Get all saved products
      get(child(dbRef, `users/${uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            if (!snapshot.val().saved_products) {
              let result = document.createElement("h3")
              result.innerHTML = "No saved Products"
              document.getElementById("products_saved").appendChild(result);
            }
            else {
              const parent_div = document.getElementById("products_saved")
              const products = snapshot.val().saved_products; // Get current saved products list

              // map through each product
              products.map((product) => {
                const root_div = document.createElement("div");
                root_div.setAttribute("class", "card");

                const body_div = document.createElement("div")
                body_div.setAttribute("class", "card-body");

                // Product title html element
                const title = document.createElement("h5");
                title.setAttribute("class", "card-title");
                title.innerText = product.name;
                body_div.appendChild(title);

                // Product price html element
                const price = document.createElement("h6");
                price.setAttribute("class", "card-subtitle mb-2 text-body-secondary");
                price.innerText = "$" + product.price;
                body_div.appendChild(price);

                // Product rating html element
                const rating = document.createElement("p");
                rating.setAttribute("class", "card-text");
                rating.innerText = product.rating + "/5";
                body_div.appendChild(rating);

                // In stock html element
                const in_stock = document.createElement("p");
                in_stock.setAttribute("class", "card-text");
                in_stock.innerText = "In stock: " + product.in_stock;
                body_div.appendChild(in_stock);

                // Adding all attributes to root div
                root_div.appendChild(body_div);
                // Adding root_div to parent_div
                parent_div.appendChild(root_div);
              });
            }
          }
        })
    } else {
      // No user is signed-in
      document.getElementById("products_saved").innerHTML =
        "Sign-in to add and view saved products";
    }
  });
}