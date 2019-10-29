import firebase from 'firebase';

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: 'AIzaSyBIN-fVr4Ubr-8aIk2KeIZEBbRL19NYlgI',
        authDomain: 'rungalchat.firebaseapp.com',
        databaseURL: 'rungalchat.firebaseio.com',
        projectId: 'rungalchat',
        storageBucket: 'rungalchat.appspot.com',
        messagingSenderId: '570905813021',
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.Email, user.Password)
      .then(success_callback, failed_callback);
  };
  signup = async user => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.Email, user.Password)
      .then(
        function() {
          console.log(
            'created user successfully. User email:' +
              user.Email +
              ' name:' +
              user.Name,
          );
          const userf = firebase.auth().currentUser;
          userf.updateProfile({displayName: user.Name}).then(
            function() {
              console.log(
                'Updated displayName successfully. name:' + user.Name,
              );
              alert(
                'User ' +
                  user.Name +
                  ' was created successfully. Please login.',
              );
            },
            function(error) {
              console.warn('Error update displayName.');
            },
          );
        },
        function(error) {
          console.error(
            'got error:' + typeof error + ' string:' + error.message,
          );
          alert('Create account failed. Error: ' + error.message);
        },
      );
  };
}

const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
