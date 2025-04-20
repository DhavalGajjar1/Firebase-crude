// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd4Bjrpeu87vvJm-T-VnlvPfbBSCCCT-s",
  authDomain: "crud-c6228.firebaseapp.com",
  projectId: "crud-c6228",
  storageBucket: "crud-c6228.firebasestorage.app",
  messagingSenderId: "860513460937",
  appId: "1:860513460937:web:76cf02893630493efde318"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const getFire = getFirestore(app);