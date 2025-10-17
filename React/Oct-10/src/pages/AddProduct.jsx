import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productSlice';


const CommonFormInput = ({ name = "", type = "", label = "", change, value = '' }) => {
    return (
        <label >
            <label className='label' >{label}:</label>
            <input className='input' name={name} type={type} value={value} onChange={change} placeholder={`Enter ${label}`} required />
        </label>

    );
}

const AddProduct = () => {

    const [product, setProduct] = useState({})

    const dispatch = useDispatch()

    const postProduct = useCallback(async (data) => {
        try {
            await dispatch(addProduct(data))
            setProduct({})
            alert('Product Added Succesfully')
        }
        catch (e) {
            console.error('Error posting data:', error);
        }
    }, [])

    const create = (e) => {
        e.preventDefault()
        postProduct({ ...product })
        console.log(product);

    }

    const OnChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    return (
        <div className='add-product'>
            <div className='heading'>
                Add Product
            </div>
            <form className='product-form' onSubmit={create} >
                <CommonFormInput label='Title' name='title' value={product.title} type='text' change={OnChange} />
                <CommonFormInput label='Price' name='price' value={product.price} type='number' change={OnChange} />
                <label >
                    <label>Description</label>
                    <textarea name='description' rows={5} value={product.description} required={true} type="text" placeholder='Enter Description' onChange={OnChange} />
                </label>
                <CommonFormInput label='Category' name='category' value={product.category} type='text' change={OnChange} />
                <CommonFormInput label='Brand' name='brand' type='text' value={product.brand} change={OnChange} />
                <CommonFormInput label='Stock' name='stock' type='number' value={product.stock} change={OnChange} />
                <CommonFormInput label='Image Link' name='thumnail' type='text' value={product.thumnail} change={OnChange} />
                <button type='submit'>Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;
