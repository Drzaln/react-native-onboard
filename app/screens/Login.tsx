import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Scaffold, Text, TextInput, Toast} from '../components';
import {LoginScreenNavigation} from '../types';
import {Colors, Size} from '../styles';
import {AuthContext} from '../context/auth';

type Props = {
  navigation: LoginScreenNavigation;
};

const Login = ({navigation}: Props) => {
  const [usernameLogin, setUsernameLogin] = React.useState<string>('');
  const [passwordLogin, setPasswordLogin] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<boolean>(true);
  const [usernameError, setUsernameError] = React.useState<boolean>(true);
  const [showToast, setShowToast] = React.useState<boolean>(false);
  const {authData, setAuthData} = React.useContext(AuthContext);

  const handleLogin = () => {
    const {username, password} = authData;
    const correct = username === usernameLogin && password === passwordLogin;
    if (correct) {
      setAuthData({...authData, isLogin: 'yes'});
    } else {
      setShowToast(true);
    }
  };

  React.useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }
  }, [showToast]);

  return (
    <Scaffold
      testId="login-screen"
      backButtonTestID="login-back-button"
      onBackPress={() => navigation.goBack()}>
      {showToast && <Toast message="Incorrect username or password" />}
      <View style={styles.titleContainer}>
        <Text style={styles.new}>LOGIN TO YOUR ACCOUNT</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            title="Username"
            placeholder="johndoe"
            textInputTestID="login-username-input"
            type="default"
            onClear={() => setUsernameLogin('')}
            value={usernameLogin}
            onChangeText={setUsernameLogin}
            required={true}
            onErrorChange={setUsernameError}
          />
          <TextInput
            title="Password"
            placeholder="Password"
            textInputTestID="login-password-input"
            type="password"
            onClear={() => setPasswordLogin('')}
            value={passwordLogin}
            onChangeText={setPasswordLogin}
            onErrorChange={setPasswordError}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={handleLogin}
            disabled={passwordError || usernameError}
            title="Login"
            offsetColor={Colors.seablue}
          />
        </View>
      </View>
    </Scaffold>
  );
};

export default Login;

const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: Size.lg,
    marginTop: Size.xl,
  },
  new: {
    fontSize: Size.xxl,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    marginTop: Size.xxxl,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Size.xxxl,
  },
});
