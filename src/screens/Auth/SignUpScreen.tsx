/**
 * Authentification Sceen
 * DBS Lifestyle App
 * https://github.com/MikaelLazarev/DBSLifestyle
 *
 * @format
 * @flow
 */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Modal from 'react-native-modal';
import * as yup from 'yup';
import {STATUS} from "../../store/utils/status";

const SignUpScreen : React.FC = () => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authErrorDisplay, setAuthErrorDisplay] = useState('');

  // Validation Hook
  useEffect(() => {
    const scheme = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup.string().required(),
    });
    scheme.isValid({email, password}).then(valid => setValid(valid));
  }, [email, password]);

  // Show Loading Modal during loading phase
  // and update Error message
  // useEffect(() => {
  //   setIsModalVisible(authStatus === STATUS.LOADING);
  //   if (authStatus === STATUS.FAILURE) {
  //     setAuthErrorDisplay(authError);
  //   }
  //   if (isAuthenticated) {
  //     navigation.navigate('OnboardingStack');
  //   }
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text>Connecting</Text>
          <ActivityIndicator />
        </View>
      </Modal>
      <View style={styles.logo}>
        <Image source={require('../../../logo.jpg')} style={styles.image} />
        <Text h2>DBS Lifestyle Banking</Text>
      </View>

      <View style={styles.input}>
        <Input placeholder="email" onChangeText={setEmail} value={email} />
      </View>
      <View style={styles.input}>
        <Input
          placeholder="password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <Text>{authErrorDisplay}</Text>
      <View style={styles.button}>
        <Button
          title="Sign Up"
          // onPress={() => signup(email, password)}
          disabled={!valid}
        />
      </View>
      {/*<TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>*/}
      {/*  <View>*/}
      {/*    <Text>SignUp</Text>*/}
      {/*  </View>*/}
      {/*</TouchableOpacity>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  image: {
    height: 100,
    resizeMode: 'contain',
  },
  input: {
    paddingTop: 5,
    width: '80%',
  },

  button: {
    width: '75%',
    paddingTop: 25,
  },
});


export default SignUpScreen;
