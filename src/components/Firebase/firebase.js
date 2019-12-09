import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

export default class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.firestore = firebase.firestore();
    this.auth = firebase.auth();
    this.doSignOut = this.doSignOut.bind(this);
  }

  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut() {
    return this.auth.signOut();
  }

  doPasswordReset(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(password) {
    return this.auth.currentUser.updatePassword(password);
  }

  // *** User API ***
  user(uid) {
    return this.firestore.collection("users").doc(uid);
  }

  users() {
    return this.firestore.collection("users");
  }

  // *** Forum Post API ***
  forumPost(forumPostId) {
    return this.firestore.collection("forum_posts").doc(forumPostId);
  }

  forumPosts() {
    return this.firestore.collection("forum_posts");
  }

  createForumPost(forumPost) {
    return this.firestore.collection("forum_posts").add(forumPost);
  }
}
