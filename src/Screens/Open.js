import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  ToastAndroid,
} from 'react-native';

import {Header, Button, Text, View, Content} from 'native-base';

import Bg from '../Assets/Img/bg.jpg';
import {ScrollView} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';

const Height = Dimensions.get('window').height;
const Open = ({navigation}) => {
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);

  useEffect(() => {
    getLocation();
  }, [Latitude, Longitude]);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      () =>
        ToastAndroid.show('Could not get your location.', ToastAndroid.LONG),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
    );
  };

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
                onPress={() =>
                  navigation.navigate('Register', {
                    latitude: Latitude,
                    longitude: Longitude,
                  })
                }>
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
