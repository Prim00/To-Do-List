import React from 'react'
import { useState } from 'react'
import './ResetPageStyle.css'
import { redirect, useNavigate, useParams } from 'react-router-dom'


 function ResetPage() {

    const [newPassword,setNewPassword] = useState()

    const {token} = useParams()
    const navigate = useNavigate()




async function handleSubmit(e){
    e.preventDefault()

    try{

        const resp = await fetch("http://localhost:3030/api/ResetPage",{
            method :"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({newPassword,token})
        })

        const final = await resp.json()

        if(final.status =="ok"){
            alert("Congrat ! Password has been changed successfully ")

        }else{
            return console.log(final.message)
        }

    }catch(e){
        console.log("erreur lors de reset new password ! ", e)
    }
}

  return (
    <>  
        <form  className="formulaire-pass" onSubmit={handleSubmit}>
            <h2 className='pa'>Reset Password</h2>
            <label className='new'>New Password</label>
            <input type="password" className='i-p' onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} placeholder='Enter ur new Password' required/><br />
            <button type='submit' className='b-r'>Submit</button>
        </form>
</>
  )
}

export default ResetPage
