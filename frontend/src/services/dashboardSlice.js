import { apiSlice } from './apiSlice';

const DASHBOARD_URL = '/api/dashboard';

export const dashboardSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductCount: builder.query({
      query: () => `${DASHBOARD_URL}/productCount`,
    }),
    getPurchaseCount: builder.query({
      query: () => `${DASHBOARD_URL}/purchaseCount`,
    }),
    getSupplierCount: builder.query({
      query: () => `${DASHBOARD_URL}/supplierCount`,
    }),
    getUserCount: builder.query({
      query: () => `${DASHBOARD_URL}/userCount`,
    }),
    getCustomerCount: builder.query({
      query: () => `${DASHBOARD_URL}/customerCount`,
    }),
    getSalesCount: builder.query({
      query: () => `${DASHBOARD_URL}/saleCount`,
    }),
  }),
});

export const {
  useGetProductCountQuery,
  useGetPurchaseCountQuery,
  useGetSupplierCountQuery,
  useGetUserCountQuery,
  useGetCustomerCountQuery,
  useGetSalesCountQuery,
} = dashboardSlice;
