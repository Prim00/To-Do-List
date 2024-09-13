import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpStyle.css';

export default function SignUp() {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass,setPass] =useState("")

  async function handleForm2(event) {

    if(pass!==password){
      alert("Assurer que le mot de passe se conforme avec le mot de passe de confirmation !")
      return
    }

    event.preventDefault();

    const data = { 
      firstname,
       lastname, 
       phone, 
       email, 
       password 
    }
    try{
    const response = await fetch("/api/SignUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resBack = await response.json();
    if (resBack.status === "ok") {
      navigate("/Login");
    } else {
      alert("Error: User could not be added.");
    }
  }catch(e){
    console.log("error de recevoir la reponse de requette http from server !!! ")
  }
  }
  return (
    <center>
      <form className="form-s" onSubmit={handleForm2}>
        <h2 className="title-s">Create an Account</h2>
        <p className="message-s">Sign up now and get full access to our app.</p>
        <div className="flex-s">
          <label>
            <input className="input-s" type="text" name="firstname" onChange={e => setFirstname(e.target.value)} required />
            <span>Firstname</span>
          </label><br />
          <label>
            <input className="input-s" type="text" name="lastname" onChange={e => setLastname(e.target.value)} required />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input className="input-s" type="text" name="phone" onChange={e => setPhone(e.target.value)} pattern="[0-9]{8}" title="Please enter 8 numbers only" required />
          <span>Phone Number</span>
        </label>
        <label>
          <input className="input-s" type="email" name="email" onChange={e => setEmail(e.target.value)} required />
          <span>Email</span>
        </label>
        <label>
          <input className="input-s" type="password" name="password" onChange={e => setPassword(e.target.value)} required />
          <span>Password</span>
        </label>
        <label>
          <input className="input-s" type="password" name="confirm_password" onChange={(e)=>setPass(e.target.value)} required />
          <span>Confirm Password</span>
        </label>
        <button className="submit-s"><span>Register</span></button>
        <p className="signin-s">Already have an Account?<br /><br /><Link to="/Login">Login</Link></p>
      </form>
    </center>
  );
}
