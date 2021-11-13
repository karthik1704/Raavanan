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
        transformResponse: (response) => {
          if (response.data.imageurl) {
            response.data.image.push({
              original: response.data.imageurl,
              thumbnail: response.data.imageurl,
            });
          }

          if (response.data.image.length > 0) {
            let image = response.data.image.map((img) =>
              response.data.image.push({
                original: img.image,
                thumbnail: img.image,
              })
            );
          }
          return response.data;
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } = productApi;
