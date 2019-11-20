import React from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from "./components/Firebase/firebase";

function testFirestore() {
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  const userRef = db.collection("users")
  let allUsers = userRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

}

function App() {
  testFirestore();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          We are in {process.env.NODE_ENV}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
