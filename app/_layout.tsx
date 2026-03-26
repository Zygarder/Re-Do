import { TodoProvider } from '@/context/_todo-context';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <TodoProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </TodoProvider>
  );
}