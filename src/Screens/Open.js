import React, {useEffect} from 'react';

import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';

import {Header, Button, Text, View, Content} from 'native-base';

import Bg from '../Assets/Img/bg.jpg';
import {ScrollView} from 'react-native-gesture-handler';

const Height = Dimensions.get('window').height;
const Open = ({navigation}) => {
  // const checkAuth = async () => {
  //   const auth = await AsyncStorage.getItem('auth-user');
  //   const check = auth === 'true' ? successAuth() : failedAuth();
  // };

  // const successAuth = () => {
  //   ToastAndroid.show('You are already logged in!', ToastAndroid.SHORT);
  //   navigation.replace('Home');
  // };

  // const failedAuth = () => {
  //   ToastAndroid.show('Please Login First!', ToastAndroid.SHORT);
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  return (
    <View>
      <Header androidStatusBarColor={'#23272a'} style={styles.HeaderStyle} />
      <ScrollView>
        <ImageBackground
          source={Bg}
          style={{width: '100%', height: Height - 25}}>
          <View>
            <View style={{height: Height / 2}}>
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
                Welcome to Rungal Chat
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 40,
                  color: '#99aab5',
                  fontSize: 14,
                }}>
                Login or Register to get started
              </Text>
              <Button
                style={styles.ButtonLogin}
                onPress={() => navigation.navigate('Login')}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>LOGIN</Text>
              </Button>
              <Button
                style={styles.ButtonRegister}
                onPress={() => navigation.navigate('Register')}>
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
    height: Height / 2,
  },
  ButtonLogin: {
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 25,
    backgroundColor: '#4f555c',
    height: 70,
    elevation: 0,
  },
  ButtonRegister: {
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 25,
    backgroundColor: '#4f555c',
    height: 70,
    borderTopWidth: 0.3,
    borderTopColor: '#99aab5',
    elevation: 0,
  },
});

export default Open;
