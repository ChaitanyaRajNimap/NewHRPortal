import React, {useEffect, useReducer, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  LogBox,
} from 'react-native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import CustomNavigationBar from '../../../../Components/CustomNavigationBar';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../../Constants/Theme';
import {fetchVenders} from '../../Vendor/vendor/vendorServices';
import {fetchTechnology} from '../addResource/addResourceServices';
import DocumentPicker from 'react-native-document-picker';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast';
import {Dropdown} from 'react-native-element-dropdown';
import validation from '../../../../Util/helper';
import {initalState, reducer} from '../addResource/addResourcseFormData';
import dayjs from 'dayjs';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const EditResource = ({navigation}) => {
  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={GLOBALSTYLE.mainContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default EditResource;
