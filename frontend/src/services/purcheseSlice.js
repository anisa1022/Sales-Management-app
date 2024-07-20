import { apiSlice } from './apiSlice';

export const purchaseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation({
      query: (data) => ({
        url: '/api/purchases',
        method: 'POST',
        body: data,
      }),
    }),
    fetchPurchases: builder.query({
      query: () => '/api/purchases',
    }),
    getPurchaseById: builder.query({
      query: (id) => `/api/purchases/${id}`,
    }),
    updatePurchase: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/purchases/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/api/purchases/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useFetchPurchasesQuery,
  useGetPurchaseByIdQuery,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchaseApiSlice;
