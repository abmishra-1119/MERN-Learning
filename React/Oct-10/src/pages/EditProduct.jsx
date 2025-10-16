import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useFetch } from "../hooks/useFetch.js";
import { useAppContext } from '../context/AppContext.jsx';


const CommonFormInput = ({ name = "", type = "", label = "", change, value = '' }) => {
    return (
        <label >
            <label className='label' >{label}:</label>
            <input className='input' name={name} type={type} value={value} onChange={change} placeholder={`Enter ${label}`} required />
        </label>

    );
}

const EditProduct = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { state, dispatch } = useAppContext()
    const { isLoading, currentProduct } = state

    const fetchData = useCallback(async () => {
        dispatch({ type: 'loading', payload: true })
        const data = await useFetch({ url: `/products/${id}`, method: 'GET' })
        dispatch({ type: 'currentProduct', payload: data })
        dispatch({ type: 'loading', payload: false })
    }, [id])

    const putData = useCallback(async (data) => {
        await useFetch({
            url: `/products/${id}`, method: 'PUT', header: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        })
        alert("Product Updated")
    }, [])



    useEffect(() => {
        // console.log(currentProduct);

        if (!currentProduct) {
            fetchData()
        }
    }, []);

    const Product = () => {
        try {
            putData(currentProduct)
        }
        catch (e) {
            console.error(e)
        }
    }

    const OnChange = (e) => {
        const { name, value } = e.target
        dispatch({ type: 'currentProduct', payload: { ...currentProduct, [name]: value } })

    }

    return (
        <div className='container' >
            <div className='back'>
                <p>Edit Product</p>
                <button onClick={() => navigate(`/product/${id}`)} >Close X</button>
            </div>
            {/* Edit Product {id} */}
            {
                isLoading ?
                    'Loading...'
                    :
                    <form onSubmit={Product} className='product-edit-form'>
                        <CommonFormInput label='Title' name='title' value={currentProduct?.title} type='text' change={OnChange} />
                        <CommonFormInput label='Price' name='price' value={currentProduct?.price} type='number' change={OnChange} />
                        <label >
                            <label>Description</label>
                            <textarea name='description' rows={5} value={currentProduct?.description} required={true} type="text" placeholder='Enter Description' onChange={OnChange} />
                        </label>
                        <CommonFormInput label='Category' name='category' value={currentProduct?.category} type='text' change={OnChange} />
                        <CommonFormInput label='Brand' name='brand' type='text' value={currentProduct?.brand} change={OnChange} />
                        <CommonFormInput label='Stock' name='stock' type='number' value={currentProduct?.stock} change={OnChange} />
                        <button type='submit'>Update Product</button>
                    </form>}


        </div>
    );
}

export default EditProduct;
