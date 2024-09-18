import React, { useState } from 'react'
import "./ResetPassStyle.css"


function ResetPass() {

    const [email ,setEmail] = useState("")


    async function handleSubmit(e){
     
        e.preventDefault()
        try{

        const info = await fetch("http://localhost:3030/reset-password",{
            method:"POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email})
        })

        const reponse = await info.json()
        if(reponse.status=="ok"){
            alert("veuillez consuler votre mailTrap to Reset yout Password 😋")
            console.log(reponse.status)

        }else{
            console.log(reponse.message)
        }
    }catch(e){
        console.log("error de reinitialisation de mot de passe" , e)
    }
    }
  return (
    <>  
        <form className='reset-container' onSubmit={handleSubmit}>
            <h2 className='pa'>Reset Password</h2>
            <h5 className='para'>To reset your password, please enter your email address in the field provided. 
                We will send you an email with a link to reset your password. 
                Once you receive the email, simply click the link and follow the instructions to create a new password. 
                If you do not receive the email, please check your spam folder or try again.
            </h5>
            <input type="text" className='email-pass' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter your Email' required/><br />
            <button className='button-reset-pass'>Send</button>
            
        </form>
      
    </>
  )
}

export default ResetPass