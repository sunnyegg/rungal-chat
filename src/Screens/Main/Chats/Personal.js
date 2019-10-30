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
import Avatar from '../../../Assets/Img/aqua.jpg';
import {ScrollView} from 'react-native-gesture-handler';

import firebase from 'firebase';

const PersonalList = ({navigation}) => {
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
    getCurrentUser();
    listUsers();
  }, []);

  let tampungData = [];
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
                      <Text note>
                        Doing what you like will always keep you happy . .
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text note>3:43 pm</Text>
                      <Badge
                        style={{
                          marginTop: 10,
                          marginRight: 5,
                          backgroundColor: '#7289da',
                        }}>
                        <Text>2</Text>
                      </Badge>
                    </View>
                  </Body>
                </ListItem>
              );
            })}

          {/* <ListItem
            avatar
            onPress={() => navigation.navigate('PersonalConversation')}>
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
                <Text style={{color: 'white', fontWeight: 'bold'}}>Aqua</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text note>3:43 pm</Text>
                <Badge
                  style={{
                    marginTop: 10,
                    marginRight: 5,
                    backgroundColor: '#7289da',
                  }}>
                  <Text>2</Text>
                </Badge>
              </View>
            </Body>
          </ListItem> */}
        </List>
      </ScrollView>
    </Container>
  );
};

export default PersonalList;
