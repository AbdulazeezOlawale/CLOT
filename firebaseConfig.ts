import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import products from "./products.json"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
