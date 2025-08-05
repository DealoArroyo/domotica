import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';

export default function LightsScreen() {
  const ipESP32 = "http://192.168.0.33"; // Cambia esto a tu IP
  const luces = [
    { nombre: "Cocina", ruta: "cocina" },
    { nombre: "Comedor", ruta: "comedor" },
    { nombre: "Sala", ruta: "sala" },
    { nombre: "Baño Principal", ruta: "banoprincipal" },
    { nombre: "Vestidor", ruta: "vestidor" },
    { nombre: "Recámara Secundaria", ruta: "recamarasecundaria" },
    { nombre: "Vestidor Secundario", ruta: "vestidorsecundario" },
    { nombre: "Baño Secundario", ruta: "banosecundario" },
    { nombre: "Recámara principal", ruta: "recamaraprincipal" },
    { nombre: "Baño Visitas", ruta: "banovisitas" },
  ];

  const [estadoLuces, setEstadoLuces] = useState(
    Object.fromEntries(luces.map(l => [l.ruta, false]))
  );

  const toggleLuz = async (ruta) => {
    const encendido = estadoLuces[ruta];
    const endpoint = encendido ? "/off" : "/on";

    try {
      const res = await fetch(`${ipESP32}/${ruta}${endpoint}`);
      const text = await res.text();
      setEstadoLuces({ ...estadoLuces, [ruta]: !encendido });
    } catch (error) {
      Alert.alert("Error", `No se pudo conectar al ESP32 para ${ruta}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {luces.map((luz) => (
        <TouchableOpacity key={luz.ruta} style={styles.boton} onPress={() => toggleLuz(luz.ruta)}>
        <View>
              <View style={styles.label}>
                <Text>{luz.nombre}</Text>
                <Text>{estadoLuces[luz.ruta] ? "Apagar" : "Encender"}</Text>
              </View>
        </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boton: {
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
});