import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJbk7iMvGul3nbWZVEtnDCfjUyVEGZCYs",
  authDomain: "e-commerce-e76f2.firebaseapp.com",
  databaseURL: "https://e-commerce-e76f2-default-rtdb.firebaseio.com",
  projectId: "e-commerce-e76f2",
  storageBucket: "e-commerce-e76f2.appspot.com",
  messagingSenderId: "1074505556237",
  appId: "1:1074505556237:web:a444f7fbf93e76e2f6d044",
  measurementId: "G-4BC1ZSJL0X",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
