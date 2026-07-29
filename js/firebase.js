import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYVUt2Rm-w1y0L61a72NbaELFzu_tkiC8",
  authDomain: "coffee-system-c3ec2.firebaseapp.com",
  projectId: "coffee-system-c3ec2",
  storageBucket: "coffee-system-c3ec2.firebasestorage.app",
  messagingSenderId: "312702943745",
  appId: "1:312702943745:web:d18fd554838126b558f600",
  measurementId: "G-TFN5Z0L658"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
