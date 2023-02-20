import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import PreviewMail from './PreviewMail';
import ResourceEndDateView from './ResourceEndDateView';

const DeleteResourceView = ({onCancel, idToDel}) => {
  //For toggling between two modal views
  const [isResEndDateViewVisible, setIsResEndDateViewVisible] = useState(true);
  //For storing mail body
  const [resEndDate, setResEndDate] = useState(null);
  const [previewMailBody, setPreviewMailBody] = useState(null);

  const closeModal = () => {
    onCancel();
    setIsResEndDateViewVisible(true);
  };

  const previewMailFun = (endDate, mailBody) => {
    console.log('endDate : ', endDate);
    console.log('mailBody : ', mailBody);
    setResEndDate(endDate);
    setPreviewMailBody(mailBody);
    setIsResEndDateViewVisible(false);
  };

  return (
    <View style={styles.rootContainer}>
      {isResEndDateViewVisible ? (
        <ResourceEndDateView
          closeModal={closeModal}
          idToDel={idToDel}
          previewMailFun={previewMailFun}
        />
      ) : (
        <PreviewMail
          closeModal={closeModal}
          resEndDate={resEndDate}
          previewMailBody={previewMailBody}
        />
      )}
    </View>
  );
};

export default DeleteResourceView;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
