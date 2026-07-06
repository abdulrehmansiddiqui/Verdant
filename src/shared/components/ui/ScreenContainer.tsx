import { StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/shared/theme';

type ScreenContainerProps = ViewProps & {
  safe?: boolean;
  padded?: boolean;
};

export function ScreenContainer({
  safe = true,
  padded = false,
  style,
  children,
  ...props
}: ScreenContainerProps) {
  const content = (
    <View style={[styles.container, padded && styles.padded, style]} {...props}>
      {children}
    </View>
  );

  if (safe) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {content}
      </SafeAreaView>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padded: {
    paddingHorizontal: 24,
  },
});
