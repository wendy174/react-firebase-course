// Import the services you need from firebase then create a variable for it 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'; // setup authentication with email/password 
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyBEtdg_Auln3jC9p5HkkpKq2vS86s01Dsc",
  authDomain: "fir-course-f9728.firebaseapp.com",
  projectId: "fir-course-f9728",
  storageBucket: "fir-course-f9728.appspot.com",
  messagingSenderId: "360722038962",
  appId: "1:360722038962:web:3e8761bc380afb853409ab",
  measurementId: "G-2V97K4GM3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const googleProvider = new GoogleAuthProvider(); 