import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationTabs } from '../components/NavigationTabs';
import { MusicPlayerScreen } from './MusicPlayerScreen';
import { TodoDemoScreen } from './TodoDemoScreen';

export const MainAppScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'music' | 'todo'>('music');

  return (
    <View style={styles.container}>
      <NavigationTabs activeTab={activeTab} onTabPress={setActiveTab} />
      
      {activeTab === 'music' ? <MusicPlayerScreen /> : <TodoDemoScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
