import { Eye, EyeOff } from 'lucide-react-native';
import { ReactNode, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { borderRadius, colors, spacing, typography } from '@/shared/theme';

type InputProps = TextInputProps & {
  label: string;
  icon?: ReactNode;
  error?: boolean;
};

export function Input({ label, icon, error, secureTextEntry, style, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="rgba(120, 217, 156, 0.5)"
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
            {showPassword ? (
              <EyeOff size={15} color={colors.mutedForeground} />
            ) : (
              <Eye size={15} color={colors.mutedForeground} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    ...typography.label,
    color: colors.mutedForeground,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  inputError: {
    borderColor: colors.destructive,
  },
  icon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.foreground,
    padding: 0,
    height: 36,
  },
});
