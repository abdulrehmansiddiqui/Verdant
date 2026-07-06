import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft, Lock, Mail, Phone, Shield, UserCircle } from 'lucide-react-native';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeIn, SlideInRight, SlideOutLeft } from 'react-native-reanimated';

import { useRegisterMutation } from '@/features/auth/api/authApi';
import { PasswordRequirementList } from '@/features/auth/components/OnboardingIllustration';
import { PasswordStrengthBar } from '@/features/auth/components/PasswordStrengthBar';
import { REGISTER_STEPS } from '@/features/auth/constants/onboarding';
import type { RootStackParamList } from '@/navigation/types';
import { Button } from '@/shared/components/ui/Button';
import {
  Checkbox,
} from '@/shared/components/ui/Checkbox';
import { ErrorBanner } from '@/shared/components/ui/ErrorBanner';
import { IconButton } from '@/shared/components/ui/IconButton';
import { Input } from '@/shared/components/ui/Input';
import { ScreenContainer } from '@/shared/components/ui/ScreenContainer';
import { borderRadius, colors, spacing, typography } from '@/shared/theme';
import { isNotEmpty, isValidEmail } from '@/shared/utils/validation';

type RegisterForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
};

const initialForm: RegisterForm = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirm: '',
};

export function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [register, { isLoading }] = useRegisterMutation();

  const updateField = (key: keyof RegisterForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep = (): boolean => {
    if (step === 0) {
      if (!isNotEmpty(form.name) || !isNotEmpty(form.email)) {
        setError('Name and email are required.');
        return false;
      }
      if (!isValidEmail(form.email)) {
        setError('Please enter a valid email address.');
        return false;
      }
    }

    if (step === 1) {
      if (!isNotEmpty(form.password) || form.password !== form.confirm) {
        setError("Passwords don't match.");
        return false;
      }
    }

    if (step === 2 && !agreed) {
      setError('Please agree to the terms.');
      return false;
    }

    setError('');
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step < 2) {
      setStep((s) => s + 1);
      return;
    }

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        password: form.password,
      }).unwrap();
      navigation.replace('Home');
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'error' in err
          ? String((err as { error: string }).error)
          : 'Registration failed. Please try again.';
      setError(message);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <IconButton
              icon={<ChevronLeft size={16} color={colors.mutedForeground} />}
              onPress={() => navigation.navigate('Onboarding')}
            />
            <Text style={styles.headerLabel}>CREATE ACCOUNT</Text>
          </View>

          <Text style={styles.title}>{REGISTER_STEPS[step].toUpperCase()}</Text>
          <Text style={styles.stepLabel}>Step {step + 1} of 3</Text>

          <View style={styles.progress}>
            {REGISTER_STEPS.map((_, i) => (
              <View
                key={i}
                style={[styles.progressBar, i <= step && styles.progressBarActive]}
              />
            ))}
          </View>
        </View>

        <View style={styles.errorContainer}>
          <ErrorBanner message={error} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Animated.View
            key={step}
            entering={SlideInRight.duration(250)}
            exiting={SlideOutLeft.duration(200)}>
            {step === 0 && (
              <View style={styles.fields}>
                <Input
                  label="Full Name"
                  icon={<UserCircle size={16} color={colors.mutedForeground} />}
                  placeholder="Marcus Chen"
                  value={form.name}
                  onChangeText={updateField('name')}
                  autoComplete="name"
                />
                <Input
                  label="Email Address"
                  icon={<Mail size={16} color={colors.mutedForeground} />}
                  placeholder="you@example.com"
                  value={form.email}
                  onChangeText={updateField('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                <Input
                  label="Phone Number"
                  icon={<Phone size={16} color={colors.mutedForeground} />}
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChangeText={updateField('phone')}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                />
              </View>
            )}

            {step === 1 && (
              <View style={styles.fields}>
                <View>
                  <Input
                    label="Password"
                    icon={<Lock size={16} color={colors.mutedForeground} />}
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChangeText={updateField('password')}
                    secureTextEntry
                    autoComplete="new-password"
                  />
                  <PasswordStrengthBar password={form.password} />
                </View>
                <Input
                  label="Confirm Password"
                  icon={<Lock size={16} color={colors.mutedForeground} />}
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChangeText={updateField('confirm')}
                  secureTextEntry
                  autoComplete="new-password"
                />
                <PasswordRequirementList password={form.password} />
              </View>
            )}

            {step === 2 && (
              <View>
                <View style={styles.summaryCard}>
                  <View style={styles.summaryHeader}>
                    <Text style={styles.summaryHeaderText}>ACCOUNT SUMMARY</Text>
                  </View>
                  <SummaryRow label="Full Name" value={form.name || '—'} />
                  <SummaryRow label="Email" value={form.email || '—'} bordered />
                  <SummaryRow label="Phone" value={form.phone || 'Not provided'} />
                </View>

                <Checkbox
                  checked={agreed}
                  onToggle={() => setAgreed((v) => !v)}
                  label={
                    <Text style={checkboxLabelStyle}>
                      I agree to Verdant&apos;s{' '}
                      <Text style={checkboxLinkStyle}>Terms of Service</Text> and{' '}
                      <Text style={checkboxLinkStyle}>Privacy Policy</Text>. I consent to a soft
                      credit check during onboarding.
                    </Text>
                  }
                />

                <Animated.View entering={FadeIn.delay(200)} style={styles.securityNote}>
                  <Shield size={16} color={colors.primary} />
                  <Text style={styles.securityNoteText}>
                    Your data is encrypted and never sold to third parties.
                  </Text>
                </Animated.View>
              </View>
            )}
          </Animated.View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={step < 2 ? 'Continue' : 'Create Account'}
            showArrow
            loading={isLoading}
            onPress={handleNext}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

function SummaryRow({
  label,
  value,
  bordered = false,
}: {
  label: string;
  value: string;
  bordered?: boolean;
}) {
  return (
    <View style={[styles.summaryRow, bordered && styles.summaryRowBorder]}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  headerLabel: {
    ...typography.label,
    color: colors.mutedForeground,
  },
  title: {
    ...typography.displaySmall,
    color: colors.foreground,
    marginBottom: 4,
  },
  stepLabel: {
    ...typography.bodySmall,
    color: colors.mutedForeground,
    marginVertical: spacing.lg,
  },
  progress: {
    flexDirection: 'row',
    gap: 6,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.secondary,
  },
  progressBarActive: {
    backgroundColor: colors.primary,
  },
  errorContainer: {
    paddingHorizontal: spacing.xl,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  fields: {
    gap: spacing.md,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  summaryHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryHeaderText: {
    ...typography.label,
    color: colors.mutedForeground,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  summaryRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryLabel: {
    ...typography.bodySmall,
    color: colors.mutedForeground,
  },
  summaryValue: {
    ...typography.bodySmall,
    color: colors.foreground,
    fontWeight: '600',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.overlay,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  securityNoteText: {
    ...typography.bodySmall,
    color: colors.mutedForeground,
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
});

const checkboxLabelStyle = {
  ...typography.bodySmall,
  color: colors.mutedForeground,
  flex: 1,
  lineHeight: 18,
};

const checkboxLinkStyle = {
  color: colors.primary,
};
