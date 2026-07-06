import { baseApi } from '@/api/baseApi';
import { mockLogin, mockRegister, USE_MOCK_API } from '@/api/mockAuth';
import { API_ENDPOINTS } from '@/shared/constants/api';
import { setCredentials, clearCredentials } from '@/features/auth/store/authSlice';
import type { User } from '@/features/auth/store/authSlice';

const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  phone?: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      ...(USE_MOCK_API
        ? {
            queryFn: async (body) => {
              try {
                const data = await mockLogin(body);
                return { data };
              } catch (error) {
                return {
                  error: {
                    status: 'CUSTOM_ERROR',
                    error: error instanceof Error ? error.message : 'Login failed',
                  },
                };
              }
            },
          }
        : {
            query: (body) => ({
              url: API_ENDPOINTS.auth.login,
              method: 'POST',
              body,
            }),
          }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          // Error handled by component
        }
      },
      invalidatesTags: ['Auth', 'User'],
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      ...(USE_MOCK_API
        ? {
            queryFn: async (body) => {
              try {
                const data = await mockRegister(body);
                return { data };
              } catch (error) {
                return {
                  error: {
                    status: 'CUSTOM_ERROR',
                    error: error instanceof Error ? error.message : 'Registration failed',
                  },
                };
              }
            },
          }
        : {
            query: (body) => ({
              url: API_ENDPOINTS.auth.register,
              method: 'POST',
              body,
            }),
          }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          // Error handled by component
        }
      },
      invalidatesTags: ['Auth', 'User'],
    }),

    logout: builder.mutation<void, void>({
      ...(USE_MOCK_API
        ? {
            queryFn: async () => {
              await mockDelay(300);
              return { data: undefined };
            },
          }
        : {
            query: () => ({
              url: API_ENDPOINTS.auth.logout,
              method: 'POST',
            }),
          }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearCredentials());
        }
      },
      invalidatesTags: ['Auth', 'User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;
