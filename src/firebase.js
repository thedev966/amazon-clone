import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC_hhn60d2nov1dkWHYtSk9pjgUeAQ6yFA",
  authDomain: "clone-b8bad.firebaseapp.com",
  projectId: "clone-b8bad",
  storageBucket: "clone-b8bad.appspot.com",
  messagingSenderId: "1060311405708",
  appId: "1:1060311405708:web:eeb697d4aba9886370d7a9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

export { auth, db };
