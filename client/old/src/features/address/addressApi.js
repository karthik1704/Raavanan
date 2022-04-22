import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../../helper/axiosBaseQuery';
import { API_URL } from '../../CONSTANTS';

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: axiosBaseQuery({
    baserUrl: API_URL || process.env.REACT_APP_API_URL,
  }),
  tagTypes: ['Address'],
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => ({
        url: 'address/',
        method: 'GET',
      }),
    }),

    // Create Address

    createAddress: builder.mutation({
      query: (data) => ({
        url: 'address/',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Address'],
    }),

    // Update Address
    updateAddress: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `address/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Address'],
    }),

    // Delete Address
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `address/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
