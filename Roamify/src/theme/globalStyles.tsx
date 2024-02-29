import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPrimary: {
    backgroundColor: '#F2F3F5',
    borderRadius: 10,
    paddingLeft: 15,
    minWidth: 280,
    color: '#040415',
  },
  inputSecondary: {
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 25,
    width: '90%',
    paddingLeft: 55,
    borderColor: '#B7B7B7',
    color: '#040415',
  },
  buttonPrimary: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#47C6E6',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonShadow: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#47C6E6',
    borderRadius: 10,
    width: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
