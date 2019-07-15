
import React, { Component } from 'react';
import firebase from 'firebase';
import AppContainer from './src/Route/AppNavigation';

// import { createAppContainer } from 'react-navigation';

// const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDoLnjEOOUT4QowJkRn-H1AeU1a_AKBEvU',
      authDomain: 'trackingchat-f9724.firebaseapp.com',
      databaseURL: 'https://trackingchat-f9724.firebaseio.com',
      projectId: 'trackingchat-f9724',
      storageBucket: '',
      messagingSenderId: '27178196682',
      appId: '1:27178196682:web:388154c2820afaa3'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // firebase.database().ref('users/001').set(
    //   {
    //     name: 'Mermaid',
    //     age: 21
    //   }
    // ).then(() => {
    //   console.log('INSERTED !');
    // })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    firebase.database().ref('users').once('value', (data)=> {
      console.log(data.toJSON());
    });
  }

  render() {
    return <AppContainer />;
  }
}
