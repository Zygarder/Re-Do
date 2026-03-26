import { triggerHaptic } from "@/app/utils/feedback";
import CategoryPicker from "@/components/CategoryPicker";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Toast } from "@/components/Toast";
import { useTodos } from "@/context/_todo-context";
import { Ionicons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    moveToBin,
    categories,
    assignCategory,
  } = useTodos();
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const activeTodos = todos.filter((t) => !t.completed && !t.isDeleted);

  const handleAdd = () => {
    if (inputText.trim()) {
      addTodo(inputText);
      setInputText("");
    }
  };
  const startEditing = (id: string, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };
  const saveEdit = () => {
    if (editingId) {
      updateTodo(editingId, editText);
      setEditingId(null);
    }
  };
  const handleMoveToBin = (id: string) => {
    triggerHaptic("Heavy");
    moveToBin(id);
    setToastMsg("Moved to Bin");
  };
  const openPicker = (taskId: string) => {
    setSelectedTaskId(taskId);
    setPickerVisible(true);
  };
  const handleSelectCategory = (catId: string | null) => {
    if (selectedTaskId) assignCategory(selectedTaskId, catId);
    setPickerVisible(false);
  };
  const getCatColor = (catId?: string) => {
    const cat = categories.find((c) => c.id === catId);
    return cat ? cat.color : "transparent";
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <Fontisto
            name="checkbox-passive"
            size={250}
            style={styles.headerImage}
          />
        }
      >
        <View style={styles.titleContainer}>
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "white" }}>
            To-Do List:
          </Text>

          <View style={{ flexDirection: "row", gap: 15 }}>
            {/* NEW: Link to the Bin */}
            <Link href="/bin" asChild>
              <TouchableOpacity>
                <Ionicons name="trash-bin" size={24} color="#FF5252" />
              </TouchableOpacity>
            </Link>

            {/* Existing Links */}
            <Link href="/_search" asChild>
              <TouchableOpacity>
                <Ionicons name="search" size={24} color="#A1CEDC" />
              </TouchableOpacity>
            </Link>
            <Link href="/_categories" asChild>
              <TouchableOpacity>
                <Ionicons name="grid" size={24} color="#A1CEDC" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task..."
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity onPress={handleAdd}>
            <Ionicons name="add-circle" size={48} color="#A1CEDC" />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {activeTodos.map((item) => (
            <View key={item.id} style={styles.taskItem}>
              <TouchableOpacity onPress={() => toggleTodo(item.id)}>
                <Ionicons name="square-outline" size={24} color="#aaa" />
              </TouchableOpacity>
              {editingId === item.id ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={styles.editInput}
                    value={editText}
                    onChangeText={setEditText}
                    autoFocus
                  />
                  <TouchableOpacity onPress={saveEdit}>
                    <Ionicons name="checkmark" size={24} color="#4CAF50" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                  onPress={() => startEditing(item.id, item.text)}
                >
                  {item.categoryId && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: getCatColor(item.categoryId),
                      }}
                    />
                  )}
                  <Text style={styles.taskText}>{item.text}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => openPicker(item.id)}
                style={{ padding: 5 }}
              >
                <Ionicons
                  name={item.categoryId ? "pricetag" : "pricetag-outline"}
                  size={20}
                  color={
                    item.categoryId ? getCatColor(item.categoryId) : "#666"
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoveToBin(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#FF5252" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ParallaxScrollView>
      {toastMsg && (
        <Toast message={toastMsg} onHide={() => setToastMsg(null)} />
      )}
      <CategoryPicker
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={handleSelectCategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    color: "#FFFFFF",
    backgroundColor: "#333",
  },
  listContainer: { gap: 10 },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    gap: 12,
  },
  taskText: { fontSize: 16, color: "white" },
  editInput: {
    flex: 1,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#A1CEDC",
    marginHorizontal: 10,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
