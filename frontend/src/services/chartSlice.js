import { apiSlice } from './apiSlice';

export const chartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => '/api/sales',
      providesTags: ['Sales'],
    }),
    getPurchases: builder.query({
      query: () => '/api/purchases',
      providesTags: ['Purchases'],
    }),
  }),
});

export const {
  useGetSalesQuery,
  useGetPurchasesQuery,
} = chartApiSlice;
