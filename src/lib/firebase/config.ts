import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "@firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQaEvCqR5jylJhMB5gfccp9S9hhU4dcRQ",
  authDomain: "http://jungle-react-realtime-chat.firebaseapp.com",
  projectId: "jungle-react-realtime-chat",
  storageBucket: "jungle-react-realtime-chat.appspot.com",
  messagingSenderId: "887909190805",
  appId: "1:887909190805:web:1381530550041c68b6df9c",
  measurementId: "G-XMK6RZBGC3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);
const fireStore = getFirestore(firebaseApp);

export { firebaseApp, db, firebaseStorage, fireStore };
