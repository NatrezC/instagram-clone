


import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDfQ_2Mnxp2nXbW6C2F39DMnBty78hibuM",
    authDomain: "instagram-clone-c1d19.firebaseapp.com",
    projectId: "instagram-clone-c1d19",
    storageBucket: "instagram-clone-c1d19.appspot.com",
    messagingSenderId: "388453731041",
    appId: "1:388453731041:web:0ff1b7ceca3c5dfd0dc5a0",
    measurementId: "G-VCJY308E1Z"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };