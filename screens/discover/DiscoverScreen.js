import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';


export default function DiscoverScreen({ navigation }) {
  return (
    <SafeAreaProvider>
    <ScrollView
    style={styles.container}
    showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>En casa con Miboh</Text>
      <Text style={styles.paragraph}>Explora funciones y accesorios diseñados para hacer tu hogar más cómodo, práctico y seguro.</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Start')}>
          <View style={styles.imageContainer}>
            <Image 
            source={require('../../assets/living-room.jpg')}
            style={styles.imageStart}
            />
          </View>
          <Text style={styles.label}>Empezar</Text>
          <Text style={styles.description}>Hogar inteligente, sin enredos. Todo funciona como debe.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Lighting')}>
          <View style={styles.imageContainer}>
            <Image 
            source={require('../../assets/lighting.jpg')}
            style={styles.imageLighting}
            />
          </View>
          <Text style={styles.label}>Iluminación</Text>
          <Text style={styles.description}>Automatiza tu casa según tus horarios y crea el ambiente perfecto controlando las luces e interruptores.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Security')}>
          <View style={styles.imageContainer}>
            <Image 
            source={require('../../assets/security.jpg')}
            style={styles.imageLighting}
            />
          </View>
          <Text style={styles.label}>Seguridad</Text>
          <Text style={styles.description}>Mantén siempre vigilado lo que más valoras con cámaras, timbres inteligentes y más.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Entrance')}>
          <View style={styles.imageContainer}>
            <Image 
            source={require('../../assets/entrance.jpg')}
            style={styles.imageLighting}
            />
          </View>
          <Text style={styles.label}>Entrada</Text>
          <Text style={styles.description}>Accede a tu hogar de forma segura usando llaves digitales y tus dispositivos inteligentes.</Text>
        </TouchableOpacity>
      </View>

      
    </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    marginTop: 80,
    fontWeight: '700',
    fontSize: 38
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 20,
    fontWeight: '300',
    fontSize: 18,
    color: 'gray'
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  imageStart: {
    width: 300,
    height: 150,
    margin: 50,
  },
  imageLighting: {
    width: 300,
    height: 270,
    margin: 50,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: 40,
    marginBottom: 10,
    fontSize: 32,
    fontWeight: '700'
  },
  description: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 40,
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  }
})