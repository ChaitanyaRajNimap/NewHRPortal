import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import CustomNavigationBar from '../../../../Components/CustomNavigationBar';
import {GLOBALSTYLE} from '../../../../Constants/Styles';

const AddClient = () => {
  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.container}>
        <CustomNavigationBar back={true} headername="Add Client" />
        <View style={styles.rootContainer}>
          <Text style={styles.heading}>Add Client</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddClient;

const styles = StyleSheet.create({
  container: {flex: 1},
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#f00',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
