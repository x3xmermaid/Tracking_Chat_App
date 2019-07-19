import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import realFirebase from 'firebase'
import { createUser } from '../Firebase/FirebaseCRUD';
import firebase from '../Firebase/Firebase';
// import console = require('console');

// eslint-disable-next-line react/prefer-stateless-function
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: props.navigation.getParam('id'),
        image: props.navigation.getParam('userImage'),
        // userImage: props.navigation.getParam('id'),
      },
      person:{
        id: props.navigation.getParam('personId'),
        name: props.navigation.getParam('personName'),
        image: props.navigation.getParam('personImage'),
      },
      email: '',
      password: '',
      chat: '',
      chatList: [],
      isSender: false
    };
  }

  componentWillMount() {
    firebase.database().ref('messages').child(this.state.user.id).child(this.state.person.id)
      .on('child_added', (val) => {
        this.setState((prevState) => ({
                chatList: [...prevState.chatList, val.val()]
            }));
      });
    // console.log()
  }

 sendMessage = async () => {
   if (this.state.chat.length > 0) {
     const user = firebase.auth().currentUser;
     const msgId = firebase.database().ref('messages').child(user.uid).child(this.state.person.id)
       .push().key;
     const updates = {};
     const message = {
       message: this.state.chat,
       time: realFirebase.database.ServerValue.TIMESTAMP,
       from: this.state.user.id
     };
     updates[`messages/${user.uid}/${this.state.person.id}/${msgId}`] = message;
     updates[`messages/${this.state.person.id}/${user.uid}/${msgId}`] = message;
     firebase.database().ref().update(updates);
     this.setState({ chat: ' ' });
   }
 }


  convertTime = (time) => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
        result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  }

  renderRow =({ item }) => (
        <View style={{
            flexDirection:'row',
            // width:'60%',
            alignSelf: 'center',
            // backgroundColor: item.from === this.state.id ? '#00897b' : '#7cb342',
            borderRadius:5,
            marginBottom:10
        }}>
          {(item.from === this.state.person.id) ? 
                <View style={style.chatBoxLeft}>
              <ImageBackground style={style.imageChat} source={{uri: this.state.person.image}} />
              <Text style={style.textChatLeft}>{this.convertTime(item.time)}</Text>
              <Text style={style.textChatLeft}>{item.message}</Text>
            </View> 
        :
        <View style={style.chatBoxRight}>
        <ImageBackground style={style.imageChatRight} source={{uri: this.state.user.image}} />
        <Text style={style.textChatRight}>{this.convertTime(item.time)}</Text>
        <Text style={style.textChatRight}>{item.message}</Text>
      </View>
          }
            
        

        </View>
    )


  render() {
    // console.log("this.state.email");
    return (
      <View>
        <View style={style.header}>
          <View style={style.headerIcon}>
            <ImageBackground style={[style.imageIcon, { width: 30 }]} source={require('../Assets/icon/back.png')} />
            <Text style={style.textHeader}>{this.state.person.name}</Text>
          </View>
          <View style={style.headerIcon}>
            <ImageBackground style={style.imageIcon} source={require('../Assets/icon/phone.png')} />
            <ImageBackground style={style.imageIcon} source={require('../Assets/icon/tripleDot.png')} />
          </View>
          {/* <ImageBackground style={style.imageBox} source={require('../Assets/icon/home.png')} /> */}
        </View>
        <FlatList
          style={{ padding: 5, fullHeight: fullHeight * 0.8, marginTop: 60, paddingTop: 5}}
          data={this.state.chatList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={style.sendBox}>
          <ImageBackground style={[style.imageIcon, { width: 40, height: 40 }]} source={require('../Assets/icon/plus.png')} />
          <TextInput style={style.TextInput} onChangeText={text => this.setState({ chat: text })} placeholder="Type a message here" />
          <TouchableOpacity onPress={this.sendMessage}>
            <ImageBackground style={[style.imageIcon, { width: 40, height: 40 }]} source={require('../Assets/icon/send.png')} />
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const fullHeight = Dimensions.get('window').height;
const fullWidth = Dimensions.get('window').width;
const style = StyleSheet.create({
  header: {
    // backgroundColor:
    height: 60,
    width: fullWidth,
    backgroundColor: 'rgba(49, 128, 228, 0.8)',
    position: 'absolute',
    top: 0,
    zIndex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  sendBox: {
    // backgroundColor:
    height: 60,
    width: fullWidth,
    backgroundColor: 'rgba(49, 128, 228, 0.8)',
    position: 'absolute',
    top: fullHeight-85,
    zIndex: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 12
  },
  headerIcon: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5
  },
  textHeader: {
    marginLeft: 10,
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold'
  },
  textChatLeft: {
    marginLeft: 65,
    color: '#426BD7'
  },
  textChatRight: {
    marginLeft: 10,
    color: 'white'
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
  imageChat: {
    width: 75,
    height: 75,
    borderRadius: 100,
    overflow: 'hidden',
    // backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 5,
    position: 'absolute',
    left: -10,
    top: -10
    // zIndex: 5
    // backgroundImage: 'url(../Assets/icon/home.png)',
  },
  imageChatRight: {
    width: 75,
    height: 75,
    borderRadius: 100,
    overflow: 'hidden',
    // backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 5,
    position: 'absolute',
    right: -10,
    top: -10
    // zIndex: 5
    // backgroundImage: 'url(../Assets/icon/home.png)',
  },
  round: {
    height: 75,
    width: 75,
    backgroundColor: 'blue',
    borderRadius: 100,
    position: 'absolute',
    top: -10,
    left: -5
  },
  chatBoxLeft: {
    marginLeft: -50,
    width: fullWidth / 1.5,
    height: 70,
    // position: 'absolute',
    // top: fullHeight / 2,
    backgroundColor: '#f0f6ff',
    borderRadius: 20,
    borderColor: '#426BD7',
    borderWidth: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5,
    padding: 5
    //   zIndex: 4
  },
  chatBoxRight: {
    marginRight: -50,
    width: fullWidth / 1.5,
    height: 70,
    // position: 'absolute',
    // top: fullHeight / 3,
    backgroundColor: '#426BD7',
    borderRadius: 20,
    borderColor: '#426BD7',
    borderWidth: 2,
    borderBottomLeftRadius: 5,
    padding: 5,
    // paddingLeft: 10
    //   zIndex: 4
  },
  imageIcon: {
    width: 20,
    height: 20,
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
    marginLeft: 5,
    marginRight: 10,
    backgroundColor: 'white',
    color: '#426BD7',
    borderRadius: 10,
    width: fullWidth / 1.5
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
export default Chat;
