import firebase from './Firebase';
// import console = require('console');
// import console = require('console');

export const createUser = (data, position, callback) => {
  firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(() => {
    const user = firebase.auth().currentUser;
    // console.log(user)
    firebase.database().ref('users/').child(user.uid).set(
      {
        id: user.uid,
        name: data.name,
        status: '-',
        imageUrl: 'https://res.cloudinary.com/dvyonb6zt/image/upload/v1563542754/Product/ggirl_omijq3.png',
        gender: 'female',
        latitude: position.latitude,
        longitude: position.longitude
      }
    )
      .then(() => {
            callback(true, user.uid, data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  })
    .catch((error) => {
      console.log(error);
    });
};

export const loginUser = (data, callback) => {
  firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then(() => {
      const user = firebase.auth().currentUser;

      console.log('error ya');
      callback(true, user.uid);
      // this.props.navigation.navigate('Home')
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logOutUser = (callback) => {
  // const user = firebase.auth().currentUser;
      // console.log("hai")
  // console.log(user.uid)
  firebase.auth().signOut()
    .then(() => {
      // const user = firebase.auth().currentUser;

      // console.log('error ya');
      callback(true);
      // this.props.navigation.navigate('Home')
    })
    .catch((error) => {
      console.log(error);
    });
};



export const dataUser = (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log("user")
      firebase.database().ref('users').child(user.uid).once('value', (snapshot) => {
        // console.log("user")
        const userLogin = {
          data: snapshot.val()
        };
        // console.log(userLogin.data);
        callback(userLogin);
        // snapshot.forEach((childSnapshot) => {
        //   // var item_id = childSnapshot.name();
        //   let location = childSnapshot.val();
        //   console.log("Mermaid")
        //   console.log(location)
        // })
      });
    } else {
      // No user is signed in.
    }
  });

  //
};

export const allUser = () => {
  firebase.database().ref('users').once('value', (snapshot) => {
    // console.log(snapshot.val())
    const data = snapshot.val();
    const allUser = {
      data
    };
    console.log(allUser);
    // callback
    // snapshot.forEach((childSnapshot) => {
    //   let item_id = childSnapshot.val();

    //   firebase.database().ref('location').child(item_id.id).once('value', (snapshot) => {
    //     let data = snapshot.val()
    //     let allUser = {

    //     }
    //   })
    // })
  });
};
