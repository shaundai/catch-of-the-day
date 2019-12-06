import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBFVnzH0KSFxX8XBRyQiEhkQqdqyrJeW_k",
    authDomain: "catch-of-the-day-shaundai.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-shaundai.firebaseio.com",
  })

  const base = Rebase.createClass(firebaseApp.database());

  export { firebaseApp };

  export default base;