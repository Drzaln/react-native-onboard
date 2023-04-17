import {
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import {BorderRadius, Colors, Size} from '../styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Text from './Text';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps extends PressableProps {
  title: string;
  offsetColor: string;
  onPress: () => void;
  style?: ViewProps['style'];
  disabled?: boolean;
}

const Button = ({
  title,
  offsetColor = 'white',
  style,
  onPress,
  disabled,
  ...buttonProps
}: ButtonProps) => {
  const pressed = useSharedValue(false);
  const config = {duration: 200};

  const animateOffset = useAnimatedStyle(() => {
    return {
      bottom: pressed.value ? withTiming(0, config) : withTiming(8, config),
      left: pressed.value ? withTiming(0, config) : withTiming(8, config),
    };
  });
  const animateBorder = useAnimatedStyle(() => {
    return {
      borderWidth: pressed.value
        ? withTiming(2, config)
        : withTiming(4, config),
    };
  });

  return (
    <View style={[styles.button, style]}>
      <AnimatedPressable
        {...buttonProps}
        onPress={onPress}
        disabled={disabled}
        style={[styles.buttonOutline, animateBorder]}
        onPressIn={() => (pressed.value = true)}
        onPressOut={() => (pressed.value = false)}>
        <Text
          style={[
            styles.buttonTitle,
            {color: disabled ? Colors.white : Colors.black},
          ]}>
          {title}
        </Text>
      </AnimatedPressable>
      <Animated.View
        style={[
          styles.offset,
          {backgroundColor: disabled ? Colors.gray : offsetColor},
          animateOffset,
        ]}
      />
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '60%',
    height: Size.xxxl,
  },
  buttonTitle: {
    color: Colors.black,
  },
  buttonOutline: {
    height: Size.xxxl,
    borderColor: Colors.black,
    borderWidth: 4,
    borderRadius: BorderRadius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offset: {
    position: 'absolute',
    zIndex: -2,
    width: '100%',
    height: Size.xxxl,
    borderRadius: BorderRadius.xxl,
    bottom: 8,
    left: 8,
  },
});
