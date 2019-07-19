import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import firebase from '../Firebase/Firebase';
import {logOutUser}  from '../Firebase/FirebaseCRUD'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.navigation.getParam('id'),
      user: {
        image: props.navigation.getParam('imageUrl'),
        name: props.navigation.getParam('name'),
      },
      personId: '',
      personImage: 'https://res.cloudinary.com/dvyonb6zt/image/upload/v1563488814/Product/red_begw8v.png',
      personName: '',
      personGender: 'Female',
      pop: false,
      pop2: false,
      latitude: 0,
      longitude: 0,
      error: null,
      users: []
    };
    // dataUser()

    this.getUserLocation();
    // allUser();

    // this.sta
  }

  // async function requestCameraPermission() {


    componentDidMount() {
      const {navigation} = this.props;
      this.setState({
        id: navigation.getParam('id'),
        user: {
        image: navigation.getParam('imageUrl'),
        name: navigation.getParam('name'),
      },
      })
  }

  componentWillMount() {
    // console.log("Mermaid")
    // console.log(User.userId)
    const dbRef = firebase.database().ref('users');
    dbRef.on('child_added', (val) => {
      const person = val.val();
      person.id = val.key;
      // console.log(person);
      if (person.id === this.state.id) {
        // User.name = person.name;
        this.state.user.name = person.name
        this.state.user.image = person.imageUrl
      } else {
        this.setState(prevState => ({
          users: [...prevState.users, person]
        }));
        // console.log(this.state.user)
      }
    });
  }

  async getUserLocation() {
    // console.log("uid: "+user.uid)
    // dataUser(function(user){

    // })
    console.log(this.state.id)
    await Geolocation.getCurrentPosition(
      (position) => {
        // console.log('wokeeey');
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        firebase.database().ref(`users/${  this.state.id  }`).update({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  chat = () => {
    this.props.navigation.navigate('Chat', {
      id: this.state.id,
      userImage: this.state.user.image,
      personId: this.state.personId,
      personName: this.state.personName,
      personImage: this.state.personImage,
    });
  }

  popHandle = (value, data) => {
    console.log(data);
    this.setState({
      pop: value,
      personId: (value) ? data.id : '',
      personImage: (value) ? data.imageUrl : '',
      personName: (value) ? data.name : ''
    });
  }

  pop2Handle = (value) => {
    // console.log(data);
    this.setState({
      pop2: value,
    });
  }

  logOut = () => {
    const { navigation } = this.props;
    logOutUser(function(val){
      if(val){
        // console.log(val)
        navigation.navigate('Login');
      }else{

      }
    })
  }

  goProfile = () => {
    const { navigation } = this.props;
    navigation.navigate('Profile' ,{
      image: this.state.user.image,
      name: this.state.user.name
    })
  }

  goProfilePerson = () => {
    const { navigation } = this.props;
    navigation.navigate('Profile' ,{
      image: this.state.personImage,
      name: this.state.personName
    })
  }

  render() {
    // console.log(this.state.users)
    // this.state.users.map(data => (
    console.log(this.state.personGender)
    return (
      <View style={style.container}>
        <View style={style.header}>
          <View style={style.headRight}>
            <TouchableOpacity style={style.profileImage} onPress={() => this.goProfile()}>
              <ImageBackground style={{ width: 50, height: 50 }} source={{ uri: this.state.user.image }}></ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={style.headMid}>
          </View>
          <View style={style.headMidBox}>
            <Text style={style.headText}>{this.state.user.name}</Text>
          </View>
          <View style={style.headLeft}>
            <TouchableOpacity style={style.iconImage} onPress={() => this.pop2Handle(true)}>
              <ImageBackground style={{ width: 30, height: 30 }} source={require('../Assets/icon/log_out.png')}></ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.pop === true
          && (
            <View style={style.modal}>
              <TouchableOpacity onPress={() => this.popHandle(false)} style={style.buttonRight}>
                <Text style={{ color: '#426BD7', fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', fontSize: 20 }}>X</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.goProfilePerson()}>
                  <ImageBackground style={style.imageModal} source={{ uri: this.state.personImage }} />
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                  <Text style={style.textModal}>{this.state.personName}</Text>
                  <Text style={style.textModal}>{this.state.personGender}</Text>
                  <TouchableOpacity onPress={() => this.chat()} style={style.buttonLeft}>
                    <Text style={style.textButton}>Chat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }
        {this.state.pop2 === true
          && (
            <View style={style.modal}>
              <TouchableOpacity onPress={() => this.pop2Handle(false)} style={style.buttonRight}>
                <Text style={{ color: '#426BD7', fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', fontSize: 20 }}>X</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {/* <ImageBackground style={style.imageModal} source={{uri: this.state.personImage}}/> */}
                <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                  <Text style={[style.textModal, { textAlign: 'center' }]}>Are you sure want to</Text>
                  <Text style={[style.textModal, { textAlign: 'center' }]}> log out ?</Text>
                  <View style={{ flexDirection: 'row', marginTop: 8}}>
                    <TouchableOpacity onPress={() => this.logOut()} style={style.buttonLeft2}>
                      <Text style={style.textButton}>Log Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.pop2Handle(false)} style={style.buttonLeft2}>
                      <Text style={style.textButton}>Cancel</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>
            </View>
          )
        }
        {/* } */}


        <MapView
          style={style.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Marker
            coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
            title="Your Location"
          />
          {/* <MapView.Marker
            coordinate={{ latitude: -7.758467, longitude: 110.3882251 }}
            title="Your Location"
          /> */}
          {
            this.state.users.map(data => (
              // <TouchableOpacity >
              <MapView.Marker
                coordinate={{ latitude: data.latitude, longitude: data.longitude }}
                title={data.name}
                onPress={() => this.popHandle(true, data)}
              />
              // </TouchableOpacity>
            ))
          }
        </MapView>
        <View>
          {/* <F */}
        </View>
      </View>
    );
  }
}

const fullHeight = Dimensions.get('window').height;
const fullWidth = Dimensions.get('window').width;
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    height: 80,
    width: fullWidth,
    position: 'absolute',
    top: 25,
    // backgroundColor: 'red',
    zIndex: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headRight: {
    height: 8,
    width: 40,
    // borderColor:'#426BD7',
    borderRightColor: '#426BD7',
    borderBottomColor: '#426BD7',
    borderTopColor: '#426BD7',
    borderLeftColor: '#f0f6ff',
    borderWidth: 3,
    backgroundColor: '#f0f6ff',
    zIndex: 5
    // position
  },
  headMid: {
    height: 8,
    width: fullWidth,
    // borderColor:'#426BD7',
    borderRightColor: '#426BD7',
    borderBottomColor: '#426BD7',
    borderTopColor: '#426BD7',
    borderLeftColor: '#f0f6ff',
    borderWidth: 3,
    backgroundColor: '#f0f6ff',
    position: 'absolute',
    zIndex: 1
    // position
  },
  headMidBox: {
    zIndex: 5,
  },
  headText: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#426BD7',
    borderWidth: 3,
    borderRadius: 5,
    backgroundColor: '#f0f6ff',
    color: '#426BD7',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headLeft: {
    height: 35,
    width: 40,
    // borderColor:'#426BD7',
    borderRightColor: '#f0f6ff',
    borderBottomColor: '#426BD7',
    borderTopColor: '#426BD7',
    borderLeftColor: '#f0f6ff',
    borderWidth: 3,
    backgroundColor: '#f0f6ff',
    // borderRadius: 50,
    // position
    zIndex: 5
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    overflow: 'hidden',
    position: 'absolute',
    right: -32,
    top: -25,
    borderColor: '#426BD7',
    borderWidth: 3,
    zIndex: 35,
    // borderRightWidth: 3,
    // borderBottomWidth: 3,
    // padding: 3,
    justifyContent: 'center',
    alignItems: "center"
  },
  iconImage: {
    height: 45,
    width: 45,
    borderRadius: 50,
    overflow: 'hidden',
    position: 'absolute',
    left: -22,
    top: -8,
    borderColor: '#426BD7',
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    // borderEndColor: '#426BD7' ,
    backgroundColor: '#f0f6ff',
    justifyContent: 'center',
    alignItems: "center"
  },
  imageModal: {
    height: 80,
    width: 80,
    borderRadius: 10,
    borderColor: '#00aaff',
    borderWidth: 2,
    overflow: 'hidden'
  },
  modal: {
    height: '20%',
    width: '68%',
    position: 'absolute',
    zIndex: 15,
    backgroundColor: '#f0f6ff',
    top: fullHeight / 4,
    borderRadius: 20,
    alignSelf: 'center',
    borderColor: '#426BD7',
    borderWidth: 5,
    padding: 5
    // justifyContent: 'space-around'
    // alignItems: "center"
  },
  textModal: {
    color: '#426BD6',
    fontSize: 16
  },
  footerModal: {
    position: 'absolute',
    zIndex: 16,
    bottom: 0,
    flexDirection: 'row',
    padding: 5,
    // justifyContent: 'center',
    // alignItems: 'center'
    alignSelf: 'center'
  },
  buttonLeft: {
    borderColor: '#f0f6ff',
    width: 125,
    height: 35,
    marginLeft: 0,
    borderWidth: 2,
    marginTop: 2,
    borderRadius: 10,
    backgroundColor: '#426BD7',
    // borderTopRightRadius: 20,
    marginLeft: -2,
    padding: 1

  },
  buttonLeft2: {
    borderColor: '#f0f6ff',
    width: 105,
    height: 35,
    marginLeft: 0,
    borderWidth: 2,
    marginTop: 2,
    borderRadius: 10,
    backgroundColor: '#426BD7',
    // borderTopRightRadius: 20,
    marginLeft: -2,
    padding: 1

  },
  buttonRight: {
    borderColor: '#426BD7',
    position: 'absolute',
    right: -15,
    top: -15,
    width: 40,
    height: 40,
    borderWidth: 5,
    borderRadius: 50,
    backgroundColor: 'white',
    margin: 1

  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});
export default Home;
