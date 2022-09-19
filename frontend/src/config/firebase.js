import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAaHRozr7Qfee0iWcvvWqIKOQHkGjwQriE",
  authDomain: "tdt4140-gruppe-68.firebaseapp.com",
  projectId: "tdt4140-gruppe-68",
  storageBucket: "tdt4140-gruppe-68.appspot.com",
  messagingSenderId: "381080966456",
  appId: "1:381080966456:web:ac8f8467f1419da8e31dcd",
  measurementId: "G-6HB1DGZ96X",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (
  firstName,
  lastName,
  username,
  email,
  password
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const search_tags = firstName
      .toLowerCase()
      .split(" ")
      .concat(lastName.toLowerCase().split(" "));
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      firstName,
      lastName,
      username,
      authProvider: "local",
      email,
      firstName,
      lastName,
      search_tags: search_tags,
      admin: false,
      commercial: false,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerCommercialUserWithEmailAndPassword = async (
  companyName,
  companyNrName,
  email,
  password
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const search_tags = companyName.toLowerCase().split(" ");
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      companyName,
      companyNrName,
      authProvider: "local",
      email,
      search_tags: search_tags,
      admin: false,
      commercial: true,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  registerCommercialUserWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
