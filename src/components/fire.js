import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyD6tA3Vsy5p-7uGXlxZrd0gw8T-RI24zR4",
	authDomain: "expense-tracker-c19e7.firebaseapp.com",
	projectId: "expense-tracker-c19e7",
	storageBucket: "expense-tracker-c19e7.appspot.com",
	messagingSenderId: "973539468894",
	appId: "1:973539468894:web:aa227208d1d849340076cf",
	measurementId: "G-F83SQ6GZSD",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { storage, auth, db };
