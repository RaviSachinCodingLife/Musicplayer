import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSjitPCmN9t5smS8lJzdyv0pwyb7qGOG0",
  authDomain: "musicplayer-d35cc.firebaseapp.com",
  projectId: "musicplayer-d35cc",
  storageBucket: "musicplayer-d35cc.firebasestorage.app",
  messagingSenderId: "249215336467",
  appId: "1:249215336467:web:17801c474e40c221d67fe6",
  measurementId: "G-XTNP2Y140X"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };