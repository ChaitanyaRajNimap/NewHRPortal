import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CheckBox = props => {
  const iconName = props.isChecked
    ? 'checkbox-marked'
    : 'checkbox-blank-outline';

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <MaterialCommunityIcons name={iconName} size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: 150,
    marginTop: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
    fontWeight: '600',
  },
});
