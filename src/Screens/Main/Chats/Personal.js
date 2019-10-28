import React from 'react';
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
  Badge,
} from 'native-base';
import styles from './Styles';
import Avatar from '../../../Assets/Img/aqua.jpg';
import {ScrollView} from 'react-native-gesture-handler';
import {GiftedChat} from 'react-native-gifted-chat';

const PersonalList = ({navigation}) => {
  return (
    <>
      <View style={styles.Header}>
        <View style={styles.HeaderTitle}>
          <View style={{flex: 1}}>
            <Body style={styles.LeftTitle}>
              <Title>Chats</Title>
            </Body>
          </View>
          <View style={{flex: 1}}>
            <Body style={styles.RightTitle}>
              <Title>Search</Title>
            </Body>
          </View>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#2c2f33', paddingTop: 10}}>
        <List>
          <ListItem
            avatar
            onPress={() => navigation.navigate('PersonalConversation')}>
            <Left>
              <Thumbnail source={Avatar} />
            </Left>
            <Body>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Aqua</Text>
              <Text note>
                Doing what you like will always keep you happy . .
              </Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
              <Badge
                style={{
                  marginTop: 10,
                  marginRight: 5,
                  backgroundColor: '#7289da',
                }}>
                <Text>2</Text>
              </Badge>
            </Right>
          </ListItem>
        </List>
      </ScrollView>
    </>
  );
};

export default PersonalList;
