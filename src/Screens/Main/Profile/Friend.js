import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {Container, Body, Text, Icon, Title} from 'native-base';
import styles from './Styles';
import Avatar from '../../../Assets/Img/icon.png';
import {ScrollView} from 'react-native-gesture-handler';

const ProfileFriend = ({navigation}) => {
  const [Name, setName] = useState('');

  const getCurrentUser = () => {
    setName(navigation.getParam('name'));
  };

  useEffect(() => {
    getCurrentUser();
  }, [Name]);

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
                {Name}
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
