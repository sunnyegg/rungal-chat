import React, {useState, useEffect} from 'react';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {View, Dimensions} from 'react-native';
import {Container, Body, Title, Icon, Button} from 'native-base';
import styles from './Styles';

import firebaseSDK from '../../../../Configs/firebaseSDK';
import firebase from 'firebase';

const Width = Dimensions.get('window').width;

const PersonalConversation = ({navigation}) => {
  const [MessagesChat, setMessages] = useState([]);
  const [Name, setName] = useState('');
  const [Avatar, setAvatar] = useState('');
  const [DisplayName, setDisplayName] = useState('');
  const currentUser = firebaseSDK.uid();

  useEffect(() => {
    setName(firebase.auth().currentUser.displayName);
    setDisplayName(navigation.getParam('userName'));
    setAvatar(navigation.getParam('avatar'));
    getAllMessages();
  }, []);

  const userData = {
    name: Name,
    avatar: Avatar,
    id: currentUser,
    _id: currentUser,
  };

  const getAllMessages = () => {
    firebase
      .database()
      .ref(
        `Messages/${firebase.auth().currentUser.uid}/${navigation.getParam(
          'userID',
        )}`,
      )
      .on('value', snapshot => {
        let data = [];
        snapshot.forEach(child => {
          data = [
            {
              _id: child.key,
              text: child.val().text,
              createdAt: child.val().createdAt,
              user: {
                _id: child.val().user._id,
                name: child.val().user.name,
              },
            },
            ...data,
          ];
        });
        setMessages(data);
      });
  };

  const send = async messages => {
    for (let i = 0; i < messages.length; i++) {
      const timestamp = firebase.database.ServerValue.TIMESTAMP;
      const {text, user, _id} = messages[i];
      const message = {
        _id,
        text,
        user,
        createdAt: timestamp,
      };
      firebase
        .database()
        .ref(`Messages/${currentUser}/${navigation.getParam('userID')}`)
        .push(message);

      firebase
        .database()
        .ref(`Messages/${navigation.getParam('userID')}/${currentUser}`)
        .push(message);
    }
  };

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
              <Button
                onPress={() =>
                  navigation.navigate('FriendProfile', {
                    name: DisplayName,
                    avatar: Avatar,
                  })
                }
                style={{
                  width: '100%',
                  backgroundColor: '#23272a',
                  elevation: 0,
                }}>
                <Title>{DisplayName}</Title>
              </Button>
            </Body>
          </View>
        </View>
      </View>
      <GiftedChat
        renderAvatar={null}
        messages={MessagesChat}
        onSend={send}
        user={userData}
        renderBubble={customBubble}
        renderInputToolbar={customInput}
      />
    </Container>
  );
};

const customBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#2c2f33',
          borderColor: 'white',
          borderWidth: 0.3,
          padding: 5,
          marginVertical: 5,
          maxWidth: Width / 2,
        },
        left: {
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 0.3,
          marginVertical: 5,
          padding: 5,
          maxWidth: Width / 2,
        },
      }}
    />
  );
};

const customInput = props => {
  return (
    <InputToolbar
      {...props}
      textInputStyle={{color: 'white'}}
      containerStyle={{
        backgroundColor: '#23272a',
        borderTopColor: 'black',
      }}
    />
  );
};

export default PersonalConversation;
