import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import products from "./products.json"

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

// const uploadProducts = async () => {
//   const colRef = collection(db, "products");

//   for (const item of products) {
    // const data = {
    //   title: item.product.copy.title,
    //   subTitle: item.product.copy.subTitle,
    //   productCode: item.product.productCode,
    //   price: item.product.prices.currentPrice,
    //   initialPrice: item.product.prices.initialPrice,
    //   discountPercentage: item.product.prices.discountPercentage,
    //   image: item.product.colorwayImages.squarishURL,
    //   pdpUrl: item.product.pdpUrl.url,
    //   createdAt: new Date(),
    // };

//     await setDoc(doc(colRef), data);
//   }
// };

// uploadProducts()

export { app, db, auth };