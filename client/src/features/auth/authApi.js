import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../../helper/axiosBaseQuery';

import { API_URL } from '../../CONSTANTS';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL || process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login/',
        method: 'POST',
        data: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/registration/',
        method: 'POST',
        data: credentials,
      }),
    }),
    // Forgot Password
    sendMail: builder.mutation({
      query: (email) => ({
        url: 'auth/password/reset/',
        method: 'POST',
        data: {
          email,
        },
      }),
    }),
    resetForgotPassword: builder.mutation({
      query: (credentials) => ({
        url: 'auth/password/reset/confirm/',
        method: 'POST',
        data: credentials,
      }),
    }),
    // Reset Password
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: 'auth/password/change/',
        method: 'POST',
        data: credentials,
      }),
    }),

    // Verify Email
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: 'verify/email/',
        method: 'POST',
        data: credentials,
      }),
    }),

    // Delete Account

    deleteAccount: builder.mutation({
      query: () => ({
        url: 'user/',
        method: 'DELETE',
      }),
    }),

    // Google Login
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: 'api/auth/google/',
        method: 'POST',
        data: credentials,
      }),
    }),
  }),
});

export const {
  useGoogleLoginMutation,
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useResetForgotPasswordMutation,
  useSendMailMutation,
  useVerifyEmailMutation,
} = authApi;
