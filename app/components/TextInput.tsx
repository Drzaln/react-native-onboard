import {
  PressableProps,
  StyleSheet,
  TextInput as RNInput,
  TextInputProps as RNInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {BorderRadius, Colors, Size} from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Pressable from './Pressable';
import Text from './Text';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface TextInputProps extends Omit<RNInputProps, 'testID'> {
  style?: ViewStyle;
  onClear?: () => void;
  clearButtonTestID?: PressableProps['testID'];
  textInputTestID: RNInputProps['testID'];
  hideButtonTestID?: PressableProps['testID'];
  type?: 'password' | 'default' | 'email';
  value?: string;
  title: string;
  required?: boolean;
  errorText?: string;
  onErrorChange?: (hasError: boolean) => void;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
}

const TextInput = ({
  style,
  onClear,
  clearButtonTestID,
  textInputTestID,
  hideButtonTestID,
  type = 'default',
  value = '',
  title,
  required = false,
  errorText = 'This field is required',
  onErrorChange = () => {},
  onChangeText = (text: string) => {
    text;
  },
  onBlur = () => {},
  ...textInputProps
}: TextInputProps) => {
  const [error, setError] = React.useState<string>('');
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);
  const [emailError, setEmailError] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [passwordErrType, setPasswordErrType] = React.useState<
    'long' | 'short'
  >('short');
  const [isFocused, setIsFocused] = React.useState(false);
  const errorAnimate = useSharedValue(false);

  const typeEmail = React.useRef(type === 'email').current;

  const handleEmailChange = (input: string) => {
    setEmail(input);
    setEmailError('');
    onChangeText(input);
    errorAnimate.value = false;
  };

  const handlePasswordChange = (input: string) => {
    setPassword(input);
    setPasswordError('');
    onChangeText(input);
    errorAnimate.value = false;
  };

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmailBlur = React.useCallback(() => {
    if (email?.length === 0) {
      setEmailError('Email is required');
      onErrorChange(true);
      errorAnimate.value = true;
      setIsFocused(false);
    } else if (!validateEmail(email)) {
      setEmailError('Email is not valid');
      onErrorChange(true);
      errorAnimate.value = true;
      setIsFocused(false);
    } else {
      setEmailError('');
      onErrorChange(false);
      errorAnimate.value = false;
      setIsFocused(false);
    }
  }, [email, errorAnimate, onErrorChange]);

  const onClearEmail = React.useCallback(() => {
    setEmail('');
    setEmailError('');
    errorAnimate.value = false;
  }, [errorAnimate]);

  const validatePassword = (input: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^+=_)(}{\\|<>~[\];:,\/?!@$%^&*()-+=])[A-Za-z\d@$!%*?&.#^+=_)(}{\\|<>~[\];:,\/?!@$%^&*()-+=]{8,}$/;
    return passwordRegex.test(input);
  };

  const handlePasswordBlur = React.useCallback(() => {
    if (password.length === 0) {
      setPasswordErrType('short');
      setPasswordError('Password is required');
      onErrorChange(true);
      errorAnimate.value = true;
      setIsFocused(false);
    } else if (!validatePassword(password)) {
      setPasswordErrType('long');
      setPasswordError(
        'Password must contain at least 8 characters, an uppercase letter, a lowercase letter, and a symbol',
      );
      onErrorChange(true);
      errorAnimate.value = true;
      setIsFocused(false);
    } else {
      setPasswordError('');
      onErrorChange(false);
      errorAnimate.value = false;
      setIsFocused(false);
    }
  }, [errorAnimate, onErrorChange, password]);

  const handleChangeText = (text: string) => {
    onChangeText(text);
  };

  const handleBlur = () => {
    if (required && !value) {
      setError(errorText || 'This field is required');
      onErrorChange(true);
      errorAnimate.value = true;
      setIsFocused(false);
    } else {
      setError('');
      onErrorChange(false);
      errorAnimate.value = false;
      setIsFocused(false);
    }

    onBlur && onBlur();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const animated = useAnimatedStyle(() => {
    return {
      bottom: errorAnimate.value
        ? passwordErrType === 'long'
          ? withTiming(-37)
          : withTiming(-20)
        : withTiming(0),
      opacity: errorAnimate.value ? withTiming(1) : withTiming(0),
    };
  });

  const renderTextInput = () => {
    switch (type) {
      case 'email':
        return (
          <RNInput
            {...textInputProps}
            placeholderTextColor={Colors.gray}
            style={styles.textInput}
            testID={textInputTestID}
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            onBlur={handleEmailBlur}
            returnKeyType="done"
            onFocus={handleFocus}
          />
        );
      case 'password':
        return (
          <RNInput
            {...textInputProps}
            placeholderTextColor={Colors.gray}
            style={styles.textInput}
            testID={textInputTestID}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={hidePassword}
            onBlur={handlePasswordBlur}
            returnKeyType="done"
            onFocus={handleFocus}
          />
        );

      default:
        return (
          <RNInput
            {...textInputProps}
            placeholderTextColor={Colors.gray}
            style={styles.textInput}
            testID={textInputTestID}
            value={value}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
            returnKeyType="done"
            onFocus={handleFocus}
          />
        );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          styles.container,
          {borderColor: isFocused ? Colors.seablue : Colors.black},
          style,
        ]}>
        {renderTextInput()}
        {value && type === 'default' && (
          <Pressable onPress={onClear} testID={clearButtonTestID}>
            <Icon name="close-circle" size={24} color={Colors.gray} />
          </Pressable>
        )}
        {email && typeEmail && (
          <Pressable onPress={onClearEmail} testID={clearButtonTestID}>
            <Icon name="close-circle" size={24} color={Colors.gray} />
          </Pressable>
        )}
        {type === 'password' && (
          <Pressable
            onPress={() => setHidePassword(old => !old)}
            testID={hideButtonTestID}>
            <Icon
              name={hidePassword ? 'eye-off' : 'eye'}
              size={24}
              color={Colors.gray}
            />
          </Pressable>
        )}
      </View>
      {emailError && (
        <Animated.Text style={[styles.errorMsg, animated]}>
          {emailError}
        </Animated.Text>
      )}
      {passwordError && (
        <Animated.Text
          style={[
            styles.errorMsg,
            passwordErrType === 'long' && styles.passwordErr,
            animated,
          ]}>
          {passwordError}
        </Animated.Text>
      )}
      {error && (
        <Animated.Text style={[styles.errorMsg, animated]}>
          {error}
        </Animated.Text>
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: Size.lg,
    marginVertical: Size.lg,
  },
  title: {
    marginBottom: Size.s,
    textTransform: 'capitalize',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xxl,
    borderWidth: 3,
    borderColor: Colors.black,
    paddingLeft: Size.lg,
    paddingRight: Size.s,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
    height: 40,
  },
  errorMsg: {
    position: 'absolute',
    bottom: -20,
    left: Size.lg,
    color: Colors.red,
  },
  passwordErr: {
    bottom: -37,
  },
});
