import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function HomeDirect({ navigation }) {
  const ipESP32 = "http://192.168.0.33"; // Asegúrate que esta IP sea correcta
  const [encendido, setEncendido] = useState(false);
  const [puertaAbierta, setPuertaAbierta] = useState(false); // Nuevo estado

  const toggleAmbiente = async () => {
    try {
      const accion = encendido ? 'off' : 'on';
      const res = await fetch(`${ipESP32}/ambiente/${accion}`);
      const text = await res.text();
      console.log(`Ambiente ${accion}:`, text);
      setEncendido(!encendido);
    } catch (error) {
      Alert.alert("Error", `No se pudo ${encendido ? 'apagar' : 'encender'} el ambiente`);
    }
  };

  const togglePuerta = async () => {
    const ruta = puertaAbierta ? '/puerta/cerrar' : '/puerta/abrir';
    try {
      await axios.get(`${ipESP32}${ruta}`);
      setPuertaAbierta(!puertaAbierta);
    } catch (error) {
      Alert.alert("Error", "No se pudo cambiar el estado de la puerta");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.card, encendido && styles.cardEncendida]}
        onPress={toggleAmbiente}
      >
        <Ionicons name={encendido ? "bulb" : "bulb-outline"} size={24} color="#ffc116" />
        <View style={styles.label}>
          <Text style={styles.textlabel}>
            Sala de estar
          </Text>
          <Text style={styles.textbool}>
            {encendido ? "Apagar" : "Encender"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* NUEVO: Botón para abrir/cerrar puerta */}
      <TouchableOpacity style={styles.card} onPress={togglePuerta}>
        <MaterialIcons name={puertaAbierta ? "meeting-room" : "no-meeting-room"} size={24} color="#b4e6f9" />
        <View style={styles.label}>
          <Text style={styles.textlabel}>Puerta</Text>
          <Text style={styles.textbool}>{puertaAbierta ? 'Abierta' : 'Cerrada'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '45%',
    height: 80,
    borderRadius: 12,
    margin: 8,
    paddingLeft: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardEncendida: {
    backgroundColor: '#5A4FCF',
    shadowColor: '#FFD700',
    shadowOpacity: 0.4,
  },
  label: {
    marginLeft: 12,
  },
  textlabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  textbool: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
});
