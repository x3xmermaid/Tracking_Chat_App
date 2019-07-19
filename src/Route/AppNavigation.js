// import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from '../Screens/Home';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Chat from '../Screens/Chat';
import Profile from '../Screens/Profile';

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  HomeScreen: {
    screen: HomeScreen
  },
  Profile: {
    screen: Profile
  },
  Chat: {
    screen: Chat
  },
  Register: {
    screen: Register
  },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

export default createAppContainer(AppNavigator);
