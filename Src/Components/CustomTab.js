import React from 'react';
import {TouchableOpacity, Text, Dimensions} from 'react-native';
import {COLORS} from '../Constants/Theme';

const CustomTab = props => {
  const onPressFun = () => {
    props.onPressFunction();
  };

  return (
    <TouchableOpacity
      style={{
        width: Dimensions.get('screen').width / 4,
        padding: 15,
        paddingHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: props.color,
      }}
      onPress={() => {
        onPressFun();
      }}>
      <Text style={{color: COLORS.white, fontWeight: '600', fontSize: 14}}>
        {props.title + ' (' + props.count + ')'}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomTab;
