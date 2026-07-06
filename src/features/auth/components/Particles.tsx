import { useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/shared/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type ParticleConfig = {
  delay: number;
  x: number;
  size: number;
  duration: number;
};

function FloatingParticle({ delay, x, size, duration }: ParticleConfig) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay * 1000,
      withRepeat(
        withTiming(-SCREEN_HEIGHT * 0.7, { duration: duration * 1000, easing: Easing.linear }),
        -1,
        false,
      ),
    );
    opacity.value = withDelay(
      delay * 1000,
      withRepeat(
        withSequence(
          withTiming(0.8, { duration: duration * 200 }),
          withTiming(0.8, { duration: duration * 600 }),
          withTiming(0, { duration: duration * 200 }),
        ),
        -1,
        false,
      ),
    );
  }, [delay, duration, opacity, translateY]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        { width: size, height: size, left: `${x}%` },
        style,
      ]}
    />
  );
}

export function Particles() {
  const particles = useMemo<ParticleConfig[]>(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        delay: i * 0.8,
        x: Math.random() * 100,
        size: 4 + Math.random() * 8,
        duration: 6 + Math.random() * 6,
      })),
    [],
  );

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    bottom: -10,
    borderRadius: 999,
    backgroundColor: 'rgba(190, 242, 100, 0.2)',
  },
});
