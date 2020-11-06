import * as firebase from "firebase/app";

import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDklqeknBwWWoUQdZDNMvxoJTYaa9hj95M",
    authDomain: "notasestudiates.firebaseapp.com",
    databaseURL: "https://notasestudiates.firebaseio.com",
    projectId: "notasestudiates",
    storageBucket: "notasestudiates.appspot.com",
    messagingSenderId: "4359422220",
    appId: "1:4359422220:web:5dfee0e7c31d25745cc929"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();

export { auth, google };
