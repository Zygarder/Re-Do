import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Category = { id: string; name: string; color: string; };
type TodoItem = { id: string; text: string; completed: boolean; isDeleted?: boolean; categoryId?: string; };

const TodoContext = createContext({
  todos: [] as TodoItem[], categories: [] as Category[],
  addTodo: (text: string) => {}, toggleTodo: (id: string) => {},
  updateTodo: (id: string, newText: string) => {}, moveToBin: (id: string) => {},
  restoreTodo: (id: string) => {}, deleteForever: (id: string) => {},
  addCategory: (name: string, color: string) => {}, deleteCategory: (id: string) => {},
  assignCategory: (todoId: string, categoryId: string | null) => {},
});

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Work", color: "#4facfe" },
    { id: "2", name: "Personal", color: "#00f2fe" },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem("my-todo-list");
        const savedCats = await AsyncStorage.getItem("my-categories");
        if (savedTodos) setTodos(JSON.parse(savedTodos));
        if (savedCats) setCategories(JSON.parse(savedCats));
      } catch (e) { console.error(e); } finally { setIsLoaded(true); }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem("my-todo-list", JSON.stringify(todos));
      AsyncStorage.setItem("my-categories", JSON.stringify(categories));
    }
  }, [todos, categories, isLoaded]);

  const addTodo = (text: string) => { if (text.trim()) setTodos([...todos, { id: Date.now().toString(), text, completed: false, isDeleted: false }]); };
  const toggleTodo = (id: string) => setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const updateTodo = (id: string, newText: string) => setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t));
  const moveToBin = (id: string) => setTodos(todos.map(t => t.id === id ? { ...t, isDeleted: true } : t));
  const restoreTodo = (id: string) => setTodos(todos.map(t => t.id === id ? { ...t, isDeleted: false } : t));
  const deleteForever = (id: string) => setTodos(todos.filter(t => t.id !== id));

  const addCategory = (name: string, color: string) => setCategories([...categories, { id: Date.now().toString(), name, color }]);
  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    setTodos(todos.map(t => t.categoryId === id ? { ...t, categoryId: undefined } : t));
  };
  const assignCategory = (todoId: string, categoryId: string | null) => setTodos(todos.map(t => t.id === todoId ? { ...t, categoryId: categoryId || undefined } : t));

  return (
    <TodoContext.Provider value={{ todos, categories, addTodo, toggleTodo, updateTodo, moveToBin, restoreTodo, deleteForever, addCategory, deleteCategory, assignCategory }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);