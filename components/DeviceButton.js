import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { theme } from '../constants/theme';

export default function DeviceButton({ label, icon, onPress }) {
  return (
    <View style={styles.container}>
        <Button
        mode="contained"
        icon={icon}
        onPress={onPress}
        style={styles.button}
        labelStyle={styles.label}
        >
        {label}
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    padding: 10,
    width: 150,
    height: 150,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
  },
  label: {
    color: theme.colors.text,
    fontSize: 16,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
