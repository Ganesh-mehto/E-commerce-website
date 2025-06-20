import {useState} from 'react';
import {navigation} from "react-router-dom";
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';
import {useFetchCategoriesQuery}from '../../redux/api/categoryApiSlice';
import {toast} from 'react-toastify';

const ProductList = () => {
    return (
        <div>
            <h1>Product List</h1>
            <p>This is the product list page for admin.</p>
        </div>
    );
}
export default ProductList;