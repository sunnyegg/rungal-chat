import React from 'react';
import {View, ScrollView} from 'react-native';
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

const Account = ({navigation}) => {
  return (
    <>
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
                onPress={() => navigation.replace('Login')}
              />
            </Body>
          </View>
        </View>
      </View>

      <ScrollView>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{uri: 'Image URL'}} />
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

export default Account;
