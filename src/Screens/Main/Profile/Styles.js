import {StyleSheet} from 'react-native';

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
    marginLeft: 15,
  },
  RightTitle: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  Profile: {
    paddingLeft: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
  },
});

export default styles;