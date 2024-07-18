import { apiSlice } from "./apiSlice";

const PURCHASES_URL = '/api/purchases';

export const purchasesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPurchases: builder.query({
      query: () => ({
        url: PURCHASES_URL,
        method: 'GET',
      }),
      providesTags: ['Purchases'],
    }),
    addPurchase: builder.mutation({
      query: (purchase) => ({
        url: PURCHASES_URL,
        method: 'POST',
        body: purchase,
      }),
      invalidatesTags: ['Purchases'],
    }),
    updatePurchase: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PURCHASES_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Purchases'],
    }),
    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `${PURCHASES_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Purchases'],
    }),
  }),
});

export const {
  useFetchPurchasesQuery,
  useAddPurchaseMutation,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchasesApiSlice;
