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
    // this.observeAuth();
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

  // observeAuth = () =>
  //   firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  // onAuthStateChanged = user => {
  //   if (!user) {
  //     try {
  //       firebase.auth().signInAnonymously();
  //     } catch ({message}) {
  //       alert(message);
  //     }
  //   }
  // };

  uid = () => {
    return (firebase.auth().currentUser || {}).uid;
  };
}

const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
