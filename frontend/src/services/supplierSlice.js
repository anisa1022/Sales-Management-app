// src/services/supplierSlice.js
import { apiSlice } from "./apiSlice";
const SUPPLIERS_URL = 'api/suppliers';

export const suppliersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSuppliers: builder.query({
            query: () => ({
                url: SUPPLIERS_URL,
                method: 'GET',
            }),
        }),
        addSupplier: builder.mutation({
            query: (data) => ({
                url: SUPPLIERS_URL,
                method: 'POST',
                body: data,
            }),
        }),
        updateSupplier: builder.mutation({
            query: ({ id, data }) => ({
                url: `${SUPPLIERS_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteSupplier: builder.mutation({
            query: (id) => ({
                url: `${SUPPLIERS_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { 
    useGetSuppliersQuery,
    useAddSupplierMutation,
    useUpdateSupplierMutation,
    useDeleteSupplierMutation
} = suppliersApiSlice;
