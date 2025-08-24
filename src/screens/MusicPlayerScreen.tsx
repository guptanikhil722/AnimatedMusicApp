import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { sampleAlbums } from '../data/sampleAlbums';
import { AlbumCarousel } from '../components/AlbumCarousel';

export const MusicPlayerScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Music Player</Text>
        <Text style={styles.subtitle}>Discover your next favorite album</Text>
      </View>
      
      <AlbumCarousel albums={sampleAlbums} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2655A3',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});
