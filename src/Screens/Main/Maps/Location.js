import React, {useState, useEffect} from 'react';
import {View, StatusBar, Dimensions} from 'react-native';
import {Container, Body, Icon, Title} from 'native-base';
import styles from './Styles';

import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import firebase from 'firebase';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Location = ({navigation}) => {
  const [DataUsers, setDataUsers] = useState([]);
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const uid = firebase.auth().currentUser.uid;

  useEffect(() => {
    getAllUsers();
    getCurrentLocation();
  }, [Latitude, Longitude]);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        firebase
          .database()
          .ref(`Users/${uid}`)
          .update({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
      },
      error => console.log(error),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000},
    );
  };

  const getAllUsers = () => {
    firebase
      .database()
      .ref('Users')
      .on('value', snapshot => {
        let data = [];
        snapshot.forEach(child => {
          data = [
            {
              name: child.val().name,
              latitude: child.val().latitude,
              longitude: child.val().longitude,
            },
            ...data,
          ];
        });
        setDataUsers(data);
      });
  };

  return (
    <Container style={{backgroundColor: '#2c2f33'}}>
      <StatusBar backgroundColor="#23272a" />
      <View style={styles.Header}>
        <View style={styles.HeaderTitle}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Body style={{flex: 1}}>
              <Icon
                name="md-arrow-back"
                style={{color: 'white'}}
                onPress={() => navigation.goBack()}
              />
            </Body>
            <Body
              style={{
                flex: 8,
                alignItems: 'flex-start',
                paddingLeft: 20,
              }}>
              <Title>Location</Title>
            </Body>
          </View>
        </View>
      </View>
      <MapView
        style={{flex: 1, width: Width, height: Height}}
        region={{
          latitude: Latitude,
          longitude: Longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}>
        {DataUsers.map(item => {
          return (
            <MapView.Marker
              style={{flex: 1, width: Width, height: Height}}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.name}
              description="I am here"
            />
          );
        })}
      </MapView>
    </Container>
  );
};

export default Location;
