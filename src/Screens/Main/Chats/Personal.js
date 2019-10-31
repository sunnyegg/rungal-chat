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
import Avatar from '../../../Assets/Img/icon.png';
import {ScrollView} from 'react-native-gesture-handler';

import moment from 'moment';
import firebase from 'firebase';

const PersonalList = ({navigation}) => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [ListUsers, setListUsers] = useState([]);
  const [LastMessage, setLastMessage] = useState([]);
  const [LastTime, setLastTime] = useState([]);
  const [LastDate, setLastDate] = useState([]);
  const [Display, setDisplay] = useState([]);

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
    getLastMessage();
  }, [LastMessage, LastTime, LastDate]);

  const getLastMessage = () => {
    Object.keys(ListUsers)
      .filter(a => ListUsers[a].name !== Name)
      .map(key => {
        setDisplay(ListUsers[key].name);
      });
    firebase
      .database()
      .ref(
        'Messages/' + firebase.auth().currentUser.displayName + '/' + Display,
      )
      .limitToLast(1)
      .on('value', snapshot => {
        snapshot.forEach(child => {
          const time = new Date(child.val().createdAt);
          const setData = setLastMessage(child.val().text);
          setLastTime(moment(time).format('LT'));
          setLastDate(moment(time).format('ll'));
        });
      });
  };

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
                      // userID: key,
                      userName: ListUsers[key].name,
                      userEmail: ListUsers[key].email,
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
                    <View style={{flex: 3}}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        {ListUsers[key].name}
                      </Text>
                      <Text note numberOfLines={2}>
                        {LastMessage}
                      </Text>
                    </View>
                    <View style={{flex: 1, paddingTop: 5}}>
                      <Text note style={{fontSize: 8}}>
                        {LastDate}
                      </Text>
                      <Text note style={{fontSize: 10}}>
                        {LastTime}
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
