// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiDCD5Ow9TQomlAEp5mQJbFVezsfaEPHA",
    authDomain: "metro-groups-72980.firebaseapp.com",
    projectId: "metro-groups-72980",
    storageBucket: "metro-groups-72980.appspot.com",
    messagingSenderId: "764527487322",
    appId: "1:764527487322:web:89321a1dfdabe989f7eb63"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage  = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: "select_account"});