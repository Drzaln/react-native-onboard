import {StyleSheet} from 'react-native';
import React from 'react';
import {OtpInput, ResendButton, Scaffold, Text} from '../components';
import {OtpRoute, OtpScreenNavigation, Screens} from '../types';
import {Colors, Size} from '../styles';
import {AuthContext} from '../context/auth';

type Props = {
  navigation: OtpScreenNavigation;
  route: OtpRoute;
};

const Otp = ({navigation, route}: Props) => {
  const {_, setAuthData} = React.useContext(AuthContext);
  const {email, password, username} = route.params;
  const [error, setError] = React.useState<boolean>(false);

  const handleResend = () => {
    console.log('resend');
  };

  const handleVerify = (otp: string) => {
    // Perform OTP verification here
    if (otp === '111111') {
      setError(false);
      setAuthData({email, password, username, isLogin: 'no'});
      navigation.navigate(Screens.Login);
    } else if (otp === '') {
      setError(false);
    } else {
      setError(true);
    }
  };

  const completeOtp = (otp: string) => {
    handleVerify(otp);
  };

  return (
    <Scaffold
      testId="otp-screen"
      backButtonTestID="otp-back-button"
      onBackPress={() => navigation.goBack()}>
      <Text style={styles.head}>Enter authentication code</Text>
      <Text style={styles.caption}>
        Enter the 6-digit that we have send via phone number
      </Text>
      <OtpInput
        length={6}
        style={styles.otp}
        onComplete={completeOtp}
        isError={error}
      />
      <ResendButton onPress={handleResend} style={styles.resend} />
    </Scaffold>
  );
};

export default Otp;

const styles = StyleSheet.create({
  otp: {
    marginHorizontal: Size.lg,
  },
  head: {
    fontSize: Size.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Size.xl,
    marginBottom: Size.s,
  },
  caption: {
    textAlign: 'center',
    marginHorizontal: Size.xxl,
    color: Colors.slateGray,
    marginBottom: Size.xl,
  },
  resend: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Size.xxxl,
  },
});
