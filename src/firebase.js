import firebase from "firebase/compat/app"; //v9
import "firebase/compat/firestore";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB1uEck8JeuXpfgf00cNCy95TbYiJ0_RtE",
  authDomain: "closer-309b4.firebaseapp.com",
  projectId: "closer-309b4",
  storageBucket: "closer-309b4.appspot.com",
  messagingSenderId: "325292918607",
  appId: "1:325292918607:web:a757010e228b600174a73a",
  measurementId: "G-7RZV1J9RN1",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
