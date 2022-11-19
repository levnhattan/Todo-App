// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIrDln6AtoKddgk8lcWLqj-oRyP5TqJzc",
  authDomain: "todoapp-a658b.firebaseapp.com",
  projectId: "todoapp-a658b",
  storageBucket: "todoapp-a658b.appspot.com",
  messagingSenderId: "1060519491981",
  appId: "1:1060519491981:web:5f9afb253e1abbd85165c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);