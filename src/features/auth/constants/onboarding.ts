import { ReactNode } from 'react';

export type OnboardingSlide = {
  badge: string;
  headline: [string, string];
  sub: string;
  illustrationKey: 'instant' | 'rates' | 'security';
};

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    badge: 'INSTANT LOANS',
    headline: ['MONEY WHEN', 'YOU NEED IT.'],
    sub: 'Get approved in 60 seconds and funds deposited the same day — no paperwork, no branch visits.',
    illustrationKey: 'instant',
  },
  {
    badge: 'SMART RATES',
    headline: ['RATES THAT', 'MAKE SENSE.'],
    sub: 'Our AI matches you to the lowest possible rate based on your real financial picture — not just your credit score.',
    illustrationKey: 'rates',
  },
  {
    badge: 'TOTAL SECURITY',
    headline: ['YOUR MONEY,', 'PROTECTED.'],
    sub: 'Bank-grade 256-bit encryption, biometric login, and real-time fraud alerts keep every dollar safe.',
    illustrationKey: 'security',
  },
];

export const REGISTER_STEPS = ['Personal Info', 'Set Password', 'Verify & Agree'] as const;
