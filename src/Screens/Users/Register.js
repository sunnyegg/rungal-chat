import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  ToastAndroid,
  ImageBackground,
  Dimensions,
} from 'react-native';

import {Item, Input, Header, Button, Text, View} from 'native-base';

import Bg from '../../Assets/Img/bg.jpg';
import {ScrollView} from 'react-native-gesture-handler';
import firebaseSDK from '../../Configs/firebaseSDK';
import firebase from 'firebase';
import Geolocation from '@react-native-community/geolocation';

const Height = Dimensions.get('window').height;
const Register = ({navigation}) => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const register = async () => {
    const user = {Email, Password, Name};
    const response = await firebaseSDK.register(
      user,
      registerSuccess,
      registerFailed,
    );
  };

  const registerSuccess = () => {
    const user = {Email, Name};
    const userf = firebase.auth().currentUser;
    userf.updateProfile({displayName: user.Name});

    const db = firebase.database();
    db.ref(`Users/${userf.uid}`)
      .set({
        name: user.Name,
        email: user.Email,
        latitude: navigation.getParam('latitude'),
        longitude: navigation.getParam('longitude'),
        avatar: '',
      })
      .then(result => {
        console.log(result);
        ToastAndroid.show('Register Success!', ToastAndroid.LONG);
        navigation.replace('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const registerFailed = error => {
    console.log(error);
    ToastAndroid.show('Register Failed!', ToastAndroid.LONG);
  };

  return (
    <View>
      <Header androidStatusBarColor={'#23272a'} style={styles.HeaderStyle} />
      <ScrollView>
        <ImageBackground
          source={Bg}
          style={{width: '100%', height: Height - 25}}>
          <View>
            <View style={{height: Height / 4}}>
              <Text
                style={{
                  flex: 1,
                  color: 'white',
                  fontSize: 28,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                RUNGAL CHAT
              </Text>
            </View>
            <View style={styles.Body}>
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 65,
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Create an account
              </Text>
              <View
                style={{
                  height: Height / 2.4,
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <Item style={styles.InputStyle} last>
                  <Input
                    style={{color: 'white'}}
                    placeholder="Name"
                    placeholderTextColor="white"
                    onChangeText={text => setName(text)}
                    value={Name}
                  />
                </Item>
                <Item style={styles.InputStyle} last>
                  <Input
                    style={{color: 'white'}}
                    placeholder="Email"
                    placeholderTextColor="white"
                    keyboardType="email-address"
                    onChangeText={text => setEmail(text)}
                    value={Email}
                  />
                </Item>
                <Item style={styles.InputStyle} last>
                  <Input
                    style={{color: 'white'}}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={Password}
                  />
                </Item>
              </View>
              <Button style={styles.ButtonLogin} onPress={() => register()}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Register</Text>
              </Button>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderStyle: {
    display: 'none',
  },
  Body: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    backgroundColor: '#4f555c',
    height: Height,
  },
  InputStyle: {
    paddingLeft: 10,
    marginBottom: 10,
    height: 45,
    backgroundColor: '#4f555c',
  },
  ButtonLogin: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#7289da',
    height: 50,
    elevation: 0,
  },
});

export default Register;
