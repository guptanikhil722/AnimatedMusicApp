import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TodoItemProps {
  id: string;
  text: string;
  onComplete?: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ id, text, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Animation values
  const checkboxProgress = useSharedValue(0);
  const checkmarkProgress = useSharedValue(0);
  const strikeThroughProgress = useSharedValue(0);
  const cardScale = useSharedValue(1);
  const cardTranslateY = useSharedValue(0);
  const confettiOpacity = useSharedValue(0);
  const confettiScale = useSharedValue(0);

  // Animated styles
  const checkboxAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: checkboxProgress.value === 1 ? '#2655A3' : 'transparent',
  }));

  const checkmarkAnimatedStyle = useAnimatedStyle(() => ({
    opacity: checkmarkProgress.value,
    transform: [{ scale: checkmarkProgress.value === 1 ? 1 : 0.5 }],
  }));

  const strikeThroughAnimatedStyle = useAnimatedStyle(() => ({
    width: `${strikeThroughProgress.value * 100}%`,
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: cardScale.value },
      { translateY: cardTranslateY.value },
    ],
  }));

  const confettiAnimatedStyle = useAnimatedStyle(() => ({
    opacity: confettiOpacity.value,
    transform: [{ scale: confettiScale.value }],
  }));

  const handleComplete = useCallback(() => {
    if (isCompleted) {
      // Reset animations when unchecking
      checkboxProgress.value = withTiming(0, { duration: 200 });
      checkmarkProgress.value = withTiming(0, { duration: 200 });
      strikeThroughProgress.value = withTiming(0, { duration: 200 });
      setIsCompleted(false);
      onComplete?.(id);
      return;
    }
    
    console.log('TodoItem: Starting animations for id:', id);
    
    // Start animation sequence
    checkboxProgress.value = withTiming(1, { duration: 300 });
    
    // Draw checkmark after checkbox fills
    checkmarkProgress.value = withDelay(150, withTiming(1, { duration: 200 }));
    
    // Strike-through animation
    strikeThroughProgress.value = withDelay(200, withTiming(1, { duration: 250 }));
    
    // Card bounce and lift animation
    cardScale.value = withSequence(
      withSpring(1.05, { damping: 8, stiffness: 300 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    );
    
    cardTranslateY.value = withSequence(
      withSpring(-8, { damping: 8, stiffness: 300 }),
      withSpring(0, { damping: 15, stiffness: 300 })
    );
    
    // Confetti burst
    confettiOpacity.value = withSequence(
      withTiming(1, { duration: 100 }),
      withDelay(200, withTiming(0, { duration: 300 }))
    );
    
    confettiScale.value = withSequence(
      withSpring(1.2, { damping: 8, stiffness: 300 }),
      withSpring(0, { damping: 15, stiffness: 300 })
    );

    // Update state after animations start
    setTimeout(() => {
      setIsCompleted(true);
      onComplete?.(id);
    }, 100);
  }, [isCompleted, id, onComplete]);

  return (
    <Animated.View style={[styles.container, cardAnimatedStyle]}>
      <TouchableOpacity
        style={styles.todoItem}
        onPress={handleComplete}
        activeOpacity={0.8}
      >
        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <Animated.View style={[styles.checkbox, checkboxAnimatedStyle]}>
            <Animated.View style={checkmarkAnimatedStyle}>
              <Icon name="check" size={20} color="white" />
            </Animated.View>
          </Animated.View>
          
          {/* Confetti burst */}
          <Animated.View style={[styles.confettiContainer, confettiAnimatedStyle]}>
            {[...Array(8)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.confettiPiece,
                  {
                    backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][index % 5],
                    transform: [
                      { rotate: `${(index * 45)}deg` },
                      { translateX: Math.cos((index * 45) * Math.PI / 180) * 30 },
                      { translateY: Math.sin((index * 45) * Math.PI / 180) * 30 },
                    ],
                  },
                ]}
              />
            ))}
          </Animated.View>
        </View>

        {/* Task text */}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.taskText,
              isCompleted && styles.completedTaskText,
            ]}
          >
            {text}
          </Text>
          
          {/* Animated strike-through line */}
          <Animated.View
            style={[styles.strikeThrough, strikeThroughAnimatedStyle]}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  checkboxContainer: {
    position: 'relative',
    marginRight: 16,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#2655A3',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textContainer: {
    flex: 1,
    position: 'relative',
  },
  taskText: {
    fontSize: 12,
    color: '#000000',
    lineHeight: 22,
  },
  completedTaskText: {
    color: '#95a5a6',
  },
  strikeThrough: {
    position: 'absolute',
    top: '50%',
    left: 0,
    height: 2,
    backgroundColor: '#95a5a6',
    borderRadius: 1,
  },
  confettiContainer: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confettiPiece: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
