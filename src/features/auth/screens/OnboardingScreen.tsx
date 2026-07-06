import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from 'react-native-reanimated';

import { OnboardingIllustration } from '@/features/auth/components/OnboardingIllustration';
import { Particles } from '@/features/auth/components/Particles';
import { ONBOARDING_SLIDES } from '@/features/auth/constants/onboarding';
import { completeOnboarding } from '@/features/auth/store/authSlice';
import type { RootStackParamList } from '@/navigation/types';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { ProgressDots } from '@/shared/components/ui/ProgressDots';
import { ScreenContainer } from '@/shared/components/ui/ScreenContainer';
import { colors, spacing, typography } from '@/shared/theme';
import { useAppDispatch } from '@/store/hooks';

export function OnboardingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [slide, setSlide] = useState(0);

  const current = ONBOARDING_SLIDES[slide];
  const isLastSlide = slide === ONBOARDING_SLIDES.length - 1;

  const navigate = (target: 'Login' | 'Register') => {
    dispatch(completeOnboarding());
    navigation.replace(target);
  };

  const goNext = () => {
    if (slide < ONBOARDING_SLIDES.length - 1) {
      setSlide((s) => s + 1);
    }
  };

  return (
    <ScreenContainer>
      <Particles />

      <Pressable style={styles.skipButton} onPress={() => navigate('Login')}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <View style={styles.illustrationSection}>
        <Animated.View
          key={`illus-${slide}`}
          entering={FadeIn.duration(450)}
          exiting={FadeOut.duration(300)}>
          <OnboardingIllustration type={current.illustrationKey} />
        </Animated.View>
      </View>

      <View style={styles.content}>
        <Animated.View
          key={`text-${slide}`}
          entering={SlideInRight.duration(350)}
          exiting={SlideOutLeft.duration(300)}>
          <Badge label={current.badge} />
          <Text style={styles.headline}>
            {current.headline[0]}
            {'\n'}
            <Text style={styles.headlineAccent}>{current.headline[1]}</Text>
          </Text>
          <Text style={styles.subtitle}>{current.sub}</Text>
        </Animated.View>

        <ProgressDots
          count={ONBOARDING_SLIDES.length}
          activeIndex={slide}
          onDotPress={setSlide}
        />

        {!isLastSlide ? (
          <Button title="Next" showArrow onPress={goNext} />
        ) : (
          <View style={styles.finalButtons}>
            <Button title="Get Started" showArrow onPress={() => navigate('Register')} />
            <Button
              title="I already have an account"
              variant="secondary"
              onPress={() => navigate('Login')}
            />
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  skipButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.xl,
    zIndex: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skipText: {
    ...typography.bodySmall,
    color: colors.mutedForeground,
    fontWeight: '500',
  },
  illustrationSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing['5xl'],
    paddingHorizontal: spacing['2xl'],
  },
  content: {
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['2xl'],
  },
  headline: {
    ...typography.displayLarge,
    fontSize: 38,
    color: colors.foreground,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  headlineAccent: {
    color: colors.primary,
  },
  subtitle: {
    ...typography.body,
    color: colors.mutedForeground,
  },
  finalButtons: {
    gap: spacing.sm,
  },
});
