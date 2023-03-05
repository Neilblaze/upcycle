// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDshwzRiOTgRhuPPt1fTrNmw3tTpbSOc-4",
    authDomain: "upcyclerx.firebaseapp.com",
    projectId: "upcyclerx",
    storageBucket: "upcyclerx.appspot.com",
    messagingSenderId: "572437302493",
    appId: "1:572437302493:web:79763fdbfd07cc67d8df34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const firestoreDb = getFirestore(app)


