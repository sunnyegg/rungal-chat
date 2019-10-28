import Axios from 'axios';
import {AsyncStorage} from 'react-native';
import {API_BASEURL} from 'react-native-dotenv';

export const getAuth = () => {
  return {
    type: 'GET_AUTH',
    payload: new Promise(async (resolve, reject) => {
      Axios.post(`${API_BASEURL}`, {
        Data,
      })
        .then(result => resolve(result))
        .catch(error => reject(error));
    }),
  };
};
