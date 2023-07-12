import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
         navigate('/')
        }
     },[])

    const handleLogin = async () => {
        console.log(email, password);
        try {
            let result = await fetch('http://localhost:7006/login', {
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                'content-Type': 'application/json'
            }
        })
        result = await result.json();
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user))
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/');
        }
        } catch (error) {
            alert('Please give correct cred!!')
        }

    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="email" className="inputBox" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" className="inputBox" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <input type="text" className="inputBox" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button type="button" className="appButton" onClick={handleLogin} >Login</button>
        </div>
    )
}

export default Login;