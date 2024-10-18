import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js"; // Import Realtime Database functions

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpwiZNtTumaXAc_H205dh5XRFfXUJ6q-8",
  authDomain: "parenting-navigator.firebaseapp.com",
  databaseURL: "https://parenting-navigator-default-rtdb.firebaseio.com/",
  projectId: "parenting-navigator",
  storageBucket: "parenting-navigator.appspot.com",
  messagingSenderId: "434358983426",
  appId: "1:434358983426:web:276cd82ea411a0056c801b",
  measurementId: "G-3Y2MVG3D93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);  // Initialize Realtime Database

// Sign up function
export async function signUpUser(email, password, firstName, lastName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Generate a unique numeric user_id (e.g., incremented number)
    const uniqueUserId = Math.floor(Math.random() * 100000);  // Replace this with a proper unique generation method

    // Save user details in Realtime Database
    await set(ref(db, 'users/' + user.uid), {
      user_id: uniqueUserId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      auth_uid: user.uid  // Store Firebase Authentication UID
    });

    alert("Sign-up successful! You can now log in.");
    
    // Switch to login form after successful sign-up
    document.getElementById('signup-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
    
    // Clear form fields
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert(error.message);
  }
}

// Login function (same as before)
export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in:", user);
      alert("Login successful!");
      window.location.href = "dashboard.html";  // Redirect to dashboard after successful login
    })
    .catch((error) => {
      console.error("Error logging in:", error.message);
      alert(error.message);
    });
}
