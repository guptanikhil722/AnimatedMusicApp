import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { TodoItem } from '../components/TodoItem';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoDemoScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Complete the album carousel implementation', completed: false },
    { id: '2', text: 'Add smooth animations to the music player', completed: false },
    { id: '3', text: 'Implement the todo item with confetti burst', completed: false },
    { id: '4', text: 'Test all animations at 60 FPS', completed: false },
    { id: '5', text: 'Polish the UI and add final touches', completed: false },
    { id: '6', text: 'Prepare for demo and presentation', completed: false },
  ]);

  const handleTaskComplete = (taskId: string) => {
    console.log(`Task ${taskId} completed!`)
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  console.log('TodoDemoScreen: Rendering tasks:', tasks);
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Task Manager</Text>
        <Text style={styles.footerText}>
          Tap any task to mark it complete and see the animations!
        </Text>
        <Text style={styles.subtitle}>
          {completedCount} of {totalCount} tasks completed
        </Text>
      </View>

      <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            id={task.id}
            text={task.text}
            onComplete={handleTaskComplete}
          />
        ))}
      </ScrollView>
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
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
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
  taskList: {
    flex: 1,
    paddingTop: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
