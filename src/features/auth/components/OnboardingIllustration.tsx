import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Line, Path, Polyline } from 'react-native-svg';
import { Check, Zap } from 'lucide-react-native';

import { colors, borderRadius, typography } from '@/shared/theme';

type IllustrationProps = {
  type: 'instant' | 'rates' | 'security';
};

export function OnboardingIllustration({ type }: IllustrationProps) {
  if (type === 'instant') return <InstantLoansIllustration />;
  if (type === 'rates') return <SmartRatesIllustration />;
  return <SecurityIllustration />;
}

function InstantLoansIllustration() {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, [scale]);

  const centerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const orbitCards = [
    { icon: '$', label: '12K', style: { top: 15, right: 10 } },
    { icon: '%', label: '5.9', style: { bottom: 15, left: 10 } },
    { icon: '✓', label: '60s', style: { bottom: 15, right: 10 } },
  ];

  return (
    <View style={styles.illustrationContainer}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={[
            styles.pulseRing,
            { transform: [{ scale: 1 + i * 0.15 }] },
          ]}
        />
      ))}
      <Animated.View style={[styles.centerIcon, centerStyle]}>
        <Zap size={40} color={colors.primary} />
      </Animated.View>
      {orbitCards.map((card) => (
        <View key={card.label} style={[styles.orbitCard, card.style]}>
          <Text style={styles.orbitIcon}>{card.icon}</Text>
          <Text style={styles.orbitLabel}>{card.label}</Text>
        </View>
      ))}
    </View>
  );
}

function SmartRatesIllustration() {
  return (
    <View style={styles.illustrationContainer}>
      <Svg width={180} height={120} viewBox="0 0 180 120">
        {[0, 30, 60, 90].map((y) => (
          <Line
            key={y}
            x1="10"
            y1={y + 10}
            x2="170"
            y2={y + 10}
            stroke="rgba(190,242,100,0.08)"
            strokeWidth="1"
          />
        ))}
        <Polyline
          points="10,90 35,80 60,65 85,50 110,38 135,28 160,15"
          fill="none"
          stroke={colors.primary}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Polyline
          points="10,100 35,105 60,95 85,100 110,88 135,92 160,80"
          fill="none"
          stroke="rgba(190,242,100,0.3)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <Circle cx="160" cy="15" r="5" fill={colors.primary} />
      </Svg>
      <View style={styles.rateBadge}>
        <Text style={styles.rateBadgeText}>↓ 4.2%</Text>
      </View>
      <View style={styles.marketBadge}>
        <Text style={styles.marketBadgeText}>Avg. market</Text>
      </View>
    </View>
  );
}

function SecurityIllustration() {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 1500 }),
        withTiming(1, { duration: 1500 }),
      ),
      -1,
      false,
    );
  }, [scale]);

  const shieldStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const badges: Array<{ label: string; style: object }> = [
    { label: 'SSL', style: { top: 19, right: 0 } },
    { label: '2FA', style: { bottom: 29, left: 0 } },
    { label: 'SOC2', style: { top: 96, right: -8 } },
  ];

  return (
    <View style={styles.illustrationContainer}>
      <Animated.View style={shieldStyle}>
        <Svg width={128} height={128} viewBox="0 0 100 110">
          <Path
            d="M50 5 L90 22 L90 55 C90 78 72 97 50 105 C28 97 10 78 10 55 L10 22 Z"
            fill="rgba(190,242,100,0.08)"
            stroke={colors.primary}
            strokeWidth="2"
          />
          <Path
            d="M50 28 L66 35 L66 55 C66 67 59 77 50 81 C41 77 34 67 34 55 L34 35 Z"
            fill="rgba(190,242,100,0.15)"
            stroke="rgba(190,242,100,0.5)"
            strokeWidth="1.5"
          />
          <Path
            d="M43 52 L48 57 L58 47"
            fill="none"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
      {badges.map((badge) => (
        <View key={badge.label} style={[styles.securityBadge, badge.style]}>
          <Text style={styles.securityBadgeText}>{badge.label}</Text>
        </View>
      ))}
    </View>
  );
}

export function PasswordRequirementList({ password }: { password: string }) {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /\d/.test(password) },
  ];

  return (
    <View style={styles.requirementsCard}>
      <Text style={styles.requirementsTitle}>Password must include:</Text>
      {requirements.map(({ label, met }) => (
        <View key={label} style={styles.requirementRow}>
          <View style={[styles.requirementCheck, met && styles.requirementCheckMet]}>
            {met && <Check size={10} color={colors.primaryForeground} />}
          </View>
          <Text style={[styles.requirementText, met && styles.requirementTextMet]}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    width: 192,
    height: 192,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 192,
    height: 192,
    borderRadius: 96,
    borderWidth: 1,
    borderColor: 'rgba(190, 242, 100, 0.3)',
  },
  centerIcon: {
    width: 96,
    height: 96,
    borderRadius: borderRadius['2xl'],
    backgroundColor: 'rgba(190, 242, 100, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(190, 242, 100, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitCard: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitIcon: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: 14,
  },
  orbitLabel: {
    color: colors.foreground,
    fontSize: 12,
    fontWeight: '700',
  },
  rateBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(190, 242, 100, 0.2)',
    borderWidth: 1,
    borderColor: colors.primaryBorderStrong,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rateBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
  },
  marketBadge: {
    position: 'absolute',
    bottom: 16,
    left: 8,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  marketBadgeText: {
    color: colors.mutedForeground,
    fontSize: 12,
  },
  securityBadge: {
    position: 'absolute',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primaryBorderStrong,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  securityBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  requirementsCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: 16,
    marginTop: 8,
  },
  requirementsTitle: {
    ...typography.bodySmall,
    color: colors.mutedForeground,
    fontWeight: '600',
    marginBottom: 8,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  requirementCheck: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requirementCheckMet: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  requirementText: {
    ...typography.bodySmall,
    color: colors.mutedForeground,
  },
  requirementTextMet: {
    color: colors.foreground,
  },
});
