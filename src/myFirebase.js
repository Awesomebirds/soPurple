import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/storage";

//configuration from env
var firebaseConfig = {
  apiKey: "AIzaSyDdjOZRFDNQSkmj1R6TdcD94SnY3KyBCrg",
  authDomain: "sopurple-7a14d.firebaseapp.com",
  projectId: "sopurple-7a14d",
  storageBucket: "sopurple-7a14d.appspot.com",
  messagingSenderId: "304545744626",
  appId: "1:304545744626:web:163b5d98d2033fd717b26b",
  measurementId: "G-WZHP3L2FVR",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const storageService = firebase.storage();

export const authService = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
