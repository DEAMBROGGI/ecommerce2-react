import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR KEY",
  authDomain: "YOUR KEY",
  databaseURL: "YOUR KEY",
  projectId: "YOUR KEY",
  storageBucket: "YOUR KEY",
  messagingSenderId: "YOUR KEY",
  appId: "YOUR KEY",
  measurementId: "YOUR KEY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth();
export {auth}

