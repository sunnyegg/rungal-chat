import {StyleSheet, Dimensions} from 'react-native';

const Width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  Header: {
    height: 65,
    backgroundColor: '#23272a',
    elevation: 5,
  },
  HeaderTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  LeftTitle: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  RightTitle: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  Profile: {
    paddingLeft: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
  },
  ProfileAccount: {
    width: Width - 50,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
  },
  ProfileImage: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 100,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});

export default styles;
