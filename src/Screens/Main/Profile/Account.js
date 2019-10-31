import React, {useState} from 'react';
import {View, ScrollView, Alert, ToastAndroid, Image} from 'react-native';
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

import Avatar from '../../../Assets/Img/icon.png';
import firebase from 'firebase';

const Account = ({navigation}) => {
  const [Name, setName] = useState(firebase.auth().currentUser.displayName);
  const logOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(
        () => {
          Alert.alert(
            'Log Out',
            'Are you sure want to log out?',
            [
              {text: 'No', style: 'cancel'},
              {text: 'Yes', onPress: () => navigation.replace('Login')},
            ],
            {cancelable: false},
          );
        },
        error => {
          console.log(error);
          ToastAndroid.show('There is something error', ToastAndroid.LONG);
        },
      );
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
            <Image source={Avatar} style={styles.ProfileImage} />
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
                  backgroundColor: '#2c2f33',
                  paddingVertical: 10,
                  elevation: 0,
                  height: 60,
                }}>
                <Text>Edit Display Name</Text>
              </Button>
            </View>
            <View style={{paddingVertical: 5}}>
              <Button
                style={{
                  backgroundColor: '#2c2f33',
                  paddingVertical: 10,
                  elevation: 0,
                  height: 60,
                }}>
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
