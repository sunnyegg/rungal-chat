import React, {useState, useEffect} from 'react';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {View, Dimensions} from 'react-native';
import {Container, Body, Title, Icon} from 'native-base';
import styles from './Styles';

import firebaseSDK from '../../../../Configs/firebaseSDK';
import firebase from 'firebase';

const Width = Dimensions.get('window').width;

const PersonalConversation = ({navigation}) => {
  const [MessagesChat, setMessages] = useState([]);
  const [UserID, setUserID] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [DisplayName, setDisplayName] = useState('');
  const currentUser = firebaseSDK.uid();

  const setData = () => {
    setUserID(navigation.getParam('userID'));
    setDisplayName(navigation.getParam('userName'));
    // setEmail(navigation.getParam('userEmail'));
    setName(firebase.auth().currentUser.displayName);
    setEmail(firebase.auth().currentUser.email);
  };

  const userData = {
    name: Name,
    email: Email,
    id: currentUser,
    _id: currentUser,
  };

  useEffect(() => {
    setData();
    firebase
      .database()
      .ref('Messages')
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
  }, []);

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
              <Title>{DisplayName}</Title>
            </Body>
          </View>
        </View>
      </View>
      <GiftedChat
        messages={MessagesChat}
        onSend={firebaseSDK.send}
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
