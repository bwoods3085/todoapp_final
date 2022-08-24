// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM0nYnXDOkDlMvjGMnqQ9MrK6Qx4ZDwTE",
  authDomain: "todoapp-44292.firebaseapp.com",
  projectId: "todoapp-44292",
  storageBucket: "todoapp-44292.appspot.com",
  messagingSenderId: "368886910623",
  appId: "1:368886910623:web:fa27b5466a573076e51caa"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {auth}