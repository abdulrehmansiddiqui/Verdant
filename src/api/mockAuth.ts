import type { AuthResponse, LoginRequest, RegisterRequest } from '@/features/auth/api/authApi';
import type { User } from '@/features/auth/store/authSlice';

const USE_MOCK_API = process.env.EXPO_PUBLIC_USE_MOCK_API !== 'false';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function createMockUser(data: Partial<User> & { email: string; name: string }): User {
  return {
    id: 'mock-user-1',
    email: data.email,
    name: data.name,
    phone: data.phone,
  };
}

export async function mockLogin(request: LoginRequest): Promise<AuthResponse> {
  await delay(1400);

  if (!request.email || !request.password) {
    throw new Error('Please fill in all fields.');
  }

  return {
    token: 'mock-jwt-token',
    user: createMockUser({
      email: request.email,
      name: 'Marcus Chen',
    }),
  };
}

export async function mockRegister(request: RegisterRequest): Promise<AuthResponse> {
  await delay(1600);

  return {
    token: 'mock-jwt-token',
    user: createMockUser({
      email: request.email,
      name: request.name,
      phone: request.phone,
    }),
  };
}

export { USE_MOCK_API };
