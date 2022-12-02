import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { IMAGES, COLORS } from '../../Constants/Theme';
import { GLOBALSTYLE } from '../../Constants/Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../Components/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import { loginuser } from '../../Redux/Actions/loginAction';
import useApp from '../../context/appContext';
import appState from '../../Constants/appstate';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const { setState } = useApp();

  const reducerData = useSelector(state => state.loginReducer);
  //console.log("login data of reducer--->", reducerData)

  const handleUserName = data => {
    setUserName(data);
  };
  const handlePassword = data => {
    setPassword(data);
  };

  useEffect(() => {
    if (reducerData.loginData.message === 'Authenticate Successfully') {
      setState(appState.APP_STATE_PRIVATE);
    }
  }, [reducerData.loginData])

  const loginUser = () => {
    dispatch(loginuser(userName, password));

  };
  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={[GLOBALSTYLE.mainContainer, { justifyContent: 'center' }]}>
        <Image source={IMAGES.nimaplogo} style={styles.logoStyle} />
        <View style={GLOBALSTYLE.TextInputStyle}>
          <TextInput
            placeholder="User Name"
            maxLength={40}
            value={userName}
            onChangeText={data => handleUserName(data)}
          />
        </View>
        <View style={GLOBALSTYLE.TextInputStyle}>
          <TextInput
            placeholder="Password"
            maxLength={15}
            secureTextEntry={visible}
            value={password}
            onChangeText={data => handlePassword(data)}
          />
          <TouchableOpacity
            style={styles.VisibleIconStyle}
            onPress={() => {
              setShow(!show);
              setVisible(!visible);
            }}>
            <Entypo
              name={show === true ? 'eye' : 'eye-with-line'}
              size={25}
              color={COLORS.grey}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ alignSelf: 'flex-end', marginHorizontal: 10 }}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: COLORS.black }}>Forgot Password?</Text>
        </TouchableOpacity>
        <CustomButton title="Login" onPressFunction={() => loginUser()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    marginVertical: 20,
  },
  VisibleIconStyle: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
export default Login;
