import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {COLORS} from '../../../Constants/Theme';
import DropDownPicker from 'react-native-dropdown-picker';
import validation from '../../../Util/helper';
import SmallButton from '../../../Components/SmallButton';

const ExportModal = ({onCancel}) => {
  const [resOpen, setResOpen] = useState(false);
  const [resValue, setResValue] = useState(null);
  const [resItems, setResItems] = useState([
    {
      value: 'Current Resource Export',
      label: 'Current Resource Export',
    },
    {
      value: 'Upcoming Resource Export',
      label: 'Upcoming Resource Export',
    },
    {
      value: 'Project Export',
      label: 'Project Export',
    },
  ]);

  const [inputs, setInputs] = useState({
    res: null,
    action: null,
  });
  const [error, setError] = useState({
    resError: null,
    actionError: null,
  });

  return (
    <View style={styles.rootContainer}>
      <View style={styles.modalView}>
        <Text style={styles.headerText}>Export</Text>
        <View></View>
      </View>
    </View>
  );
};

export default ExportModal;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: 350,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 30,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    marginBottom: 20,
    color: COLORS.black,
    fontSize: 18,
  },
});
