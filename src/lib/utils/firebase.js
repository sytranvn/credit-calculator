// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRMVIiHzzmaqru64YKtuXVRrBGH46HlZM",
  authDomain: "dttx-hcmus.firebaseapp.com",
  projectId: "dttx-hcmus",
  storageBucket: "dttx-hcmus.appspot.com",
  messagingSenderId: "1044867665662",
  appId: "1:1044867665662:web:887ed07b6ec9831f085faf",
  measurementId: "G-ET0XKV3L7J"
};
// Initialize Firebase
export function initialize() {
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	return { app, analytics }
}
