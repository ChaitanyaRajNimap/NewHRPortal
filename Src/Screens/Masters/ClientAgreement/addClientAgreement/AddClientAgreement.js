import React from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';

const AddClientAgreement = ({navigation}) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.textStyle}>Add Client Agreement</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 25,
    color: '#000',
  },
});

export default AddClientAgreement;
