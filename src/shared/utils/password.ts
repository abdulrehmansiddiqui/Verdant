export type PasswordStrength = 0 | 1 | 2 | 3;

export function getPasswordStrength(password: string): PasswordStrength {
  if (password.length === 0) return 0;
  if (password.length < 6) return 1;
  if (password.length < 10) return 2;
  return 3;
}

export const STRENGTH_COLORS: Record<PasswordStrength, string> = {
  0: '',
  1: '#EF4444',
  2: '#FACC15',
  3: '#BEF264',
};

export const STRENGTH_LABELS: Record<PasswordStrength, string> = {
  0: '',
  1: 'Weak',
  2: 'Fair',
  3: 'Strong',
};

export const PASSWORD_REQUIREMENTS = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p: string) => /\d/.test(p) },
] as const;
