
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD4YxlU-ukSroe-20FQ_CGPBFw5NaNzWXU",
    authDomain: "blood-website-fe48e.firebaseapp.com",
    projectId: "blood-website-fe48e",
    storageBucket: "blood-website-fe48e.appspot.com",
    messagingSenderId: "35546841591",
    appId: "1:35546841591:web:6cf1f4598cf11bc8deeef2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const blooddatabase = firebase.database();

  export {blooddatabase} 