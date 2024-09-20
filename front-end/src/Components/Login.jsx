import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginStyle.css';

import Swal from 'sweetalert2';


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleForm(event) {
    event.preventDefault();
try{
    const userData = { email, password };

    const response = await fetch("/api/Login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (data.user) {
      Swal.fire({
        position: "mid",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1700
      });
      localStorage.setItem("token", data.user);
      setTimeout(()=>{
        window.location.href = "/UserPage";},1700
      )
      }else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please check your email and password!",
        });
    }}catch(e){
      Swal.fire({
        title: "The Internet?",
        text: "There is something Wrong ! ",
        icon: "question"
      });
      
    }
  }

  return (
    <center>
      <form className="form" onSubmit={handleForm}>
        <h2 className="title">Welcome Back!</h2>
        <p className="message">Sign in now and get full access to our app.</p>
        <br />
        <label>
          <input className="input" type="email" name="email" onChange={e => setEmail(e.target.value)} required />
          <span>Email</span>
        </label>
        <label>
          <input className="input" type="password" name="pwd" onChange={e => setPassword(e.target.value)} required />
          <span>Password</span>
        </label>
        <p className='forget'><Link to ="/ResetPass">Forget Password ?</Link></p>
        <button className="submit"><span>Login</span></button>
        
        <p className="signup">Don't Have an Account Yet?<br /><br /><Link to='/SignUp'>SignUp</Link></p>
      </form>
    </center>
  );
}
