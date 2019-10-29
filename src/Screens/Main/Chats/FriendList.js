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
import Avatar from '../../../Assets/Img/aqua.jpg';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './Styles';

const FriendList = ({navigation}) => {
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
          <ListItem avatar onPress={() => navigation.navigate('FriendProfile')}>
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
          </ListItem>
        </List>
      </ScrollView>
    </>
  );
};

export default FriendList;
