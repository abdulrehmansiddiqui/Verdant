import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/shared/theme';

type ProgressDotsProps = {
  count: number;
  activeIndex: number;
  onDotPress?: (index: number) => void;
};

export function ProgressDots({ count, activeIndex, onDotPress }: ProgressDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <Pressable key={i} onPress={() => onDotPress?.(i)}>
          <View style={[styles.dot, i === activeIndex ? styles.activeDot : styles.inactiveDot]} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: spacing.xl,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: colors.secondary,
  },
});
