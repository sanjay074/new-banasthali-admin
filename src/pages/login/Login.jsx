import "./login.scss"
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../config.js/baseUrl";

const Login = () => {
  let navigate = useNavigate();
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');
	async function login(e) {
	  e.preventDefault();
	  let item = { email, password };
	  let result = await axios.post( baseUrl+"/auth/adminLogin", item);
	  if (!result.data.token) {
		alert('login failed');
	  } else {
		localStorage.setItem('token', result.data.token);
		navigate("/dashboard")
	  }
	}
 
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome, Log into you account</h2>
        <form onSubmit={login}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password"  value={password}
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}/>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login