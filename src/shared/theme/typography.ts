import { TextStyle } from 'react-native';

export const fontFamilies = {
  heading: 'BarlowCondensed_900Black',
  headingBold: 'BarlowCondensed_700Bold',
  headingSemiBold: 'BarlowCondensed_600SemiBold',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodySemiBold: 'DMSans_600SemiBold',
  mono: 'DMMono_500Medium',
  monoRegular: 'DMMono_400Regular',
} as const;

export const typography = {
  displayLarge: {
    fontFamily: fontFamilies.heading,
    fontSize: 38,
    lineHeight: 38,
    letterSpacing: -0.76,
  } satisfies TextStyle,
  displayMedium: {
    fontFamily: fontFamilies.heading,
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: -0.32,
  } satisfies TextStyle,
  displaySmall: {
    fontFamily: fontFamilies.heading,
    fontSize: 29,
    lineHeight: 29,
    letterSpacing: -0.29,
  } satisfies TextStyle,
  title: {
    fontFamily: fontFamilies.heading,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.72,
  } satisfies TextStyle,
  body: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 22,
  } satisfies TextStyle,
  bodySmall: {
    fontFamily: fontFamilies.body,
    fontSize: 12,
    lineHeight: 18,
  } satisfies TextStyle,
  label: {
    fontFamily: fontFamilies.mono,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  } satisfies TextStyle,
  button: {
    fontFamily: fontFamilies.heading,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.64,
  } satisfies TextStyle,
  badge: {
    fontFamily: fontFamilies.mono,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.5,
  } satisfies TextStyle,
} as const;
