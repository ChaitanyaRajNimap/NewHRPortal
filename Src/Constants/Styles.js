import {Dimensions, StyleSheet} from 'react-native';

import {COLORS} from './Theme';

export const GLOBALSTYLE = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  TextInputStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: Dimensions.get('screen').width - 20,
    margin: 10,
    alignSelf: 'center',
  },
  cardView: {
    flex: 1,
    marginVertical: 10,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  columnView: {
    flexDirection: 'column',
    margin: 10,
  },
  rowView: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: COLORS.grey,
    padding: 2,
  },
  text: {
    fontSize: 14,
    color: COLORS.black,
    padding: 3,
    flexWrap: 'wrap',
  },
  headerRightStyle: {
    margin: 10,
    fontWeight: 'bold',
    marginEnd: 15,
  },
});
