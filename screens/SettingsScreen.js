import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LightCategories = () => {
  const ipESP32 = "http://192.168.130.229";
  const lucesCasa = [
    {
      categoria: "Recámaras",
      luces: [
        { nombre: "Principal", ruta: "recamaraprincipal" },
        { nombre: "Secundaria", ruta: "recamarasecundaria" }
      ]
    },
    {
      categoria: "Área común",
      luces: [
        { nombre: "Sala", ruta: "sala" },
        { nombre: "Comedor", ruta: "comedor" },
        { nombre: "Cocina", ruta: "cocina" }
      ]
    },
    {
      categoria: "Baños",
      luces: [
        { nombre: "Principal", ruta: "banoprincipal" },
        { nombre: "Secundario", ruta: "banosecundario" },
        { nombre: "Visitas", ruta: "banovisitas" }
      ]
    },
    {
      categoria: "Vestidores",
      luces: [
        { nombre: "Principal", ruta: "vestidor" },
        { nombre: "Secundario", ruta: "vestidorsecundario" }
      ]
    }
  ];
  
  // Estado para guardar el estado de cada luz
  const [estadoLuces, setEstadoLuces] = useState(() => {
    const estados = {};
    lucesCasa.forEach(categoria => {
      categoria.luces.forEach(luz => {
        estados[luz.ruta] = false; // Todas las luces comienzan apagadas
      });
    });
    return estados;
  });
  
  const toggleLuz = async (ruta) => {
    const encendido = estadoLuces[ruta];
    const endpoint = encendido ? "/off" : "/on";
    
    try {
      const res = await fetch(`${ipESP32}/${ruta}${endpoint}`);
      const text = await res.text();
      setEstadoLuces(prev => ({ ...prev, [ruta]: !encendido }));
    } catch (error) {
      Alert.alert("Error", `No se pudo conectar al ESP32 para ${ruta}`);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={lucesCasa}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>
              {item.categoria} ({item.luces.length} luces)
            </Text>
            <View style={styles.lightsContainer}>
              {item.luces.map((luz, index) => {
                const encendido = estadoLuces[luz.ruta];
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.boton}
                    onPress={() => toggleLuz(luz.ruta)}
                  >
                    <Ionicons 
                      name={encendido ? "bulb" : "bulb-outline"} 
                      size={24} 
                      color={encendido ? '#ffc116' : 'black'} 
                    />
                    <Text style={styles.lightText}>{luz.nombre}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Tus estilos permanecen igual
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 40,
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 20,
    paddingTop: 20
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000'
  },
  lightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  boton: {
    width: '31%',
    height: 80,
    borderRadius: 50,
    margin: '1%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  lightText: {
    fontSize: 16,
    color: 'black', 
    fontWeight: '500',
    marginTop: 5
  }
});

export default LightCategories;