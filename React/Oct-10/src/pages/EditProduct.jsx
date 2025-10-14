import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';


const Form = ({ Product, newTitle = "", newdDescription = "", id = undefined, newCategory = "", newBrand = "", newPrice = 0, newStock = 0 }) => {

    const [title, setTitle] = useState(newTitle)
    const [description, setDescription] = useState(newdDescription)
    const [price, setPrice] = useState(newPrice)
    const [stock, setStock] = useState(newStock)
    const [category, setCategory] = useState(newCategory)
    const [brand, setBrand] = useState(newBrand)

    // const [priority, setPriority] = useState(newPriority)


    const sumbitForm = (e) => {
        e.preventDefault()
        Product(title, description, price, stock, category, brand)
        console.log({ id, title, description, price, stock, category, brand });

    }

    return (<>
        <form onSubmit={sumbitForm} className='product-edit-form' >
            <label>
                <label >Title:</label>
                <input required={true} type="text" placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label >
                <label >Description:</label>
                <textarea rows={5} required={true} type="text" placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                <label >Price:</label>
                <input required={true} type="number" placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <label>
                <label >Stock:</label>
                <input required={true} type="text" placeholder='Enter Stock' value={stock} onChange={(e) => setStock(e.target.value)} />
            </label>
            <label>
                <label >Category:</label>
                <input required={true} type="text" placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} />
            </label>
            <label>
                <label >Brand:</label>
                <input required={true} type="text" placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
            </label>
            <button type='submit' >{id === undefined ? "Add Product" : "Update Product"}</button>
        </form>
    </>)

}


const EditProduct = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [product, setProducts] = useState({})
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3000/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
                setTitle(data.title)
                setDescription(data.description)
                setPrice(data.price)
                setStock(data.stock)
                setCategory(data.category)
                setBrand(data.brand)
                // console.log(data.title)
                setLoading(false)
            })
    }, []);

    const Product = (title, description, price, stock, category, brand) => {
        const data = {
            id, title, description, price, stock, category, brand
        }
        // console.log(data);

        try {
            fetch(`http://localhost:3000/products/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => confirm("Product Updated"))
        }
        catch (e) {
            console.error(e)
        }
    }

    return (
        <div className='container' >
            <div className='back'>
                <p>Edit Product</p>
                <button onClick={() => navigate(`/product/${id}`)} >Close X</button>
            </div>
            {/* Edit Product {id} */}
            {
                loading ?
                    'Loading...'
                    :
                    <Form newTitle={title} newdDescription={description} newPrice={price} newCategory={category} newBrand={brand} newStock={stock} Product={Product} />

            }
        </div>
    );
}

export default EditProduct;
