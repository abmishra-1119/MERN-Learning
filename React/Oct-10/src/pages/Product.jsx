import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useFetch } from '../hooks/useFetch';

const Product = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [product, setProducts] = useState({})
    const { id } = useParams()
    const [del, setDel] = useState(false);
    const userData = localStorage.getItem("user")


    const fetchData = async () => {
        setLoading(true)
        // fetch(`http://localhost:3000/products/${id}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setProducts(data)
        //         setLoading(false)
        //     })
        const data = await useFetch({ url: `/products/${id}`, method: 'GET' })
        setProducts(data)
        setLoading(false)
    }

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
        setLoading(true)
        fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE'
        })
            .then((res) => confirm('Delte Sucessfully'))

        navigate('/')

    }

    return (
        <div className='product'>
            {
                loading ?
                    <div>Loading...</div>
                    :
                    <div className='prodcutDetail' >
                        <div className='product-heading'>
                            <p>
                                Product Id: {product.id}
                            </p>
                            <button onClick={() => navigate('/')} >back</button>
                        </div>
                        <div className='product-body'>
                            <p>Title: {product.title}</p>
                            <p>Description: {product.description}</p>
                            <p>Price:  {product.price}</p>
                            <p>Stock: {product.stock}</p>
                            <p>Categeory: {product.category}</p>
                            <p>Brand: {product.brand}</p>
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
