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
} from 'native-base';
import styles from './Styles';

const FriendList = ({navigation}) => {
  return (
    <>
      <View style={styles.Header}>
        <View style={styles.HeaderTitle}>
          <View style={{flex: 1}}>
            <Body style={styles.LeftTitle}>
              <Title>Friend List</Title>
            </Body>
          </View>
          <View style={{flex: 1}}>
            <Body style={styles.RightTitle}>
              <Title>Search</Title>
            </Body>
          </View>
        </View>
      </View>

      <Container>
        <Content>
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
        </Content>
      </Container>
    </>
  );
};

export default FriendList;
