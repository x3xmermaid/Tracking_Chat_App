import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDoLnjEOOUT4QowJkRn-H1AeU1a_AKBEvU',
  authDomain: 'trackingchat-f9724.firebaseapp.com',
  databaseURL: 'https://trackingchat-f9724.firebaseio.com',
  projectId: 'trackingchat-f9724',
  storageBucket: '',
  messagingSenderId: '27178196682',
  appId: '1:27178196682:web:388154c2820afaa3'
};
const Firebase = firebase.initializeApp(config);
export default Firebase;
