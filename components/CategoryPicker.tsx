import { useTodos } from '@/context/_todo-context';
import React from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CategoryPicker({ visible, onClose, onSelect }: any) {
  const { categories } = useTodos();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.popup}>
          <Text style={{color: 'white', fontSize: 18, marginBottom: 10, fontWeight: 'bold'}}>Assign Tag</Text>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => onSelect(item.id)}>
                <View style={[styles.dot, { backgroundColor: item.color }]} />
                <Text style={{color: 'white'}}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <TouchableOpacity style={styles.item} onPress={() => onSelect(null)}>
                <View style={[styles.dot, { backgroundColor: '#555' }]} />
                <Text style={{color: '#888'}}>No Category</Text>
              </TouchableOpacity>
            }
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 40 },
  popup: { backgroundColor: '#222', borderRadius: 15, padding: 20, maxHeight: 400 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#333', gap: 10 },
  dot: { width: 12, height: 12, borderRadius: 6 }
});