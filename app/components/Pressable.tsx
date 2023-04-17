import React, {ReactNode} from 'react';
import {
  Pressable as RNPressable,
  PressableProps as RNPressProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface PressableProps extends RNPressProps {
  children?: ReactNode;
  disabled?: boolean;
}

const Pressable = ({children, disabled, ...pressableProps}: PressableProps) => {
  return (
    <RNPressable
      {...pressableProps}
      disabled={disabled}
      style={({pressed}) => [
        pressableProps.style as StyleProp<ViewStyle>,
        {opacity: pressed ? 0.6 : disabled ? 0.5 : 1},
      ]}>
      {children}
    </RNPressable>
  );
};

export default Pressable;
