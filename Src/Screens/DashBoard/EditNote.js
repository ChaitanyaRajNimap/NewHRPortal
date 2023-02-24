import React, {useState, useEffect} from 'react';
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
import {editNote} from '../../Redux/Actions/DashboardAction';
import CustomNavigationBar from '../../Components/CustomNavigationBar';
import {useSelector, useDispatch} from 'react-redux';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';
import validation from '../../Util/helper';
import SmallButton from '../../Components/SmallButton';

const EditNote = ({navigation, route}) => {
  const {noteId, noteMsg} = route.params;
  const dispatch = useDispatch();

  const [note, setNote] = useState(null);
  const [noteError, setNoteError] = useState(null);

  useEffect(() => {
    setNote(noteMsg);
  }, []);

  const handleUpdate = () => {
    let err = validation.validateNameFeild(note);
    setNoteError(err);
    if (!err) {
      // console.log('ID : ', editMsg.id, ' Note : ', note);
      let edittedNote = {
        notes: note,
      };
      console.log('edittedNote', edittedNote);
      // onCancel();
      //   navigation.reset();
      dispatch(editNote(edittedNote, noteId, navigation));
      setNote(null);
      setNoteError(null);
    }
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.container}>
        <CustomNavigationBar back={true} headername="Edit Note" />
        {console.log('noteMsg ==>', noteMsg, ' noteId ==>', noteId)}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={GLOBALSTYLE.mainContainer}>
          <KeyboardAvoidingView enabled>
            <View style={styles.formContainer}>
              {/*For edit note */}
              <TextInput
                placeholder={noteMsg}
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
                onPress={handleUpdate}>
                <Text style={styles.submitBtnTextStyle}>Update</Text>
              </TouchableOpacity>
              {/*For Update and Close Buttons */}
              {/* <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
                <SmallButton
                  color={COLORS.lightBlue}
                  title={'Update'}
                  onPressFunction={handleUpdate}
                />
                <SmallButton
                  color={COLORS.grey}
                  title={'Close'}
                  onPressFunction={() => {
                    // onCancel();
                  }}
                />
              </View> */}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>

    // <View style={styles.centeredView}>
    //   <View style={styles.modalView}>
    //     <Text style={styles.modalText}>Notes</Text>
    //     {/*For edit note */}
    //     {/* {console.log(editMsg)} */}
    //     <TextInput
    //       placeholder={editMsg.notes}
    //       style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
    //       value={note}
    //       onChangeText={value => {
    //         setNote(value);
    //         let err = validation.validateNameFeild(value);
    //         setNoteError(err);
    //       }}
    //       keyboardType="default"
    //       multiline={true}
    //     />
    //     <Text style={styles.errorText}>{noteError}</Text>
    //     {/*For Update and Close Buttons */}
    //     <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
    //       <SmallButton
    //         color={COLORS.lightBlue}
    //         title={'Update'}
    //         onPressFunction={handleUpdate}
    //       />
    //       <SmallButton
    //         color={COLORS.grey}
    //         title={'Close'}
    //         onPressFunction={() => {
    //           // onCancel();
    //         }}
    //       />
    //     </View>
    //   </View>
    // </View>
  );
};

export default EditNote;

const styles = StyleSheet.create({
  container: {flex: 1},
  formContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: 250,
    width: 350,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    color: COLORS.black,
    fontSize: 20,
  },
  rowViewAligner: {margin: 0, flex: 0},
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
});
