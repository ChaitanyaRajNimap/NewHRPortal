import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {GLOBALSTYLE} from '../Constants/Styles';
import {COLORS} from '../Constants/Theme';

const CustomDownloadRadioBtn = props => {
  const onPressFun = value => {
    props.onPressFunction(value);
  };

  const items = [
    {label: 'Download Excel', value: 0},
    {label: 'Send to Email', value: 1},
  ];

  return (
    <View style={[GLOBALSTYLE.TextInputStyle, styles.container]}>
      {/* <Text style={styles.title}>{props.title}</Text> */}
      <RadioForm style={styles.radioForm}>
        {items.map((obj, index) => (
          <RadioButton style={styles.radioButton} key={index}>
            <RadioButtonInput
              obj={obj}
              index={index}
              isSelected={index === props.value}
              onPress={value => {
                onPressFun(value);
              }}
              borderWidth={2}
              buttonInnerColor={COLORS.lightBlue}
              buttonOuterColor={
                index === props.value ? COLORS.lightBlue : COLORS.grey
              }
              buttonSize={10}
              buttonWrapStyle={{marginRight: 10}}
            />
            <RadioButtonLabel
              obj={obj}
              index={index}
              labelStyle={styles.labelStyle}
              onPress={() => {}}
            />
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );
};

export default CustomDownloadRadioBtn;

const styles = StyleSheet.create({
  container: {
    width: 350,
    marginBottom: 5,
  },
  title: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  radioForm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButton: {marginTop: 10, marginBottom: 0},
  labelStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
