// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {getFirestore} from 'firebase/firestore'
//this allows you to connect to db

import {getAuth} from 'firebase/auth'
//to use authentication


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIzzjnkbZBZ24gDFzHDHqV9r_p4HK_Luo",
  authDomain: "fir-blog-62135.firebaseapp.com",
  projectId: "fir-blog-62135",
  storageBucket: "fir-blog-62135.appspot.com",
  messagingSenderId: "307317635270",
  appId: "1:307317635270:web:c5611bfc39b2627fa8bfc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//set up db and export
export const db = getFirestore(app)

//set up auth and export it
export const auth = getAuth(app)