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
      query: ({ slug, page }) => ({
        url: 'product/',
        method: 'GET',
        params: {
          category__slug: slug,
          page,
        },
      }),
    }),
    getProductDetail: builder.query({
      query: (slug) => ({
        url: `product/${slug}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } = productApi;
