import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity, AsyncStorage
} from 'react-native';
import firebase from '../Firebase/Firebase';
import { loginUser } from '../Firebase/FirebaseCRUD';
import User from '../User';
// import console = require('console');
// import console = require('console');

// eslint-disable-next-line react/prefer-stateless-function
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  _checkLogin = () => {

    const { navigation } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // AsyncStorage.setItem('userId', 'user.uid');
        // console.log(user.uid)
        // console.log(user)
        firebase.database().ref('users').child(user.uid).once('value', (snapshot) => {
          let user = snapshot.val();
          // console.log(snapshot.val())
          // console.log(user)
          // console.log(user)
          navigation.navigate('HomeScreen', {
            id: user.id,
            imageUrl: user.imageUrl,
            name: user.name

          });
        })
      } else {
        // No user is signed in.
      }
    });
  }

  componentDidMount() {
    this._checkLogin();
  }

  _login = () => {
    const { navigation } = this.props;
    loginUser(this.state, (value, uid) => {
      // console.log('isLogin');
      // console.log(valu0000e);
      if (value) {
        firebase.database().ref('users').child(uid).once('value', (snapshot) => {
          let user = snapshot.val();
          navigation.navigate('HomeScreen', {
            id: user.id,
            imageUrl: user.imageUrl,
            name: user.name

          });
        })
      } else {

      }
    });
  }

  render() {
    return (
      <View>
        <View style={style.backgroundUp}>
          <ImageBackground style={style.imageBox} source={require('../Assets/icon/home.png')} />
        </View>
        <View style={style.loginBox}>
          <Text style={style.loginText}>LOGIN</Text>
          <Text style={style.textTop}>EMAIL</Text>
          <TextInput
            style={style.TextInput}
            onChangeText={text => this.setState({ email: text })}
          />
          <View style={style.line} />
          <Text style={style.textTop}>PASSWORD</Text>
          <TextInput
            style={style.TextInput}
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
          <View style={style.line} />
          <TouchableOpacity style={style.button1} onPress={() => this._login()}>
            <Text style={[style.loginText, { color: 'white' }]}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button2} onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={[style.loginText, { color: '#426BD7' }]}>REGISTER</Text>
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
    height: fullHeight / 2,
    width: fullWidth,
    backgroundColor: 'rgba(49, 128, 228, 0.8)',
    position: 'absolute',
    top: 0,
    zIndex: 1,
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
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: 'white',
    // backgroundImage: 'url(../Assets/icon/home.png)',
  },
  loginBox: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 5,
    height: fullHeight / 2 - 20,
    width: fullWidth - 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    top: fullHeight / 2 - 50,
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
  button1: {
    width: fullWidth - 240,
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#426BD7',
    position: 'absolute',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    zIndex: 10,
    bottom: -25,
    left: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  button2: {
    width: fullWidth - 240,
    height: 50,
    borderColor: '#426BD7',
    borderWidth: 2,
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    zIndex: 10,
    bottom: -25,
    right: 10,
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
export default Login;
