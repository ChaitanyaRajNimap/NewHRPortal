import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {COLORS} from '../../../Constants/Theme';
import validation from '../../../Util/helper';
import SmallButton from '../../../Components/SmallButton';
import {editNote} from '../../../Redux/Actions/DashboardAction';
import {useSelector, useDispatch} from 'react-redux';

const EditNote = ({onCancel, editMsg, navigation}) => {
  const dispatch = useDispatch();

  const [note, setNote] = useState(null);
  const [noteError, setNoteError] = useState(null);

  useEffect(() => {
    setNote(editMsg.notes);
  }, []);

  const handleUpdate = () => {
    let err = validation.validateNameFeild(note);
    setNoteError(err);
    if (!err) {
      console.log('ID : ', editMsg.id, ' Note : ', note);
      let edittedNote = {
        notes: note,
      };
      console.log('edittedNote', edittedNote);
      onCancel();
      //   navigation.reset();
      dispatch(editNote(edittedNote, editMsg.id, navigation));
      setNote(null);
      setNoteError(null);
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Notes</Text>
        {/*For edit note */}
        {/* {console.log(editMsg)} */}
        <TextInput
          placeholder={editMsg.notes}
          style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
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
        {/*For Update and Close Buttons */}
        <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
          <SmallButton
            color={COLORS.lightBlue}
            title={'Update'}
            onPressFunction={handleUpdate}
          />
          <SmallButton
            color={COLORS.grey}
            title={'Close'}
            onPressFunction={() => {
              onCancel();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EditNote;

const styles = StyleSheet.create({
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
    width: 290,
    marginTop: 10,
    paddingHorizontal: 15,
    borderColor: COLORS.grey,
    borderWidth: 1,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginVertical: 2,
    paddingHorizontal: 2,
  },
});
