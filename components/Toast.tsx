import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

export function Toast({ message, onHide }: { message: string, onHide: () => void }) {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true })
    ]).start(() => onHide());
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: 100, alignSelf: 'center', backgroundColor: '#333', padding: 15, borderRadius: 25, elevation: 5 },
  text: { color: 'white', fontWeight: 'bold' }
});