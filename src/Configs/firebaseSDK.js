import firebase from 'firebase';

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyBIN-fVr4Ubr-8aIk2KeIZEBbRL19NYlgI',
        authDomain: 'rungalchat.firebaseapp.com',
        databaseURL: 'rungalchat.firebaseio.com',
        projectId: 'rungalchat',
        storageBucket: 'rungalchat.appspot.com',
        messagingSenderId: '570905813021',
      });
    }
    this.observeAuth();
  }
  login = async (user, success, failed) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.Email, user.Password)
      .then(success, failed);
  };
  register = async (user, success_auth, failed_auth) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.Email, user.Password)
      .then(success_auth, failed_auth);
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({message}) {
        alert(message);
      }
    }
  };

  // ref = () => {
  //   return firebase.database().ref('Messages');
  // };

  uid = () => {
    return (firebase.auth().currentUser || {}).uid;
  };

  parse = snapshot => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: id} = snapshot;
    const {key: _id} = snapshot;
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    // console.log(message);
    return message;
  };

  refOn = cb => {
    firebase
      .database()
      .ref('Messages')
      .limitToLast(20)
      .on('child_added', snapshot => cb(this.parse(snapshot)));
  };

  // refOn() {
  //   firebase
  //     .database()
  //     .ref('Messages')
  //     .limitToLast(20)
  //     .on('value', snapshot => this.parse(snapshot));
  // }

  timestamp = () => {
    firebase.database.ServerValue.TIMESTAMP;
  };

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const timestamp = firebase.database.ServerValue.TIMESTAMP;
      const {text, user} = messages[i];
      const message = {
        text,
        user,
        createdAt: timestamp,
      };
      firebase
        .database()
        .ref('Messages')
        .push(message);
    }
  };
}

const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
