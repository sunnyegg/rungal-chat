import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
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
import Avatar from '../../../Assets/Img/icon.png';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './Styles';

import firebase from 'firebase';

const FriendList = ({navigation}) => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [ListUsers, setListUsers] = useState([]);

  const getCurrentUser = () => {
    const name = firebase.auth().currentUser.displayName;
    const email = firebase.auth().currentUser.email;
    setName(name);
    setEmail(email);
  };

  const listUsers = () => {
    firebase
      .database()
      .ref('Users/')
      .on('value', snapshot => {
        const set = snapshot.val();
        setListUsers(set);
      });
  };

  useEffect(() => {
    listUsers();
    getCurrentUser();
  }, []);

  return (
    <>
      <View style={styles.Header}>
        <View style={styles.HeaderTitle}>
          <View style={{flex: 1}}>
            <Body style={styles.LeftTitle}>
              <Title>Friends</Title>
            </Body>
          </View>
          <View style={{flex: 1}}>
            <Body style={styles.RightTitle}>
              <Icon
                name="md-search"
                style={{color: 'white'}}
                onPress={() => alert('Apa lo')}
              />
            </Body>
          </View>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#2c2f33', paddingTop: 10}}>
        <List style={{marginLeft: -10}}>
          {Object.keys(ListUsers)
            .filter(a => ListUsers[a].name !== Name)
            .map((key, index) => {
              return (
                <ListItem
                  avatar
                  onPress={() =>
                    navigation.navigate('FriendProfile', {
                      name: ListUsers[key].name,
                    })
                  }>
                  <Body
                    style={{
                      borderBottomColor: '#4f555c',
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 1}}>
                      <Thumbnail source={Avatar} />
                    </View>
                    <View style={{flex: 4}}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        {ListUsers[key].name}
                      </Text>
                      <Text note>Online</Text>
                    </View>
                  </Body>
                </ListItem>
              );
            })}
          {/* <ListItem avatar onPress={() => navigation.navigate('FriendProfile')}>
            <Body
              style={{
                borderBottomColor: '#4f555c',
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <Thumbnail source={Avatar} />
              </View>
              <View style={{flex: 4}}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Aqua
                </Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </View>
            </Body>
          </ListItem> */}
        </List>
      </ScrollView>
    </>
  );
};

export default FriendList;
