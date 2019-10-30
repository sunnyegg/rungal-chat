import React, {useState, useEffect} from 'react';
import {View, StatusBar} from 'react-native';
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

const PersonalList = ({navigation}) => {
  const [User, setUser] = useState('');

  const getUser = () => {
    setUser(navigation.getParam('user'));
  };

  useEffect(() => {
    getUser();
    console.log(User);
  });
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
          <ListItem
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
          </ListItem>
        </List>
      </ScrollView>
    </Container>
  );
};

export default PersonalList;
