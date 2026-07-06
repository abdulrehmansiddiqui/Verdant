import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { OnboardingScreen } from '@/features/auth/screens/OnboardingScreen';
import { RegisterScreen } from '@/features/auth/screens/RegisterScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { colors } from '@/shared/theme';
import { useAppSelector } from '@/store/hooks';

import { RootState } from '@/store';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function getStartScreen(isAuthenticated: boolean, hasCompletedOnboarding: boolean) {
  if (isAuthenticated) return 'Home';
  if (hasCompletedOnboarding) return 'Login';
  return 'Onboarding';
}

export default function AppNavigator() {
  const { isAuthenticated, hasCompletedOnboarding } = useAppSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getStartScreen(isAuthenticated, hasCompletedOnboarding)}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
