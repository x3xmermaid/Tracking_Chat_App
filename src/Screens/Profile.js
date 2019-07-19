import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity
} from 'react-native';
import { createUser } from '../Firebase/FirebaseCRUD';
import Geolocation from '@react-native-community/geolocation';
// import console = require('console');

// eslint-disable-next-line react/prefer-stateless-function
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      image: 'https://res.cloudinary.com/dvyonb6zt/image/upload/v1563542754/Product/ggirl_omijq3.png',
      latitude: '',
      longtitude: '',
      error: ''
    };
  }

  componentDidMount(){
    const {navigation} = this.props;
    this.setState({
      image: navigation.getParam('image'),
      name: navigation.getParam('name')
    })
  }

  goback = () => {
    const {navigation} = this.props;
    navigation.goBack()
  }
  render() {
    // console.log("this.state.email");
    return (
      <View>
        <View style={style.backgroundUp}>
          <ImageBackground style={style.imageBox} source={{uri: this.state.image}} />
        </View>
        <View style={style.loginBox}>
          <Text style={style.loginText}>{this.state.name}</Text>
          <View style={style.detailTextBox}>
            <View style={style.iconBox}>
                <ImageBackground style={style.imageIcon} source={require('../Assets/icon/email.png')}/>
              {/* </ImageBackground> */}
            </View>
            <Text style={style.textTop}>try.insoft@gmail.com</Text>
          </View>
          <View style={style.detailTextBox}>
            <View style={style.iconBox}>
                <ImageBackground style={style.imageIcon} source={require('../Assets/icon/gender.png')}/>
              {/* </ImageBackground> */}
            </View>
            <Text style={style.textTop}>Male</Text>
          </View>
          <View style={style.detailTextBox}>
            <View style={style.iconBox}>
                <ImageBackground style={style.imageIcon} source={require('../Assets/icon/phone2.png')}/>
              {/* </ImageBackground> */}
            </View>
            <Text style={style.textTop}>0823 9108 2250</Text>
          </View>
          <View style={style.detailTextBox}>
            <View style={style.iconBox}>
                <ImageBackground style={style.imageIcon} source={require('../Assets/icon/ig.png')}/>
              {/* </ImageBackground> */}
            </View>
            <Text style={style.textTop}>@try_a.k.a_mermaids</Text>
          </View>
          <TouchableOpacity style={style.button} onPress={() => this.goback()}>
              <Text style={[style.loginText, { color: 'white' }]}>Follow</Text>
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
    height: fullHeight / 3,
    width: fullWidth,
    backgroundColor: 'rgba(49, 128, 228, 0.8)',
    position: 'absolute',
    top: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageIcon: {
    height: 25,
    width: 25
  },
  backgroundDown: {
    height: fullHeight / 2,
    width: fullWidth,
    backgroundColor: 'white',
    position: 'absolute',
    top: fullHeight / 2,
    zIndex: 1
  },
  detailTextBox:{
    flexDirection: 'row',
    borderColor: 'rgba(49, 128, 228, 0.8)',
    borderBottomWidth: 3,
    alignItems: 'center',
    marginTop: 15
  },
  iconBox: {
    width: 35,
    height: 35,
    backgroundColor: 'rgba(49, 128, 228, 0.8)',
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'white',
    overflow: "hidden",
    borderColor: 'white',
    borderWidth: 5,
    marginTop: -40
    // zIndex: 
    // backgroundImage: 'url(../Assets/icon/home.png)',
  },
  loginBox: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 10,
    borderColor: '#rgba(49, 128, 228, 0.8)',
    borderWidth: 4,
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
    marginBottom: 15,
    color: 'rgba(49, 128, 228, 0.8)'
    //   alignSelf: 'center'
  },
  textTop: {
    color: '#rgba(49, 128, 228, 0.8)',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
    // alignSelf: 'stretch'
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
    backgroundColor: 'rgba(49, 128, 228, 0.8)',
    position: 'absolute',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: 10,
    bottom: 0,
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
export default Profile;
