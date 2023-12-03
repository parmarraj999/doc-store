import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDiwBYOWmpoGK_mnxhKhkEA14IT1znl-eA",
  authDomain: "doc-store-51d2c.firebaseapp.com",
  projectId: "doc-store-51d2c",
  storageBucket: "doc-store-51d2c.appspot.com",
  messagingSenderId: "23344550403",
  appId: "1:23344550403:web:4652269ed45f91b3f1b436"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const datastore = getFirestore(app);

export { auth, storage , datastore}