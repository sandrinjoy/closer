import firebase from "firebase/compat/app"; //v9
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage"
const app = firebase.initializeApp({
  apiKey: "AIzaSyB1uEck8JeuXpfgf00cNCy95TbYiJ0_RtE",
  authDomain: "closer-309b4.firebaseapp.com",
  projectId: "closer-309b4",
  storageBucket: "closer-309b4.appspot.com",
  messagingSenderId: "325292918607",
  appId: "1:325292918607:web:a757010e228b600174a73a",
  measurementId: "G-7RZV1J9RN1",
})

export const googleProvider=new firebase.auth.GoogleAuthProvider();

//firestore

 const firestore=app.firestore()
 const createUser =(uid, data)=>{
  firestore.collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};
 export const db={
  users:firestore.collection('users'),
   posts:firestore.collection('posts'),
   getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
   createUser
 }
export const photodb=app.storage();
export const auth = app.auth()
export default app