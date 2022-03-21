// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCqyE_AgtX_PiXAlrXdm-T-oymQLqKqX9w",
	authDomain: "auto-electronics-4e875.firebaseapp.com",
	projectId: "auto-electronics-4e875",
	storageBucket: "auto-electronics-4e875.appspot.com",
	messagingSenderId: "126535305493",
	appId: "1:126535305493:web:07819d46eddcee3317811c",
	measurementId: "G-3Q962CJ6SP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(app);
