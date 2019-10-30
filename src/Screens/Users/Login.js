import React, {useState, useEffect} from 'react';
import firebaseSDK from '../../Configs/firebaseSDK';

import {
  StyleSheet,
  Image,
  AsyncStorage,
  ToastAndroid,
  ImageBackground,
  Dimensions,
  Label,
  Form,
} from 'react-native';

import {Item, Input, Header, Button, Text, View, Spinner} from 'native-base';

import Bg from '../../Assets/Img/bg.jpg';
import {ScrollView} from 'react-native-gesture-handler';

import firebase from 'firebase';

const Height = Dimensions.get('window').height;
const Login = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const submitLogin = async () => {
    const user = {Email, Password};
    const response = await firebaseSDK.login(user, loginSuccess, loginFailed);
  };

  const loginSuccess = async () => {
    // await AsyncStorage.setItem('auth-user', 'true');
    ToastAndroid.show('Login Success!', ToastAndroid.SHORT);
    navigation.replace('Home');
  };

  const loginFailed = () => {
    ToastAndroid.show('Login Failed!', ToastAndroid.LONG);
  };

  return (
    <View>
      <Header androidStatusBarColor={'#23272a'} style={styles.HeaderStyle} />
      <ScrollView>
        <ImageBackground
          source={Bg}
          style={{width: '100%', height: Height - 25}}>
          <View>
            <View style={{height: Height / 3}}>
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
                  marginBottom: 5,
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Welcome Back!
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 40,
                  color: '#99aab5',
                  fontSize: 14,
                }}>
                Login with your email to start chatting
              </Text>
              <View
                style={{
                  height: Height / 3,
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <Item style={styles.InputStyle} last>
                  <Input
                    style={{color: 'white'}}
                    placeholder="Email"
                    placeholderTextColor="white"
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
              <Button style={styles.ButtonLogin} onPress={() => submitLogin()}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>LOGIN</Text>
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

export default Login;
