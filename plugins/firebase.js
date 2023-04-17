import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTvtOpgxhLutDo_Cc1EBpplvwR1dUKglk",
  authDomain: "ties-57e6d.firebaseapp.com",
  projectId: "ties-57e6d",
  storageBucket: "ties-57e6d.appspot.com",
  messagingSenderId: "151804178297",
  appId: "1:151804178297:web:2174cc7c2219c882a989a8",
  measurementId: "G-2V5WBCFQRP",
};

const app = initializeApp(firebaseConfig);

//authentication and database
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export default app;
