import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDIF3geqOPyyK4jjas1K01olS_7u5rTlO8",
  authDomain: "react-rmdb.firebaseapp.com",
  databaseURL: "https://react-rmdb.firebaseio.com",
  projectId: "react-rmdb",
  storageBucket: "react-rmdb.appspot.com",
  messagingSenderId: "442364786576"
};

const firebaseApp = firebase.initializeApp(config);
const database = firebase.database();
const githubProvider = new firebase.auth.GithubAuthProvider();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebaseApp, githubProvider , googleAuthProvider, database as default };
