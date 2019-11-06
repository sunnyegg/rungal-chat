import React, {useState, useEffect} from 'react';
import {View, StatusBar, Dimensions, ToastAndroid} from 'react-native';
import {Container, Body, Icon, Title, Text, Picker} from 'native-base';
import styles from './Styles';

import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import firebase from 'firebase';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Location = ({navigation}) => {
  const [DataUsers, setDataUsers] = useState([]);
  const [Latitude, setLatitude] = useState(-7.4449348);
  const [Longitude, setLongitude] = useState(112.6956226);
  const [Selected, setSelected] = useState();
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
      () =>
        ToastAndroid.show('Could not get your location.', ToastAndroid.LONG),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
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
      <View>
        <View
          style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}}>
          <MapView
            style={{width: Width, height: Height}}
            region={{
              latitude: Latitude,
              longitude: Longitude,
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}>
            {DataUsers.map(item => {
              return item.latitude && item.longitude !== null ? (
                <MapView.Marker
                  style={{flex: 1, width: Width, height: Height}}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  title={item.name}
                  description="I am here"
                />
              ) : (
                <MapView.Marker
                  style={{flex: 1, width: Width, height: Height}}
                  coordinate={{
                    latitude: -7.4449348,
                    longitude: 112.6956226,
                  }}
                  title={item.name}
                  description="I am here"
                />
              );
            })}
          </MapView>
          {/* {DataUsers.map(item => {
          console.log(item);
          return (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
              }}>
              <MapView
                style={{width: Width, height: Height}}
                region={{
                  latitude: Latitude,
                  longitude: Longitude,
                  latitudeDelta: 1,
                  longitudeDelta: 1,
                }}>
                {item.latitude && item.longitude !== 'undefined' ? (
                  <MapView.Marker
                    style={{flex: 1, width: Width, height: Height}}
                    coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude,
                    }}
                    title={item.name}
                    description="I am here"
                  />
                ) : (
                  <MapView.Marker
                    style={{flex: 1, width: Width, height: Height}}
                    coordinate={{
                      latitude: Latitude,
                      longitude: Longitude,
                    }}
                    title={item.name}
                    description="I am here"
                  />
                )}
              </MapView>
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                  bottom: 0,
                  right: 10,
                  left: 10,
                  height: 100,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    opacity: 0.9,
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: 'gray',
                    paddingHorizontal: 15,
                  }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text>Find: </Text>
                  </View>
                  <View style={{flex: 6}}>
                    <Picker note mode="dropdown" style={{width: '100%'}}>
                      <Picker.Item label={item.name} />
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
          );
        })} */}
        </View>
      </View>
    </Container>
  );
};

export default Location;
