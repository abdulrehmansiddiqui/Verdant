import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useLogoutMutation } from '@/features/auth/api/authApi';
import { resetOnboarding } from '@/features/auth/store/authSlice';
import { Button } from '@/shared/components/ui/Button';
import { LogoHeader } from '@/shared/components/ui/LogoHeader';
import { ScreenContainer } from '@/shared/components/ui/ScreenContainer';
import type { RootStackParamList } from '@/navigation/types';
import { colors, spacing, typography } from '@/shared/theme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [logout] = useLogoutMutation();

  const handleSignOut = async () => {
    try {
      await logout().unwrap();
    } catch {
      // ok for mock api
    }
    dispatch(resetOnboarding());
    navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
  };

  return (
    <ScreenContainer padded>
      <View style={styles.content}>
        <LogoHeader />
        <Text style={styles.greeting}>Welcome{user?.name ? `, ${user.name}` : ''}!</Text>
        <Text style={styles.subtitle}>You are signed in.</Text>
        <Button title="Sign Out" variant="secondary" onPress={handleSignOut} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  greeting: {
    ...typography.displaySmall,
    color: colors.foreground,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
