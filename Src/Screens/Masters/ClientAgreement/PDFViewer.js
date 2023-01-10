import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PDFViewer = () => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.textStyle}>PDF Viewer</Text>
    </View>
  );
};

export default PDFViewer;

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
