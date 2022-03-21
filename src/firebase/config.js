// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: "auto-electronics-4e875.firebaseapp.com",
	projectId: "auto-electronics-4e875",
	storageBucket: "auto-electronics-4e875.appspot.com",
	messagingSenderId: process.env.REACT_APP_FIREBASE_PROJECT_MESSING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(app);
