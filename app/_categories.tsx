import { useTodos } from '@/context/_todo-context';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CategoryScreen() {
  const { categories, todos, addCategory, deleteCategory } = useTodos();
  const [newCatName, setNewCatName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A8', '#33FFF5'];

  const handleAdd = () => {
    if (!newCatName) return;
    addCategory(newCatName, colors[Math.floor(Math.random() * colors.length)]);
    setNewCatName(''); setIsAdding(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Manage Categories', headerStyle: { backgroundColor: '#111' }, headerTintColor: '#fff' }} />
      <FlatList data={categories} keyExtractor={item => item.id} numColumns={2} renderItem={({ item }) => {
          const count = todos.filter(t => t.categoryId === item.id && !t.completed && !t.isDeleted).length;
          return (
            <View style={[styles.card, { borderLeftColor: item.color }]}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>{item.name}</Text>
                <TouchableOpacity onPress={() => deleteCategory(item.id)}><Ionicons name="close" size={16} color="#666" /></TouchableOpacity>
              </View>
              <Text style={{fontSize: 12, color: '#888', marginTop: 5}}>{count} tasks</Text>
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.fab} onPress={() => setIsAdding(true)}><Ionicons name="add" size={30} color="white" /></TouchableOpacity>
      <Modal visible={isAdding} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>New Category</Text>
            <TextInput style={styles.input} placeholder="Category Name" placeholderTextColor="#666" value={newCatName} onChangeText={setNewCatName} />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setIsAdding(false)}><Text style={{color: 'white'}}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleAdd}><Text style={{color: '#4facfe'}}>Create</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 10 },
  card: { flex: 1, backgroundColor: '#1A1A1A', margin: 8, padding: 15, borderRadius: 12, borderLeftWidth: 5, minHeight: 100, justifyContent: 'space-between' },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#4facfe', width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#222', padding: 20, borderRadius: 15, gap: 15 },
  input: { backgroundColor: '#333', color: '#fff', padding: 10, borderRadius: 8 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20, marginTop: 10 }
});