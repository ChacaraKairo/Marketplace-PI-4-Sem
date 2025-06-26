// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDxJ8nyLxAAGJF8CEU75wZf5bub9088zU",
  authDomain: "shop-eb7c2.firebaseapp.com",
  projectId: "shop-eb7c2",
  storageBucket: "shop-eb7c2.firebasestorage.app",
  messagingSenderId: "367546238032",
  appId: "1:367546238032:web:48c55619cae83481337d55",
  measurementId: "G-FK464SS7NY"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;