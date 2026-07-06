import { Pressable, StyleSheet, Text } from 'react-native';

import { borderRadius, colors, spacing, typography } from '@/shared/theme';

type SocialButtonProps = {
  label: string;
  onPress?: () => void;
};

export function SocialButton({ label, onPress }: SocialButtonProps) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    height: 66,
  },
  pressed: {
    backgroundColor: colors.secondary,
  },
  label: {
    ...typography.title,
    fontSize: 16,
    color: colors.foreground,
  },
});
