import React, { useState } from 'react';
import CommonInput from '../components/CommonInput';
import axios from 'axios';

const AddProduct = () => {

    const [product, setProduct] = useState({})


    const postProduct = async (data) => {
        try {
            await axios.post('http://localhost:3000/products', data)
            confirm("Product Added Succesfully")
            setProduct({})
        }
        catch (e) {
            console.error('Error posting data:', error);
        }
    }

    const create = (e) => {
        e.preventDefault()
        postProduct({ ...product })
        console.log(product);

    }

    const OnChange = (e) => {
        const { name, value } = e.target
        // console.log(name, value);
        setProduct({ ...product, [name]: value })
    }

    return (
        <div className='add-product'>
            <div className='heading'>
                Add Product
            </div>
            <form className='product-form' onSubmit={create} >
                {/* <div className='heading'>
                    Add Product
                </div> */}
                <div className='w-50' >
                    <CommonInput label='Title' name='title' type='text' change={OnChange} />
                    <CommonInput label='Price' name='price' type='number' change={OnChange} />

                </div>
                <textarea name='description' rows={5} required={true} type="text" placeholder='Enter Description' onChange={OnChange} />
                <CommonInput label='Category' name='category' type='text' change={OnChange} />
                <CommonInput label='Brand' name='brand' type='text' change={OnChange} />
                <CommonInput label='Stock' name='stock' type='number' change={OnChange} />
                <CommonInput label='Image Link' name='thumnail' type='text' change={OnChange} />
                <button type='submit'>Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;
