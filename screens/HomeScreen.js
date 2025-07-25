import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import LivingRoomLight from './accessDirect/HomeDirect';

export default function HomeScreen({ navigation }) {
  return (
    <>
    <StatusBar style='dark' />
    <Text style={styles.title}>Mi casa</Text>

    <LivingRoomLight />

    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Lights')}>
        <Ionicons name="bulb-outline" size={32} color="#ffc116" />
        <Text style={styles.label}>Luces</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Sensors')}>
        <MaterialIcons name="sensors" size={32} color="#0062b5" />
        <Text style={styles.label}>Sensores</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Camera')}>
        <FontAwesome5 name="camera" size={28} color="#828282" />
        <Text style={styles.label}>Cámara</Text>
      </TouchableOpacity>

    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    color: 'dark',
    fontWeight: '700',
    backgroundColor: '#F0F0F0',
    textAlign: 'left',
    paddingTop: 80,
    margin: 10,
    marginLeft: 55
  },
  card: {
    width: 150,
    height: 120,
    borderStyle: 'solid',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'dark',
    fontSize: 18,
    marginTop: 8,
  },
});