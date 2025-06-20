import { get } from "mongoose";
import { PRODUCT_URL,UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder).query({
        getProduct: builder.query({
            query: ({keyword}) =>({
                url :`${PRODUCT_URL}`,
                params:{keyword}
            }),
            keepUnuseedDataFor: 5,
            providesTags:["Product"]
        }),
        getProductById: builder.query({
            query :(productId)=>`${PRODUCT_URL}/${productId}`,
            providesTags: (result, error, id) => [{ type: 'Product', id:productId }],
        }),
        allProducts: builder.query({
            query: () => `${PRODUCT_URL}/allProducts`,
            
        }),
        getProductDetails: builder.query({
            query: (productId) => `${PRODUCT_URL}/${productId}`,
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: (productData) => ({
                url: PRODUCT_URL,
                method: "POST",
                body: productData,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation({
            query: ({ productId, formData }) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "PUT",
                body: formData,
            }),
        }),
        uploadProductImage: builder.mutation({
            query: (formData) => ({
                url: UPLOAD_URL,
                method: "POST",
                body: formData,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "DELETE",
            }),
        }),
        createReview:builder.mutation({
            query:(data)=>({
               url:`${PRODUCT_URL}/${data.productId}/reviews`, 
            })
        }),
        getTopProducts: builder.query({
            query: () => `${PRODUCT_URL}/top`  
        }),
        
        getNewProducts: builder.query({
            query: () => `${PRODUCT_URL}/new`,
        }),
    
    }),
});
export const {
    useGetProductQuery,
    useGetProductByIdQuery,
    useAllProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
    useGetNewProductsQuery
} = productApiSlice;
