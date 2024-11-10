// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9BAf9Ta7tM4_xfmWraer_trHS4ZL-YZs",

    authDomain: "clevers-school-resources.firebaseapp.com",

    projectId: "clevers-school-resources",

    storageBucket: "clevers-school-resources.appspot.com",

    messagingSenderId: "291303531177",

    appId: "1:291303531177:web:bc3c2f8294c0e94c283fb8",

    measurementId: "G-7V5QSX67WL"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage = getStorage(app);