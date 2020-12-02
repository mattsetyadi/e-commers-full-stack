import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD6KMl-CszC3LK0BpktT4Z346UrtdSl0Oo",
  authDomain: "ms-store-23819.firebaseapp.com",
  databaseURL: "https://ms-store-23819.firebaseio.com",
  projectId: "ms-store-23819",
  storageBucket: "ms-store-23819.appspot.com",
  messagingSenderId: "550312245900",
  appId: "1:550312245900:web:b9e434950f9de1e55f99a9",
  measurementId: "G-QZ04JE0NMF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
