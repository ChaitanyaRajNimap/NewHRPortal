import React from 'react';
import {TouchableOpacity, Text, Dimensions} from 'react-native';
import {COLORS} from '../Constants/Theme';

const CustomButton = props => {
  const onPressFun = () => {
    props.onPressFunction();
  };
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 15,
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: COLORS.lightBlue,
        width: Dimensions.get('window').width - 20,
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
export default CustomButton;
