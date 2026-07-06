import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useLoginMutation } from '@/features/auth/api/authApi';
import type { RootStackParamList } from '@/navigation/types';
import { Button } from '@/shared/components/ui/Button';
import { Divider } from '@/shared/components/ui/Divider';
import { ErrorBanner } from '@/shared/components/ui/ErrorBanner';
import { Input } from '@/shared/components/ui/Input';
import { LogoHeader } from '@/shared/components/ui/LogoHeader';
import { ScreenContainer } from '@/shared/components/ui/ScreenContainer';
import { SocialButton } from '@/shared/components/ui/SocialButton';
import { colors, spacing, typography } from '@/shared/theme';
import { isNotEmpty } from '@/shared/utils/validation';

export function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    if (!isNotEmpty(email) || !isNotEmpty(password)) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    try {
      await login({ email: email.trim(), password }).unwrap();
      navigation.replace('Home');
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'error' in err
          ? String((err as { error: string }).error)
          : 'Login failed. Please try again.';
      setError(message);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerDecoration}>
            <Animated.View entering={FadeInDown.delay(100).springify()}>
              <LogoHeader />
            </Animated.View>
          </View>

          <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.form}>
            <Text style={styles.title}>WELCOME BACK</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>

            <ErrorBanner message={error} />

            <View style={styles.fields}>
              <Input
                label="Email"
                icon={<Mail size={16} color={colors.mutedForeground} />}
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <Input
                label="Password"
                icon={<Lock size={16} color={colors.mutedForeground} />}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />
            </View>

            <Pressable style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </Pressable>

            <Button
              title="Sign In"
              showArrow
              loading={isLoading}
              onPress={handleLogin}
            />

            <Divider />

            <View style={styles.socialRow}>
              <SocialButton label="G" />
              <SocialButton label="A" />
            </View>

            <Text style={styles.footer}>
              Don&apos;t have an account?{' '}
              <Text style={styles.footerLink} onPress={() => navigation.navigate('Register')}>
                Sign up
              </Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: spacing['2xl'],
  },
  headerDecoration: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: spacing.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  form: {
    paddingHorizontal: spacing['2xl'],
    flex: 1,
  },
  title: {
    ...typography.displayMedium,
    color: colors.foreground,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.body,
    color: colors.mutedForeground,
    marginTop: spacing.md,
    marginBottom: spacing['2xl'],
  },
  fields: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing['2xl'],
  },
  forgotPasswordText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing['2xl'],
  },
  footer: {
    ...typography.body,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
