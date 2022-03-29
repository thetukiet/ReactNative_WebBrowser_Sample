import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  topSection: {
    flexDirection: 'row',
    borderColor: '#999',
    borderBottomWidth: 1,
    height: 40,
    backgroundColor: '#fbfbfb',
  },
  addressBox: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  goButton: {
    flex: 2,
  },
});
