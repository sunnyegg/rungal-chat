import React, {useState, useEffect} from 'react';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {View} from 'react-native';
import {Container, Body, Title, Icon} from 'native-base';
import styles from './Styles';

import firebaseSDK from '../../../../Configs/firebaseSDK';

const PersonalConversation = ({navigation}) => {
  const [Messages, setMessages] = useState([]);

  // useEffect(() => {
  //   console.log({Messages});
  // }, []);

  const onSend = text => {
    setMessages(() => GiftedChat.append(Messages, text));
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
              <Title>Aqua</Title>
            </Body>
          </View>
        </View>
      </View>
      <GiftedChat
        messages={Messages}
        onSend={messages => onSend(messages)}
        user={{_id: 1}}
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
          backgroundColor: 'gray',
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
