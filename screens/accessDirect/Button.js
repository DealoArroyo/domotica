import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';

export default function App() {
  const ipESP32 = "http://192.168.130.229";
  const [encendido, setEncendido] = useState(false);

  const toggleFoco = async () => {
    const endpoint = encendido ? "/off" : "/on";

    try {
      const res = await fetch(`${ipESP32}${endpoint}`);
      const text = await res.text();
      setEncendido(!encendido);
      Alert.alert("ESP32", text);
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar al ESP32");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={encendido ? "Apagar Foco Cocina" : "Encender Foco Cocina"}
        onPress={toggleFoco}
        color={encendido ? "red" : "green"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
