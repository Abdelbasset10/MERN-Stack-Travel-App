// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIQ3JJF4pW5gQZq8m5GcEjJc-OWrdIZtI",
    authDomain: "travel-app-eedd7.firebaseapp.com",
    projectId: "travel-app-eedd7",
    storageBucket: "travel-app-eedd7.appspot.com",
    messagingSenderId: "362973595350",
    appId: "1:362973595350:web:a0111b9d3b1e32c6a22b77"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = firebase.storage();