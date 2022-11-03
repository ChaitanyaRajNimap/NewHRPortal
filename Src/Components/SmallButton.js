import React from 'react';
import {TouchableOpacity, Text, Dimensions} from 'react-native';
import {COLORS} from '../Constants/Theme';

const SmallButton = props => {
  const onPressFun = () => {
    props.onPressFunction();
  };
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 15,
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: props.color,
        width: Dimensions.get('window').width / 3,
      }}
      onPress={() => {
        onPressFun();
      }}>
      <Text
        style={{
          color: COLORS.white,
          fontWeight: '600',
          fontSize: 14,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
export default SmallButton;
