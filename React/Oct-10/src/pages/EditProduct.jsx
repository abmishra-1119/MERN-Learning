import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurentProduct, updateCurrentProduct } from '../features/products/productSlice.js';


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
    const [product, setProduct] = useState({})


    const { currentProduct, isLoading } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const fetchData = useCallback(async () => {
        const data = await dispatch(fetchCurentProduct(id))
        setProduct(data.payload)
    }, [id])

    const putData = useCallback(async (data) => {
        await dispatch(updateCurrentProduct({ id, data }))
        alert("Product Updated")
    }, [])

    useEffect(() => {
        fetchData()
    }, []);

    const Product = () => {
        try {
            putData(product)
        }
        catch (e) {
            console.error(e)
        }
    }

    const OnChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    return (
        <div className='container' >
            <div className='back'>
                <p>Edit Product</p>
                <button onClick={() => navigate(`/product/${id}`)} >Close X</button>
            </div>
            {
                isLoading ?
                    'Loading...'
                    :
                    <form onSubmit={Product} className='product-edit-form'>
                        <CommonFormInput label='Title' name='title' value={product.title} type='text' change={OnChange} />
                        <CommonFormInput label='Price' name='price' value={product.price} type='number' change={OnChange} />
                        <label >
                            <label>Description</label>
                            <textarea name='description' rows={5} value={product.description} required={true} type="text" placeholder='Enter Description' onChange={OnChange} />
                        </label>
                        <CommonFormInput label='Category' name='category' value={product.category} type='text' change={OnChange} />
                        <CommonFormInput label='Brand' name='brand' type='text' value={product.brand} change={OnChange} />
                        <CommonFormInput label='Stock' name='stock' type='number' value={product.stock} change={OnChange} />
                        <button type='submit'>Update Product</button>
                    </form>}


        </div>
    );
}

export default EditProduct;