import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey:"AIzaSyChL3UbOS78tyXquirjmCyfRITeXQjK3I0",
    authDomain: "eshop-b1cde.firebaseapp.com",
    projectId: "eshop-b1cde",
    storageBucket: "eshop-b1cde.appspot.com",
    messagingSenderId: "904507650743",
    appId: "1:904507650743:web:1841de87a3abc617e1d332"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;