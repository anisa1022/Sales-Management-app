import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Create a base query function with a base URL for the API
const baseQuery = fetchBaseQuery({ baseUrl: '' });

// Create an API slice with the base query and tag types for caching
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User','Product'],
    endpoints: (builder) => ({}),
});