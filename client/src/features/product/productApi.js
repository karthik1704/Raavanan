import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../../helper/axiosBaseQuery';

import { API_URL } from '../../CONSTANTS';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL || process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: 'api/product/',
        method: 'GET',
      }),
    }),
    getProductDetail: builder.query({
      query: (slug) => ({
        url: `api/product/${slug}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } = productApi;
