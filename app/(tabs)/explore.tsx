import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTodos } from '../../context/_todo-context'; // Import the brain
import Fontisto from '@expo/vector-icons/Fontisto';

export default function TabTwoScreen() {
  const { todos, toggleTodo } = useTodos();
  
  // Filter for COMPLETED tasks
  const completedTodos = todos.filter(t => t.completed);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Fontisto name="checkbox-active" size={250} style={styles.headerImage} />}>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Completed Tasks</ThemedText>
      </ThemedView>
      
      <ThemedText>Great job! Here is what you have finished:</ThemedText>

      <View style={styles.listContainer}>
        {completedTodos.length === 0 ? (
          <ThemedText style={{opacity: 0.5, marginTop: 20}}>No finished tasks yet.</ThemedText>
        ) : (
          completedTodos.map((item) => (
            <View key={item.id} style={styles.taskItem}>
              {/* Clicking this moves it back to the active list */}
              <TouchableOpacity onPress={() => toggleTodo(item.id)}>
                <Ionicons name="checkbox" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <ThemedText style={[styles.taskText, styles.strikethrough]}>
                {item.text}
              </ThemedText>
            </View>
          ))
        )}
      </View>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: { color: '#808080', bottom: -90, left: -35, position: 'absolute' },
  titleContainer: { flexDirection: 'row', gap: 8 },
  listContainer: { marginTop: 20, gap: 10 },
  taskItem: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#232323', borderRadius: 10, gap: 12, opacity: 0.7 },
  taskText: { fontSize: 16 },
  strikethrough: { textDecorationLine: 'line-through', color: '#888' },
});