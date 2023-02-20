import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../../../Constants/Theme';
import SmallButton from '../../../../Components/SmallButton';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Mailer from 'react-native-mail';

const PreviewMail = ({closeModal, resEndDate, previewMailBody}) => {
  const [mailBody, setMailBody] = useState(null);
  const [adminMail, setAdminMail] = useState(null);

  useEffect(() => {
    setMailBody(previewMailBody);
    setAdminMail(previewMailBody.admin_mail);
  }, []);

  //For rich text Editor
  const richText = useRef();

  const sendMails = () => {
    if (mailBody) {
      sendEmail(mailBody.admin_mail);
      sendEmail(mailBody.account_mail);
      sendEmail(mailBody.hr_mail);
    }
  };

  //For sending mail
  const sendEmail = content => {
    Mailer.mail(
      {
        subject: 'Test Email',
        recipients: ['monica@nimapinfotech.com'],
        ccRecipients: ['chaitanyarajiwade@nimapinfotech.com'],
        bccRecipients: [],
        body: content,
        isHTML: true,
      },
      (error, event) => {
        if (error) {
          // handle error
        } else {
          // handle success
        }
      },
    );
  };

  return (
    <View style={styles.conatiner}>
      <Text style={styles.title}>Preview Mail</Text>
      {mailBody ? (
        <View style={styles.mailConatiner}>
          <RichToolbar
            editor={richText}
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.keyboard,
              actions.setStrikethrough,
              actions.removeFormat,
              actions.insertVideo,
              actions.checkboxList,
              actions.undo,
              actions.redo,
            ]}
            iconMap={{
              [actions.heading1]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H1</Text>
              ),
            }}
          />
          <ScrollView style={{height: 100}}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
              <RichEditor
                ref={richText}
                onChange={descriptionText => {
                  console.log('descriptionText', descriptionText);
                }}
                initialContentHTML={mailBody.admin_mail}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.title}>No data found</Text>
      )}

      {mailBody ? (
        <View style={styles.mailConatiner}>
          <RichToolbar
            editor={richText}
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.keyboard,
              actions.setStrikethrough,
              actions.removeFormat,
              actions.insertVideo,
              actions.checkboxList,
              actions.undo,
              actions.redo,
            ]}
            iconMap={{
              [actions.heading1]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H1</Text>
              ),
            }}
          />
          <ScrollView style={{height: 100}}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
              <RichEditor
                ref={richText}
                onChange={descriptionText => {
                  console.log('descriptionText', descriptionText);
                }}
                initialContentHTML={mailBody.account_mail}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.title}>No data found</Text>
      )}

      {mailBody ? (
        <View style={styles.mailConatiner}>
          <RichToolbar
            editor={richText}
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.keyboard,
              actions.setStrikethrough,
              actions.removeFormat,
              actions.insertVideo,
              actions.checkboxList,
              actions.undo,
              actions.redo,
            ]}
            iconMap={{
              [actions.heading1]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H1</Text>
              ),
            }}
          />
          <ScrollView style={{height: 100}}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
              <RichEditor
                ref={richText}
                onChange={descriptionText => {
                  console.log('descriptionText', descriptionText);
                }}
                initialContentHTML={mailBody.hr_mail}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.title}>No data found</Text>
      )}

      <View style={styles.upperViewStyle}>
        <View>
          <SmallButton
            color={COLORS.red}
            title={'Send'}
            onPressFunction={sendMails}
          />
        </View>
        <View>
          <SmallButton
            color={COLORS.grey}
            title={'Close'}
            onPressFunction={() => {
              closeModal();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PreviewMail;

const styles = StyleSheet.create({
  conatiner: {
    height: 625,
    width: 350,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginBottom: 10,
    color: COLORS.black,
    fontSize: 22,
    textAlign: 'center',
  },
  mailConatiner: {
    marginBottom: 15,
    borderColor: '#D1D1D1',
    borderWidth: 1,
  },
  upperViewStyle: {flexDirection: 'row'},
});
