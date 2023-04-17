import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Scaffold, Text, TextInput} from '../components';
import {RegisterScreenNavigation, Screens} from '../types';
import {Colors, Size} from '../styles';

type Props = {
  navigation: RegisterScreenNavigation;
};

const Register = ({navigation}: Props) => {
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<boolean>(true);
  const [passwordError, setPasswordError] = React.useState<boolean>(true);
  const [usernameError, setUsernameError] = React.useState<boolean>(true);

  return (
    <Scaffold
      testId="register-screen"
      backButtonTestID="register-back-button"
      onBackPress={() => navigation.goBack()}>
      <View style={styles.titleContainer}>
        <Text style={styles.new}>CREATE NEW ACCOUNT</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            title="Username"
            placeholder="johndoe"
            textInputTestID="register-username-input"
            type="default"
            onClear={() => setUsername('')}
            value={username}
            onChangeText={setUsername}
            required={true}
            onErrorChange={setUsernameError}
          />
          <TextInput
            title="Email Address"
            placeholder="john_doe@mail.com"
            textInputTestID="register-email-input"
            type="email"
            onClear={() => setEmail('')}
            value={email}
            onChangeText={setEmail}
            onErrorChange={setEmailError}
          />
          <TextInput
            title="Password"
            placeholder="Password"
            textInputTestID="register-password-input"
            type="password"
            onClear={() => setPassword('')}
            value={password}
            onChangeText={setPassword}
            onErrorChange={setPasswordError}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              navigation.navigate(Screens.Otp, {email, password, username})
            }
            disabled={emailError || passwordError || usernameError}
            title="Create Account"
            offsetColor={Colors.seablue}
          />
        </View>
      </View>
    </Scaffold>
  );
};

export default Register;

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
