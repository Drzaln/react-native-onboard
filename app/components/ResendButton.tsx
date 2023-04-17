import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import Text from './Text';
import Pressable from './Pressable';

type ButtonProps = {
  style?: ViewStyle;
  onPress: () => void;
};

const ResendButton: React.FC<ButtonProps> = ({onPress, style}) => {
  const [countdown, setCountdown] = React.useState<number>(30);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (countdown > 0 && disabled) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && disabled) {
      setDisabled(false);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [countdown, disabled]);

  const handleResend = () => {
    setCountdown(30);
    setDisabled(true);
    onPress();
  };

  return (
    <View style={style}>
      <Text style={styles.count}>{disabled ? `(00:${countdown})` : ''}</Text>
      <Pressable onPress={handleResend} disabled={disabled}>
        <Text style={styles.resend}>Resend Code</Text>
      </Pressable>
    </View>
  );
};

export default ResendButton;

const styles = StyleSheet.create({
  count: {
    opacity: 0.5,
  },
  resend: {
    fontWeight: 'bold',
  },
});
