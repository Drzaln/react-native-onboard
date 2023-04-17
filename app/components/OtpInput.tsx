import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputKeyPressEventData,
  ViewStyle,
} from 'react-native';
import {Colors} from '../styles';
import Text from './Text';

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  style?: ViewStyle;
  isError?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onComplete,
  style,
  isError,
}) => {
  const otpInputs = React.useRef<Array<TextInput>>([]);
  const [otpValues, setOtpValues] = React.useState<string[]>(
    Array(length).fill(''),
  );
  const [focusedInputIndex, setFocusedInputIndex] = React.useState<number>(0);

  const handleInputTextChange = React.useCallback(
    (index: number, text: string) => {
      // Update the input text and focus on the next input
      const newOtpValues = [...otpValues];
      newOtpValues[index] = text.replace(/[^0-9]/g, '');
      setOtpValues(newOtpValues);
      if (newOtpValues[index].length === 1 && index < length - 1) {
        otpInputs.current[index + 1].focus();
      } else if (newOtpValues[index].length === 0 && index > 0) {
        otpInputs.current[index - 1].focus(); // Focus on previous input when text is deleted
      }

      // Combine all the input texts and call onComplete when OTP is complete
      const otp = newOtpValues.join('');
      if (otp.length === length) {
        onComplete(otp);
      }
    },
    [length, onComplete, otpValues],
  );

  const handleInputFocus = React.useCallback((index: number) => {
    setFocusedInputIndex(index);
  }, []);

  const handleInputBlur = React.useCallback(() => {
    setFocusedInputIndex(-1);
  }, []);

  const handleInputKeyPress = React.useCallback(
    (
      index: number,
      event: React.BaseSyntheticEvent<TextInputKeyPressEventData>,
    ) => {
      if (
        event.nativeEvent.key === 'Backspace' &&
        index > 0 &&
        otpValues[index].length === 0
      ) {
        // If Backspace is pressed and current input is empty, focus on previous input
        otpInputs.current[index - 1].focus();
      } else if (
        event.nativeEvent.key !== 'Backspace' &&
        otpValues[index].length === 1 &&
        index < length - 1
      ) {
        // If a character is entered and current input is filled, focus on next input
        otpInputs.current[index + 1].focus();
      }
    },
    [otpValues, length],
  );

  const inputStyles = React.useCallback(
    (index: number) => [
      styles.input,
      focusedInputIndex === index && !isError
        ? styles.inputFocused
        : isError
        ? styles.inputError
        : styles.inputNormal,
    ],
    [focusedInputIndex, isError],
  );

  return (
    <View>
      <View style={[styles.container, style]}>
        {Array(length)
          .fill(null)
          .map((_, index) => (
            <TextInput
              key={index}
              ref={ref => (otpInputs.current[index] = ref!)}
              style={inputStyles(index)}
              keyboardType="numeric"
              maxLength={1}
              value={otpValues[index]}
              onChangeText={text => handleInputTextChange(index, text)}
              onFocus={() => handleInputFocus(index)}
              onBlur={handleInputBlur}
              onKeyPress={event => handleInputKeyPress(index, event)}
            />
          ))}
      </View>
      <View style={styles.errorContainer}>
        {isError && (
          <Text style={styles.errorText}>Incorrect OTP. Please try again.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 50 / 2,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: Colors.white,
  },
  inputFocused: {
    borderColor: Colors.seablue,
  },
  inputError: {
    borderColor: Colors.red,
  },
  inputNormal: {
    borderColor: 'gray',
  },
  errorContainer: {alignItems: 'center'},
  errorText: {
    color: Colors.red,
    textAlign: 'center',
    position: 'absolute',
    bottom: -25,
  },
});

export default OTPInput;
