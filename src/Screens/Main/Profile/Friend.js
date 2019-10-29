import React from 'react';
import {View, Image} from 'react-native';
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
  Item,
  Input,
} from 'native-base';
import styles from './Styles';
import Avatar from '../../../Assets/Img/aqua.jpg';
import {ScrollView} from 'react-native-gesture-handler';
import {GiftedChat} from 'react-native-gifted-chat';

const ProfileFriend = ({navigation}) => {
  return (
    <Container style={{backgroundColor: '#2c2f33'}}>
      <View style={styles.Header}>
        <View style={styles.HeaderTitle}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Body style={{flex: 1}}>
              <Icon
                name="md-arrow-back"
                style={{color: 'white'}}
                onPress={() => navigation.goBack()}
              />
            </Body>
            <Body
              style={{
                flex: 8,
                alignItems: 'flex-start',
                paddingLeft: 20,
              }}>
              <Title>Profile</Title>
            </Body>
          </View>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#2c2f33', paddingTop: 20}}>
        <View style={styles.Profile}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                source={Avatar}
                style={{height: 100, width: 100, borderRadius: 100}}
              />
            </View>
            <View style={{paddingLeft: 25, paddingTop: 20}}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
                Nama
              </Text>
              <Text style={{color: 'gray', fontSize: 16}}>Online</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View></View>
            <View></View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ProfileFriend;
