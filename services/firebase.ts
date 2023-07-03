import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAP0l0vM9OzevIUpawMJVDUH_mV9XrUcDU",
    authDomain: "patientimage-53dc6.firebaseapp.com",
    projectId: "patientimage-53dc6",
    storageBucket: "patientimage-53dc6.appspot.com",
    messagingSenderId: "353723347005",
    appId: "1:353723347005:web:8f77b5aab267ef48bf7a54",
    measurementId: "G-NDH2JC2X5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const store = getFirestore(app)
const storage = getStorage(app)

const firebase = {
    app,
    auth,
    store,
    storage
}

export default firebase