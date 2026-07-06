import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { colors, typography } from '@/shared/theme';
import {
  getPasswordStrength,
  STRENGTH_COLORS,
  STRENGTH_LABELS,
} from '@/shared/utils/password';

type PasswordStrengthBarProps = {
  password: string;
};

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  if (!password) return null;

  const strength = getPasswordStrength(password);
  const color = STRENGTH_COLORS[strength];
  const label = STRENGTH_LABELS[strength];

  return (
    <View style={styles.container}>
      <View style={styles.bars}>
        {[1, 2, 3].map((i) => (
          <StrengthBar key={i} filled={strength >= i} color={color} />
        ))}
      </View>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

function StrengthBar({ filled, color }: { filled: boolean; color: string }) {
  const barStyle = useAnimatedStyle(() => ({
    width: withTiming(filled ? '100%' : '0%', { duration: 300 }),
  }));

  return (
    <View style={styles.barTrack}>
      <Animated.View style={[styles.barFill, { backgroundColor: color }, barStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  bars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  barTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.secondary,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  label: {
    ...typography.label,
    fontSize: 12,
  },
});
