import {combineReducers} from 'redux';

import Home from './Home';
import Login from './Login';

const allReducers = combineReducers({
  Home,
  Login,
});

export default allReducers;
