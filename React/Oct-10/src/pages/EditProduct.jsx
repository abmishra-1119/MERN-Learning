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
    const [product, setProduct] = useState({})

    const { state, dispatch } = useAppContext()
    const { isLoading } = state

    const fetchData = useCallback(async () => {
        dispatch({ type: 'loading', payload: true })
        const data = await useFetch({ url: `/products/${id}`, method: 'GET' })
        setProduct(data)
        // console.log(data.title)
        dispatch({ type: 'loading', payload: false })
    }, [id])

    const putData = useCallback(async (data) => {
        await useFetch({
            url: `/products/${id}`, method: 'PUT', header: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        })
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
            {/* Edit Product {id} */}
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
