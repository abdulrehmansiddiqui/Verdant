import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

import { colors, borderRadius } from '@/shared/theme';

type IconButtonProps = Omit<PressableProps, 'style'> & {
  icon: ReactNode;
  size?: number;
  style?: PressableProps['style'];
};

export function IconButton({ icon, size = 32, style, ...props }: IconButtonProps) {
  return (
    <Pressable
      style={(state) => {
        const userStyle = typeof style === 'function' ? style(state) : style;
        return [
          styles.button,
          { width: size, height: size },
          state.pressed && styles.pressed,
          userStyle,
        ];
      }}
      {...props}>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
  },
  pressed: {
    opacity: 0.8,
  },
});
