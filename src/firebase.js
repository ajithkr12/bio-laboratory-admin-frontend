import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDGq9VxO7m0ViCq2j2P31Vq5lvmWZUW-ro",
    authDomain: "bio-lab-65b9b.firebaseapp.com",
    projectId: "bio-lab-65b9b",
    storageBucket: "bio-lab-65b9b.appspot.com",
    messagingSenderId: "577587998243",
    appId: "1:577587998243:web:a39ceacb172cfe919acb96",
    measurementId: "G-EMZ271Y78V"
};
 


// // Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);
export const storage = getStorage(firebaseApp);


























// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDGq9VxO7m0ViCq2j2P31Vq5lvmWZUW-ro",
//   authDomain: "bio-lab-65b9b.firebaseapp.com",
//   projectId: "bio-lab-65b9b",
//   storageBucket: "bio-lab-65b9b.appspot.com",
//   messagingSenderId: "577587998243",
//   appId: "1:577587998243:web:a39ceacb172cfe919acb96",
//   measurementId: "G-EMZ271Y78V"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);