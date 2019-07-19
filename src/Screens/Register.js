import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity
} from 'react-native';
import { createUser } from '../Firebase/FirebaseCRUD';
import Geolocation from '@react-native-community/geolocation';
// import console = require('console');

// eslint-disable-next-line react/prefer-stateless-function
class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      latitude: '',
      longtitude: '',
      error: ''
    };
  }

  // componentWillMount() {
  // }
  _Register = () => {
    const { navigation } = this.props;
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log('wokeeey');
        // console.log(position);
        // this.setState({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   error: null,
        // });
        // callback(position.coords)
        createUser(this.state, position.coords, function(value, uid, name){
            // console.log("Mermaid "+value)
          if(value){
            navigation.navigate('HomeScreen', {
              id: uid,
              name: name,
              imageUrl: 'https://res.cloudinary.com/dvyonb6zt/image/upload/v1563542754/Product/ggirl_omijq3.png'
            })
          }else{
            
          }
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
      
    // console.log(this.state)
    // 
  }

  render() {
    // console.log("this.state.email");
    return (
      <View>
        <View style={style.backgroundUp}>
          <ImageBackground style={style.imageBox} source={require('../Assets/icon/home.png')} />
        </View>
        <View style={style.loginBox}>
          <Text style={style.loginText}>REGISTER</Text>
          <Text style={style.textTop}>EMAIL</Text>
          <TextInput style={style.TextInput} onChangeText={text => this.setState({ email: text })} />
          <View style={style.line} />
          <Text style={style.textTop}>PASSWORD</Text>
          <TextInput style={style.TextInput} onChangeText={text => this.setState({ password: text })} />
          <View style={style.line} />
          <Text style={style.textTop}>FULLNAME</Text>
          <TextInput style={style.TextInput} onChangeText={text => this.setState({ name: text })} />
          <View style={style.line} />
          <TouchableOpacity style={style.button} onPress={() => this._Register()}>
              <Text style={[style.loginText, { color: 'white' }]}>REGISTER</Text>
          </TouchableOpacity>

        </View>
        <View style={style.backgroundDown} />
      </View>

    );
  }
}

const fullHeight = Dimensions.get('window').height;
const fullWidth = Dimensions.get('window').width;
const style = StyleSheet.create({
  backgroundUp: {
    // backgroundColor:
    height: fullHeight / 3.5,
    width: fullWidth,
    backgroundColor: 'rgba(49, 128, 228, 0.8)',
    position: 'absolute',
    top: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundDown: {
    height: fullHeight / 2,
    width: fullWidth,
    backgroundColor: 'white',
    position: 'absolute',
    top: fullHeight / 2,
    zIndex: 1
  },
  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'white',
    // backgroundImage: 'url(../Assets/icon/home.png)',
  },
  loginBox: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 10,
    height: fullHeight / 1.6,
    width: fullWidth - 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    top: fullHeight / 4,
    alignSelf: 'center',
    borderRadius: 10,
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 30
    //   alignSelf: 'center'
  },
  textTop: {
    color: '#5255C9',
    marginLeft: 10
  },
  line: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    width: fullWidth - 150,
    alignSelf: 'center',
    marginBottom: 15
  },
  TextInput: {
    marginLeft: 20
  },
  button: {
    width: fullWidth - 140,
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#426BD7',
    position: 'absolute',
    borderRadius: 25,
    zIndex: 10,
    bottom: -25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  }
});
export default Register;
