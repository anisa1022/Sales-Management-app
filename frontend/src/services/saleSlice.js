import { apiSlice } from './apiSlice';

export const saleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSale: builder.mutation({
      query: (data) => ({
        url: '/api/sales',
        method: 'POST',
        body: data,
      }),
    }),
    getSales: builder.query({
      query: () => '/api/sales',
    }),
    getSaleById: builder.query({
      query: (id) => `/api/sales/${id}`,
    }),
    updateSale: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/sales/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/api/sales/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateSaleMutation,
  useGetSalesQuery,
  useGetSaleByIdQuery,
  useUpdateSaleMutation,
  useDeleteSaleMutation,
} = saleApiSlice;
