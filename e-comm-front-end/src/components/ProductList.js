import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, SetProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:7006/products',{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        SetProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:7006/delete/${id}`, {
            method: 'delete',
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if (result) {
            alert('Record is deleted');
            getProducts();
        }
    }

    const searchProduct = async (event) => {
        if (event.target.value) {
            let result = await fetch(`http://localhost:7006/search/${event.target.value}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                SetProducts(result);
            }
        } else {
            getProducts();
        }
    }


    return (
        <div className="product-list">
            <h1>Products Home Page</h1>
            <input type="text" onChange={searchProduct} placeholder="Search Product" className="search-product-box" />
            <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operations</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button type="button" onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                ) : <h1>No Records Found</h1>
            }
        </div>
    )
}

export default ProductList;