import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    useEffect(()=>{
       const auth = localStorage.getItem('user');
       if(auth){
        navigate('/')
       }
    },[])

    const collectData= async()=>{
        //console.warn(name,email,password);
        let result = await fetch('http://localhost:7006/register',{
            method: 'post',
            body: JSON.stringify({name,email,password}),
            headers: {
                'Content-Type':'application/json'
            }
        })
        result = await result.json();
        localStorage.setItem('user',JSON.stringify(result.result));
        localStorage.setItem('token',JSON.stringify(result.auth));
        navigate('/');
        //console.log(result);
    }

    return(
        <div className="register">
            <h1>Register</h1>
            <input type="text" className="inputBox" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} value={name}/>
            <input type="email" className="inputBox" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input type="password" className="inputBox" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button className="appButton" type="button" onClick={collectData} >Sign Up</button>
        </div>
    )
}

export default Signup;