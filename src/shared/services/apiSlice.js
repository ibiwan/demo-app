import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const colorApi = createApi({
    reducerPath: 'colorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3060/colors',
    }),
    endpoints: builder => ({
        getColors: builder.query({
            query: () => '',
            providesTags: ['Colors']
        }),
        addColor: builder.mutation({
            query: (color) => ({
                url: '',
                method: 'POST',
                body: color,
            }),
            invalidatesTags:['Colors']
        })
    })
})

export const {
    reducerPath: colorApiReducerPath,
    reducer: colorApiReducer,
    middleware: colorApiMiddleware,
    useGetColorsQuery,
    useAddColorMutation,
} = colorApi
