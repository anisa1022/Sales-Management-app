import { apiSlice } from './apiSlice';

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (data) => ({
        url: '/api/customers',
        method: 'POST',
        body: data,
      }),
    }),
    getCustomers: builder.query({
      query: () => '/api/customers',
    }),
    getCustomerById: builder.query({
      query: (id) => `/api/customers/${id}`,
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/customers/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/api/customers/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApiSlice;
