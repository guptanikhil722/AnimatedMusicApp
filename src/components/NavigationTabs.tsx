import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface NavigationTabsProps {
  activeTab: 'music' | 'todo';
  onTabPress: (tab: 'music' | 'todo') => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'music' && styles.activeTab]}
        onPress={() => onTabPress('music')}
      >
        <Icon name="music-note" size={20} color={activeTab === 'music' ? 'white' : '#6c757d'} style={styles.tabIcon} />
        <Text style={[styles.tabText, activeTab === 'music' && styles.activeTabText]}>
          Music Player
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'todo' && styles.activeTab]}
        onPress={() => onTabPress('todo')}
      >
        <Icon name="check-circle" size={20} color={activeTab === 'todo' ? 'white' : '#6c757d'} style={styles.tabIcon} />
        <Text style={[styles.tabText, activeTab === 'todo' && styles.activeTabText]}>
          Todo Demo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#2655A3',
  },
  tabIcon: {
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  activeTabText: {
    color: 'white',
  },
});
