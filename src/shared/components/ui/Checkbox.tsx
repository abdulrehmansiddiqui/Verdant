import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';

import { colors, spacing, borderRadius, typography } from '@/shared/theme';

type CheckboxProps = {
  checked: boolean;
  onToggle: () => void;
  label: React.ReactNode;
};

export function Checkbox({ checked, onToggle, label }: CheckboxProps) {
  return (
    <Pressable style={styles.container} onPress={onToggle}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <Check size={12} color={colors.primaryForeground} />}
      </View>
      {typeof label === 'string' ? (
        <Text style={labelStyles.text}>{label}</Text>
      ) : (
        label
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  boxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

export function CheckboxLabel({ children }: { children: React.ReactNode }) {
  return <Text style={labelStyles.text}>{children}</Text>;
}

const labelStyles = StyleSheet.create({
  text: {
    ...typography.bodySmall,
    color: colors.mutedForeground,
    lineHeight: 18,
  },
});

export function CheckboxLink({ children }: { children: string }) {
  return <Text style={linkStyles.text}>{children}</Text>;
}

const linkStyles = StyleSheet.create({
  text: {
    color: colors.primary,
  },
});
