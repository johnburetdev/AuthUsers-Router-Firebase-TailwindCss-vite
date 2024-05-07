import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCv-nXMpFGhhvFtR3XPVSx81L_Twj8HUQQ",
  authDomain: "authfirebase-reactrouter.firebaseapp.com",
  projectId: "authfirebase-reactrouter",
  storageBucket: "authfirebase-reactrouter.appspot.com",
  messagingSenderId: "262025578580",
  appId: "1:262025578580:web:0cc3b4332fcabf8c2e05c1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}