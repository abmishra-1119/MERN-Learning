import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useFetch } from '../hooks/useFetch';
import { useAppContext } from '../context/AppContext';

const Product = () => {

    const { state, dispatch } = useAppContext()
    const { isLoading, currentProduct } = state

    const navigate = useNavigate()
    const { id } = useParams()
    const [del, setDel] = useState(false);
    const userData = localStorage.getItem("user")


    const fetchData = useCallback(async () => {
        dispatch({ type: 'loading', payload: true })
        const data = await useFetch({ url: `/products/${id}`, method: 'GET' })
        dispatch({ type: 'currentProduct', payload: data })
        dispatch({ type: 'loading', payload: false })

    }, [])

    const deleteData = useCallback(async () => {
        dispatch({ type: 'loading', payload: true })
        await useFetch({ url: `/products/${id}`, method: 'DELETE' })
        alert('Delete Succesfully')
        navigate('/')
    }, [navigate])

    useEffect(() => {
        fetchData()
    }, []);


    const editProduct = () => {
        if (userData) {
            navigate(`/edit-product/${id}`)
        }
        else {
            alert('Please Login to edit product')
            navigate('/login')
        }
    }
    const deleteProduct = () => {
        if (userData) {
            setDel(true)
        }
        else {
            alert('Please Login to delete product')
            navigate('/login')
        }
    }
    const confirmDelete = () => {
        console.log("Delete Product:", id);
        deleteData()
    }

    return (
        <div className='product'>
            {
                isLoading ?
                    <div>Loading...</div>
                    :
                    <div className='prodcutDetail' >
                        <div className='product-heading'>
                            <p>
                                Product Id: {currentProduct.id}
                            </p>
                            <button onClick={() => navigate('/')} >back</button>
                        </div>
                        <div className='product-body'>
                            <p>Title: {currentProduct.title}</p>
                            <p>Description: {currentProduct.description}</p>
                            <p>Price:  {currentProduct.price}</p>
                            <p>Stock: {currentProduct.stock}</p>
                            <p>Categeory: {currentProduct.category}</p>
                            <p>Brand: {currentProduct.brand}</p>
                        </div>
                        <div className='product-bottom' >
                            <button onClick={deleteProduct}> Delete</button>
                            <button onClick={editProduct} > Edit</button>
                        </div>
                    </div>
            }
            {
                del ?
                    <div className='bg-dark' >
                        <div className='product-delete-modal'>
                            <p>Are you Sure?</p>
                            <div className='product-delete-modal-btns' >
                                <button onClick={() => setDel(false)} >Cancel</button>
                                <button onClick={confirmDelete} >Delete</button>
                            </div>
                        </div>
                    </div>
                    : " "
            }

        </div >
    );
}

export default Product;
