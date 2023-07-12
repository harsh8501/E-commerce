import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct=()=>{
    const [name,setName]=useState(""); 
    const [price,setPrice] = useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
         getProductDetails();
    },[])
    
    const getProductDetails= async()=>{
        let result = await fetch(`http://localhost:7006/product/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        console.log(result);
    }

    const updateProduct= async()=>{
        console.log(name,price,category,company);
        let result = await fetch(`http://localhost:7006/update/${params.id}`,
        {
            method: 'put',
            body: JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return(
        <div className="addProduct">
           <h1>Update Product</h1>
           <input type="text" className="inputBox" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} value={name} />
           <input type="text" className="inputBox" placeholder="Enter your price" onChange={(e)=>setPrice(e.target.value)} value={price}/>
           <input type="text" className="inputBox" placeholder="Enter your category" onChange={(e)=>setCategory(e.target.value)} value={category}/>
           <input type="text" className="inputBox" placeholder="Enter your company" onChange={(e)=>setCompany(e.target.value)} value={company}/>
           <button type="button" onClick={updateProduct} className="appButton">Update Product</button>
        </div>
    )
}

export default UpdateProduct;