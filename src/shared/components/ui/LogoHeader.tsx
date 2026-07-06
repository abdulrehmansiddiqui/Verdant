import { StyleSheet, Text, View } from 'react-native';

import { colors, shadows, borderRadius, typography } from '@/shared/theme';

type LogoHeaderProps = {
  size?: 'sm' | 'md';
};

export function LogoHeader({ size = 'md' }: LogoHeaderProps) {
  const isSmall = size === 'sm';

  return (
    <View style={styles.container}>
      <View style={[styles.logoBox, isSmall && styles.logoBoxSm, shadows.logoGlow]}>
        <Text style={[styles.logoLetter, isSmall && styles.logoLetterSm]}>V</Text>
      </View>
      <Text style={[styles.brand, isSmall && styles.brandSm]}>VERDANT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.overlay,
    borderWidth: 1,
    borderColor: colors.primaryBorderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoBoxSm: {
    width: 56,
    height: 56,
  },
  logoLetter: {
    ...typography.displayMedium,
    fontSize: 24,
    color: colors.primary,
  },
  logoLetterSm: {
    fontSize: 22,
  },
  brand: {
    ...typography.title,
    fontSize: 18,
    color: colors.foreground,
    letterSpacing: 2,
  },
  brandSm: {
    fontSize: 16,
  },
});
