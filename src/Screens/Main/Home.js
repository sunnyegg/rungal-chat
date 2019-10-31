import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Chat from './Chats/Personal';
import Friends from './Chats/FriendList';
import Account from './Profile/Account';
import {Badge, Text} from 'native-base';

const TabNavigator = createBottomTabNavigator(
  {
    Chat,
    Friends,
    Account,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Chat') {
          iconName = `logo-snapchat`;
        } else if (routeName === 'Friends') {
          iconName = `md-contacts`;
        } else if (routeName === 'Account') {
          iconName = `md-contact`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#7289da',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        backgroundColor: '#23272a',
        borderTopColor: '#23272a',
        height: 55,
        paddingVertical: 8,
      },
    },
  },
);

export default createAppContainer(TabNavigator);
