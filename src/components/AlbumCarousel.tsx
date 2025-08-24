import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.7;
const ITEM_SPACING = 20;
const CENTER_OFFSET = (screenWidth - ITEM_WIDTH) / 2;

interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  description: string;
}

interface AlbumCarouselProps {
  albums: Album[];
}

export const AlbumCarousel: React.FC<AlbumCarouselProps> = ({ albums }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(Math.floor(albums.length / 2));
  const [isPlaying, setIsPlaying] = useState(false);

  // Shared value for Reanimated
  const progress = useSharedValue(Math.floor(albums.length / 2));

  useEffect(() => {
    progress.value = withSpring(currentIndex);
  }, [currentIndex]);

  // Scroll to center item on mount
  useEffect(() => {
    const centerIndex = Math.floor(albums.length / 2);
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: centerIndex * (ITEM_WIDTH + ITEM_SPACING),
        animated: false,
      });
    }, 100);
  }, [albums.length]);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (ITEM_WIDTH + ITEM_SPACING));
    
    // Update both state and progress for smooth animations
    setCurrentIndex(index);
    progress.value = index;
  };

  const handlePrevious = () => {
    let newIndex = currentIndex - 1;
    
    // Loop to last item if at first
    if (newIndex < 0) {
      newIndex = albums.length - 1;
    }
    
    setCurrentIndex(newIndex);
    scrollViewRef.current?.scrollTo({
      x: newIndex * (ITEM_WIDTH + ITEM_SPACING),
      animated: true,
    });
  };

  const handleNext = () => {
    let newIndex = currentIndex + 1;
    
    // Loop to first item if at last
    if (newIndex >= albums.length) {
      newIndex = 0;
    }
    
    setCurrentIndex(newIndex);
    scrollViewRef.current?.scrollTo({
      x: newIndex * (ITEM_WIDTH + ITEM_SPACING),
      animated: true,
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderAlbumItem = (album: Album, index: number) => {
    const animatedStyle = useAnimatedStyle(() => {
      // Calculate the distance from center
      const distanceFromCenter = Math.abs(progress.value - index);
      
      // Calculate the angle position for circular motion
      const angle = (progress.value - index) * (Math.PI / 4); // 45 degrees per step
      
      // Scale: center item = 1, side items scale down more dramatically
      const scale = interpolate(
        distanceFromCenter,
        [0, 1, 2, 3],
        [1, 0.75, 0.5, 0.3],
        'clamp'
      );

      // Opacity: center item = 1, side items fade out more dramatically
      const opacity = interpolate(
        distanceFromCenter,
        [0, 1, 2, 3],
        [1, 0.6, 0.3, 0.1],
        'clamp'
      );

      // Rotation: side items rotate to follow the circular path
      const rotation = interpolate(
        progress.value - index,
        [-3, -2, -1, 0, 1, 2, 3],
        [-25, -15, -8, 0, 8, 15, 25],
        'clamp'
      );

      // Z-index for 3D effect
      const zIndex = interpolate(
        distanceFromCenter,
        [0, 1, 2, 3],
        [1000, 100, 10, 1],
        'clamp'
      );

      // Circular motion: X and Y translations follow an arc
      const radius = 120; // Radius of the circular path
      const translateX = Math.sin(angle) * radius;
      const translateY = (Math.cos(angle) - 1) * radius * 0.5; // Flatten the circle slightly

      return {
        transform: [
          { scale },
          { rotateY: `${rotation}deg` },
          { translateX },
          { translateY },
        ],
        opacity,
        zIndex: Math.round(zIndex),
      };
    });

    return (
      <Animated.View
        key={album.id}
        style={[
          styles.albumItem,
          { marginLeft: index === 0 ? CENTER_OFFSET : 0 },
          animatedStyle,
        ]}
      >
        <View style={styles.albumCover}>
          <Image 
            source={{ 
              uri: `https://picsum.photos/300/300?random=${album.id}` 
            }} 
            style={styles.albumImage}
            resizeMode="cover"
          />
          <View style={styles.albumOverlay}>
            <Text style={styles.albumTitle}>{album.title}</Text>
            <Text style={styles.albumArtist}>{album.artist}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH + ITEM_SPACING}
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          {albums.map((album, index) => renderAlbumItem(album, index))}
        </ScrollView>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handlePrevious}
        >
          <Icon name="skip-previous" size={24} color="#2c3e50" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Icon 
            name={isPlaying ? 'pause' : 'play-arrow'} 
            size={32} 
            color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleNext}
        >
          <Icon name="skip-next" size={24} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          {albums[currentIndex]?.description || 'No description available'}
        </Text>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  carouselContainer: {
    paddingVertical: 40,
    justifyContent: 'center',
    // Add perspective for 3D effect
    transform: [{ perspective: 1000 }],
  },
  scrollContent: {
    paddingRight: CENTER_OFFSET,
  },
  albumItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    marginRight: ITEM_SPACING,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumCover: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
    // Add border for better definition
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  albumImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  albumOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  albumArtist: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    gap: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2655A3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  descriptionContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  descriptionText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
});
