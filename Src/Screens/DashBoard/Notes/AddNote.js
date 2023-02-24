import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {addNote} from '../../../Redux/Actions/DashboardAction';
import CustomNavigationBar from '../../../Components/CustomNavigationBar';
import {useSelector, useDispatch} from 'react-redux';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {COLORS} from '../../../Constants/Theme';
import validation from '../../../Util/helper';

const AddNote = ({navigation}) => {
  const dispatch = useDispatch();

  const [note, setNote] = useState(null);
  const [noteError, setNoteError] = useState(null);

  const handleAdd = () => {
    let err = validation.validateNameFeild(note);
    setNoteError(err);
    if (!err) {
      let addedNote = {notes: note};
      console.log('addedNote', addedNote);
      dispatch(addNote(addedNote, navigation));
      setNote(null);
      setNoteError(null);
    }
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.container}>
        <CustomNavigationBar back={true} headername="Add Note" />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={GLOBALSTYLE.mainContainer}>
          <KeyboardAvoidingView enabled>
            <View style={styles.formContainer}>
              {/*For add note */}
              <TextInput
                placeholder={'Enter note'}
                style={[
                  GLOBALSTYLE.TextInputStyle,
                  styles.inputAligner,
                  {marginTop: 10},
                ]}
                value={note}
                onChangeText={value => {
                  setNote(value);
                  let err = validation.validateNameFeild(value);
                  setNoteError(err);
                }}
                keyboardType="default"
                multiline={true}
              />
              <Text style={styles.errorText}>{noteError}</Text>
              <TouchableOpacity
                style={[styles.btnStyle, styles.submitBtnAligner]}
                onPress={handleAdd}>
                <Text style={styles.submitBtnTextStyle}>Add</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {flex: 1},
  formContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  inputAligner: {
    width: 350,
    paddingHorizontal: 15,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginVertical: 2,
    paddingHorizontal: 2,
  },
  btnStyle: {
    height: 48,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnAligner: {
    marginVertical: 10,
    marginHorizontal: 7,
  },
  submitBtnTextStyle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
  },
});
