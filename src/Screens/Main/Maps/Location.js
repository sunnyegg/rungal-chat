import React, {useState, useEffect} from 'react';
import {View, Image, StatusBar, Dimensions} from 'react-native';
import {Container, Body, Text, Icon, Title} from 'native-base';
import styles from './Styles';

import MapView from 'react-native-maps';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Location = ({navigation}) => {
  const [Name, setName] = useState('');

  // const [Latitude, setLatitude] = useState(LATITUDE);
  // const [Longitude, setLongitude] = useState(LONGITUDE);
  // const [RouteCoordinates, setRouteCoordinates] = useState([]);
  // const [DistanceTravelled, setDistanceTravelled] = useState(0);
  // const [PrevLatLng, setPrevLatLng] = useState({});
  // const [Coordinate, setCoordinate] = useState(
  //   new AnimatedRegion({
  //     latitude: LATITUDE,
  //     longitude: LONGITUDE,
  //   }),
  // );

  // useEffect(() => {
  // }, []);

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
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <MapView.Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Lokasi"
          description="Hello"
        />
      </MapView>
    </Container>
  );
};

export default Location;
