import React, {useState, useEffect} from 'react';
import {View, StatusBar, AsyncStorage} from 'react-native';
import {
  Container,
  List,
  ListItem,
  Body,
  Thumbnail,
  Text,
  Icon,
  Title,
  Badge,
} from 'native-base';
import styles from './Styles';
import Img from '../../../Assets/Img/icon.png';
import {ScrollView} from 'react-native-gesture-handler';

import moment from 'moment';
import firebase from 'firebase';

const PersonalList = ({navigation}) => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [ListUsers, setListUsers] = useState([]);
  const [ListUsers2, setListUsers2] = useState([{}]);
  const [LastMessage, setLastMessage] = useState([]);
  const [LastTime, setLastTime] = useState([]);
  const [LastDate, setLastDate] = useState([]);

  const getCurrentUser = () => {
    const name = firebase.auth().currentUser.displayName;
    const email = firebase.auth().currentUser.email;
    setName(name);
    setEmail(email);
  };

  const listUsers = () => {
    firebase
      .database()
      .ref('Users')
      .on('value', snapshot => {
        const set = snapshot.val();
        setListUsers(set);
      });
  };

  useEffect(() => {
    getCurrentUser();
    listUsers();
  }, []);

  return (
    <Container style={{backgroundColor: '#2c2f33'}}>
      <StatusBar backgroundColor="#23272a" />
      <View style={styles.Header}>
        <View style={styles.HeaderTitle}>
          <View style={{flex: 1}}>
            <Body style={styles.LeftTitle}>
              <Title>Chats</Title>
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
                    navigation.navigate('PersonalConversation', {
                      userID: key,
                      userName: ListUsers[key].name,
                      userEmail: ListUsers[key].email,
                      avatar: ListUsers[key].avatar,
                    })
                  }>
                  <Body
                    style={{
                      borderBottomColor: '#4f555c',
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 1}}>
                      {ListUsers[key].avatar === '' ? (
                        <Thumbnail source={Img} />
                      ) : (
                        <Thumbnail source={{uri: ListUsers[key].avatar}} />
                      )}
                    </View>
                    <View style={{flex: 4}}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        {ListUsers[key].name}
                      </Text>
                      <Text note numberOfLines={2}>
                        {ListUsers[key].email}
                      </Text>
                    </View>
                  </Body>
                </ListItem>
              );
            })}
        </List>
      </ScrollView>
    </Container>
  );
};

export default PersonalList;
