import { useTodos } from '@/context/_todo-context';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BinScreen() {
  const { todos, restoreTodo, deleteForever } = useTodos();

  // FILTER: Only show tasks that are in the bin
  const deletedTodos = todos.filter(t => t.isDeleted);

  return (
    <View style={styles.container}>
      {/* Configure the header for this screen */}
      <Stack.Screen options={{ title: 'Recycle Bin', headerStyle: { backgroundColor: '#111' }, headerTintColor: '#fff' }} />
      
      <FlatList
        data={deletedTodos}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={<Text style={{ color: '#666', textAlign: 'center', marginTop: 20 }}>The bin is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>
            
            {/* ACTION BUTTONS */}
            <View style={{ flexDirection: 'row', gap: 15 }}>
              <TouchableOpacity onPress={() => restoreTodo(item.id)}>
                <Ionicons name="refresh" size={24} color="#4facfe" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteForever(item.id)}>
                <Ionicons name="trash" size={24} color="#FF5252" />
              </TouchableOpacity>
            </View>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  taskItem: { flexDirection: "row", alignItems: "center", justifyContent: 'space-between', padding: 15, backgroundColor: "#1A1A1A", borderRadius: 10, marginBottom: 10 },
  taskText: { fontSize: 16, color: '#888', textDecorationLine: 'line-through', flex: 1 },
});