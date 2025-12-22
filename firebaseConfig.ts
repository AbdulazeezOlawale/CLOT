import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvNApZ88GcccszBxew9bgRRS1ANO2zr9E",
  authDomain: "clot-mobile.firebaseapp.com",
  projectId: "clot-mobile",
  storageBucket: "clot-mobile.firebasestorage.app",
  messagingSenderId: "1038012548498",
  appId: "1:1038012548498:web:5f4df2e2df5ccc0e35ad4b",
  measurementId: "G-3ZXF93D6M3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { app, db, auth };