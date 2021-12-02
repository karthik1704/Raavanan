import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from '../../CONSTANTS';
import axiosBaseQuery from '../../helper/axiosBaseQuery';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL || process.env.REACT_APP_API_URL,
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({
        url: 'orders/',
        method: 'GET',
      }),
    }),
    getOrderDetail: builder.query({
      query: (id) => ({
        query: `orders/${id}`,
        method: 'GET',
      }),
    }),
    // Mutations
    placeOrder: builder.mutation({
      query: (data) => ({
        query: 'orders/',
        method: 'POST',
        data,
      }),
    }),

    confrimOrder: builder.mutation({
      query: (data) => ({
        query: 'order_confirm/',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const {
  useGetOrderQuery,
  useGetOrderDetailQuery,
  usePlaceOrderMutation,
  useConfrimOrderMutation,
} = orderApi;
