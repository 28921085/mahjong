import firebase from 'firebase';
  
const firebaseConfig = {
    // Your Credentials
    apiKey: "AIzaSyCn56CtUzELbxXC32pqK1C_D5JNehpHidg",
    authDomain: "majohn-18fe6.firebaseapp.com",
    databaseURL: "https://majohn-18fe6-default-rtdb.firebaseio.com",
    projectId: "majohn-18fe6",
    storageBucket: "majohn-18fe6.appspot.com",
    messagingSenderId: "339614980126",
    appId: "1:339614980126:web:57adb0000a26e0286b360f",
    measurementId: "G-W2BPYVBMDZ"
};
    
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
  
export default database;