import firebase from 'firebase/app'
import "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAXB9Pqy8wNYy49D9_XifW1vG-Tu4PQKpA",
    authDomain: "alimentation-851c0.firebaseapp.com",
    databaseURL: "https://alimentation-851c0-default-rtdb.firebaseio.com",
    projectId: "alimentation-851c0",
    storageBucket: "alimentation-851c0.appspot.com",
    messagingSenderId: "132252995768",
    appId: "1:132252995768:web:c65a81ad75994283c6a44d",
    measurementId: "G-2ZBNYX3CNN"
  };
  if (!firebase.apps.length)
  {

      firebase.initializeApp(firebaseConfig);
  }
  else
  {
      firebase.app();
  }

  export default firebase;