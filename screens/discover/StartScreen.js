import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function StartScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.fixedButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.icon}>
            <Ionicons name="close" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          <Text style={styles.title}>Empezar</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    marginTop: 35,
  },
  content: {
    paddingTop: 60, 
  },
  title: {
    color: '000',
  },
  fixedButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    zIndex: 1,
    marginTop: 20,
  },
  icon: {
    padding: 5,
    backgroundColor: '#9E9E9E',
    borderRadius: 50,
  },
});