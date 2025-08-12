
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const firebaseConfig = {
  apiKey: "AIzaSyB4C3FLwhcS8rT4lr_y9wkHGdCT0PDpWjM",
  authDomain: "netflix-clone-2ee4d.firebaseapp.com",
  projectId: "netflix-clone-2ee4d",
  storageBucket: "netflix-clone-2ee4d.firebasestorage.app",
  messagingSenderId: "646862244148",
  appId: "1:646862244148:web:19b75a32e4736da52cbd61",
  measurementId: "G-V49BL6DMD7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name,email,password)=> {
    try {
       const res =  await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: name,
          authProvider: "local",
          email:email,
       });
    }catch (error) {
        console.error("Error signing up:", error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logIn = async(email, password) => {
  try {
   await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in:", error);
     toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const logOut = () => {
  signOut(auth);

}

export {auth, db, signUp, logIn, logOut};