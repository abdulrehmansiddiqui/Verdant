import { ArrowRight } from 'lucide-react-native';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, shadows, spacing, typography } from '@/shared/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = Omit<PressableProps, 'style'> & {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  showArrow?: boolean;
  fullWidth?: boolean;
  style?: PressableProps['style'];
};

export function Button({
  title,
  variant = 'primary',
  loading = false,
  showArrow = false,
  fullWidth = true,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      style={(state) => {
        const userStyle = typeof style === 'function' ? style(state) : style;
        const { pressed } = state;
        return [
          styles.base,
          fullWidth && styles.fullWidth,
          isPrimary && styles.primary,
          isSecondary && styles.secondary,
          variant === 'ghost' && styles.ghost,
          (disabled || loading) && styles.disabled,
          pressed && !disabled && !loading && styles.pressed,
          userStyle,
        ];
      }}
      disabled={disabled || loading}
      {...props}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.primaryForeground : colors.foreground} />
      ) : (
        <View style={styles.content}>
          <Text
            style={[
              styles.text,
              isPrimary && styles.primaryText,
              isSecondary && styles.secondaryText,
              variant === 'ghost' && styles.ghostText,
            ]}>
            {title}
          </Text>
          {showArrow && (
            <ArrowRight size={18} color={isPrimary ? colors.primaryForeground : colors.mutedForeground} />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: 20,
    minHeight: 56,
    height: 76,
  },
  fullWidth: {
    width: '100%',
  },
  primary: {
    backgroundColor: colors.primary,
    ...shadows.primaryGlowSmall,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  text: {
    ...typography.button,
    textTransform: 'uppercase',
  },
  primaryText: {
    color: colors.primaryForeground,
  },
  secondaryText: {
    color: colors.mutedForeground,
    ...typography.body,
    fontFamily: typography.body.fontFamily,
    textTransform: 'none',
    fontWeight: '600',
  },
  ghostText: {
    color: colors.mutedForeground,
    ...typography.bodySmall,
    textTransform: 'none',
    fontWeight: '600',
  },
});
