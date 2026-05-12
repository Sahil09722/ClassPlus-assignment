import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInAnonymously 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPIYZoFZCmfFKlWpdKbDumopsb6Ib18w4",
  authDomain: "classplus-assignment.firebaseapp.com",
  projectId: "classplus-assignment",
  storageBucket: "classplus-assignment.firebasestorage.app",
  messagingSenderId: "745337333848",
  appId: "1:745337333848:web:b27b359b96f9cb1064022d",
  measurementId: "G-9S1LF0H74P"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInAnonymously
};