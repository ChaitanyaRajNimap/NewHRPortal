import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../Constants/Theme';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

function CustomNavigationBar({back, headername, style, navigation}) {
  navigation = useNavigation();
  return (
    <View style={{...style}}>
      <StatusBar backgroundColor={COLORS.pureWhite} barStyle="dark-content" />
      <View style={styles.headrViewStyle}>
        {back && (
          <TouchableOpacity
            style={styles.leftBtnStyle}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color="#000" />
          </TouchableOpacity>
        )}
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>{headername}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headrViewStyle: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  leftBtnStyle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 60,
  },
  headerContentStyle: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
});

export default CustomNavigationBar;
