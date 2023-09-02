// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNfeSaDPaO-RwlkK2fSTzedXwLgUKVTCw",
  authDomain: "diemtinchi.firebaseapp.com",
  projectId: "diemtinchi",
  storageBucket: "diemtinchi.appspot.com",
  messagingSenderId: "627527722288",
  appId: "1:627527722288:web:e719cb24743468fdf494f5",
  measurementId: "G-QJX32PXRRN"
};
// Initialize Firebase
export function initialize() {
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	return { app, analytics }
}
