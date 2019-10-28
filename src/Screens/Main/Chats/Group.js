import React from 'react';
import {View, Dimensions} from 'react-native';
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

import Avatar from '../../../Assets/Img/aqua.jpg';
import {ScrollView} from 'react-native-gesture-handler';

const Width = Dimensions.get('window').width;
const GroupList = ({navigation}) => {
  return (
    <>
      <Header androidStatusBarColor={'#23272a'} style={styles.Header}>
        <View style={styles.HeaderTitle}>
          <View style={{flex: 1}}>
            <Body style={styles.LeftTitle}>
              <Title>Group Chat</Title>
            </Body>
          </View>
          <View style={{flex: 1}}>
            <Body style={styles.RightTitle}>
              <Title>Search</Title>
            </Body>
          </View>
        </View>
      </Header>
      <ScrollView style={{backgroundColor: '#4f555c'}}>
        <List>
          <ListItem avatar onPress={() => console.log('Press')}>
            <Left>
              <Thumbnail source={Avatar} />
            </Left>
            <Body>
              <Text>Group</Text>
              <Text note>
                Doing what you like will always keep you happy . .
              </Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
            </Right>
          </ListItem>
        </List>
      </ScrollView>
    </>
  );
};

export default GroupList;
