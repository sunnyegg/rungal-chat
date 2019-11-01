import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Alert,
  ToastAndroid,
  Image,
  AsyncStorage,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  Icon,
  Title,
} from 'native-base';
import styles from './Styles';

import ImagePicker from 'react-native-image-picker';

import Img from '../../../Assets/Img/icon.png';
import {firebase} from '@react-native-firebase/storage';
import firebaseAuth from 'firebase';

const Account = ({navigation}) => {
  const [Name, setName] = useState(firebaseAuth.auth().currentUser.displayName);
  const [ImageName, setImageName] = useState('');
  const [Avatar, setAvatar] = useState('');
  const uid = firebaseAuth.auth().currentUser.uid;

  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    const result = firebaseAuth
      .database()
      .ref(`Users/${uid}`)
      .on('value', snapshot => {
        setAvatar(snapshot.val().avatar);
      });
  };

  const UploadImage = () => {
    const options = {
      noData: true,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        const Image = response;
        setImageName(Image.fileName);

        Alert.alert(
          'Edit Image',
          `Is this image: ${Image.fileName}, you want to upload?`,
          [
            {text: 'No', style: 'cancel'},
            {text: 'Yes', onPress: () => upload()},
          ],
          {cancelable: false},
        );

        const upload = () => {
          const imageRef = firebase
            .storage()
            .ref()
            .child(`images/${uid}/${Image.fileName}`)
            .putFile(Image.path);
          imageRef.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
              let progess =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              ToastAndroid.show(
                `Upload is ${progess}% done`,
                ToastAndroid.SHORT,
              );

              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                  ToastAndroid.show('Upload is paused', ToastAndroid.SHORT);
                  break;
                case firebase.storage.TaskState.RUNNING:
                  ToastAndroid.show('Upload is running...', ToastAndroid.SHORT);
                  break;
              }
            },
            error => {
              switch (error.code) {
                case 'storage/unauthorized':
                  ToastAndroid.show('Unauthorized', ToastAndroid.SHORT);
                  break;
                case 'storage/canceled':
                  ToastAndroid.show('Canceled by User', ToastAndroid.SHORT);
                  break;
                case 'storage/unknown':
                  ToastAndroid.show('Error Unknown', ToastAndroid.SHORT);
                  break;
              }
            },
            () => {
              ToastAndroid.show('Upload Successfully!', ToastAndroid.LONG);
              firebase
                .storage()
                .refFromURL(
                  `gs://rungalchat.appspot.com/images/${uid}/${Image.fileName}`,
                )
                .getDownloadURL()
                .then(url => {
                  firebaseAuth
                    .database()
                    .ref(`Users/${uid}`)
                    .update({avatar: url});
                });
            },
          );
        };
      }
    });
  };

  const logOut = () => {
    Alert.alert(
      'Log Out',
      'Are you sure want to log out?',
      [{text: 'No', style: 'cancel'}, {text: 'Yes', onPress: () => result()}],
      {cancelable: false},
    );
    const result = async () => {
      await firebaseAuth
        .auth()
        .signOut()
        .then(
          () => {
            navigation.replace('Login');
          },
          error => {
            console.log(error);
            ToastAndroid.show('There is something error', ToastAndroid.LONG);
          },
        );
    };
  };
  return (
    <Container style={{backgroundColor: '#2c2f33'}}>
      <View style={styles.Header}>
        <View style={styles.HeaderTitle}>
          <View style={{flex: 1}}>
            <Body style={styles.LeftTitle}>
              <Title>Account</Title>
            </Body>
          </View>
          <View style={{flex: 1}}>
            <Body style={styles.RightTitle}>
              <Icon
                name="md-exit"
                style={{color: 'white'}}
                onPress={() => logOut()}
              />
            </Body>
          </View>
        </View>
      </View>

      <ScrollView style={{backgroundColor: '#2c2f33', paddingTop: 20}}>
        <View style={styles.ProfileAccount}>
          <View>
            {Avatar === '' ? (
              <Thumbnail style={styles.ProfileImage} source={Img} />
            ) : (
              <Thumbnail
                style={styles.ProfileImage}
                source={{
                  uri: Avatar,
                }}
              />
            )}
            <Text
              style={{
                color: 'white',
                padding: 10,
                alignSelf: 'center',
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {Name}
            </Text>
          </View>
        </View>
        <View style={{paddingTop: 30, paddingHorizontal: 20}}>
          <Content>
            <View style={{paddingVertical: 5}}>
              <Button
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#2c2f33',
                  paddingVertical: 10,
                  elevation: 0,
                  height: 60,
                  borderWidth: 0.5,
                  borderColor: 'gray',
                }}
                onPress={() => UploadImage()}>
                <Text>Edit Profile Picture</Text>
              </Button>
            </View>
          </Content>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Account;
