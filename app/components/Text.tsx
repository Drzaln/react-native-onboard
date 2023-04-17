import React from 'react';
import {StyleSheet, Text as RNText, TextProps} from 'react-native';
import {Colors} from '../styles';

const Text = ({children, style, ...textProps}: TextProps) => {
  return (
    <RNText {...textProps} style={[styles.baseText, style]}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  baseText: {
    color: Colors.black,
  },
});
