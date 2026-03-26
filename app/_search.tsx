import { useTodos } from '@/context/_todo-context';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchScreen() {
  const router = useRouter();
  const { todos, categories, toggleTodo } = useTodos();
  const [query, setQuery] = useState('');

  const results = todos.filter(t => !t.isDeleted && t.text.toLowerCase().includes(query.toLowerCase()));
  const getCategory = (catId?: string) => categories.find(c => c.id === catId);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput style={styles.input} placeholder="Search tasks..." placeholderTextColor="#888" value={query} onChangeText={setQuery} autoFocus />
          {query.length > 0 && <TouchableOpacity onPress={() => setQuery('')}><Ionicons name="close-circle" size={20} color="#888" /></TouchableOpacity>}
        </View>
      </View>

      <FlatList
        data={query.length > 0 ? results : []}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>{query.length > 0 ? "No results found." : "Type to search..."}</Text>
        }
        renderItem={({ item }) => {
          const cat = getCategory(item.categoryId);
          return (
            <TouchableOpacity onPress={() => toggleTodo(item.id)} style={styles.resultItem}>
              <Ionicons name={item.completed ? "checkmark-circle" : "ellipse-outline"} size={24} color={item.completed ? "#4CAF50" : "#888"} />
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={[styles.text, item.completed && { textDecorationLine: 'line-through', color: '#666' }]}>{item.text}</Text>
                {cat && (
                  <View style={styles.tagBadge}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: cat.color }} />
                    <Text style={{ fontSize: 10, color: '#aaa' }}>{cat.name}</Text>
                  </View>
                )}
              </View>
              <Text style={{ fontSize: 10, color: item.completed ? '#4CAF50' : '#FFD700' }}>{item.completed ? "Done" : "Pending"}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 15, marginBottom: 10 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 10, paddingHorizontal: 10, height: 45, gap: 10 },
  input: { flex: 1, color: '#fff', fontSize: 16 },
  resultItem: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#111', borderRadius: 10, marginBottom: 10, gap: 12 },
  text: { fontSize: 16, color: 'white' },
  tagBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 }
});