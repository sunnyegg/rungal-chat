import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {fromRight} from 'react-navigation-transitions';

import Open from './Screens/Open';
import Login from './Screens/Users/Login';
import Register from './Screens/Users/Register';
import Home from './Screens/Main/Home';
import PersonalConversation from './Screens/Main/Chats/Conversations/Personal';
import FriendProfile from './Screens/Main/Profile/Friend';

const MainNavigator = createStackNavigator(
  {
    Open,
    Login,
    Register,
    Home,
    PersonalConversation,
    FriendProfile,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    transitionConfig: () => fromRight(500),
  },
);

export default createAppContainer(MainNavigator);
