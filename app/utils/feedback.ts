import * as Haptics from 'expo-haptics';

export const triggerHaptic = (style: 'Light' | 'Medium' | 'Heavy') => {
  switch (style) {
    case 'Light': Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); break;
    case 'Medium': Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); break;
    case 'Heavy': Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); break;
  }
};