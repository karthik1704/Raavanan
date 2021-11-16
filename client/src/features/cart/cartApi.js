import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../../helper/axiosBaseQuery';

import { API_URL } from '../../CONSTANTS';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL || process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: 'carts/',
        method: 'GET',
      }),
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `carts/`,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation } = cartApi;
