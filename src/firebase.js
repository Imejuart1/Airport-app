import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Initialize Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHp5maA9CFj4UkXe_xzlEiRtt0HxKfHss",
  authDomain: "pipureport-6b980.firebaseapp.com",
  projectId: "pipureport-6b980",
  storageBucket: "pipureport-6b980.appspot.com",
  messagingSenderId: "246680606543",
  appId: "1:246680606543:web:d518f2534cbfd5b45a173a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
