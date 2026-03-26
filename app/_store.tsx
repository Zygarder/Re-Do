import React, { createContext, useState, useContext } from 'react';

// FIX: We provide a default "empty" state here so it's never just 'null'
const TodoContext = createContext({
  todos: [],
  addTodo: (text) => {},
  toggleTodo: (id) => {},
  editTodo: (id, newText) => {},
});

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    // Basic validation to ensure we don't add empty tasks
    if (!text) return; 
    setTodos([...todos, { id: Date.now().toString(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);