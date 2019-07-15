// import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../Screens/Home';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default createAppContainer(AppNavigator);
