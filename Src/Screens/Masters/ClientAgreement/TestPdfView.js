import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function TestPdfView() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.textStyle}> Test PDF Viewer</Text>
    </View>
  );
}

export default TestPdfView;
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
