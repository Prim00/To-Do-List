import React, { useState } from 'react'
import './Contact.css'
import {useNavigate } from 'react-router-dom';



export default function Contact() {

  const [feedmail, setFeedmail] = useState("")
  const [feedtext, setFeedtext] = useState("")
  const navigate= useNavigate()


  async function handlSend(e) {
    e.preventDefault()

    try{
      const inf = ({
        feedmail,
        feedtext
      })
      const env = await fetch("http://localhost:3030/sendFeedback",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify(inf)
      })

      const resu = await env.json()

      if(resu.status=="ok"){
        alert("Thank you for your Feedback ")
        navigate(-1)
      }else{
        alert("Erreur lors d'envoie de FeedBack !! ")
      }

    }catch(e){
      console.log("error lors d'envoie de FeedBack ! ")
    }
  
  }
  return (
    <>
        <form className='formulaire' onSubmit={handlSend} >
            <h3>Your FeedBack is our happiness 😁 </h3>
                <label className='label1'>Your Adress Email : </label>
                    <input value={feedmail} type="text" className='feed' onChange={(e)=>setFeedmail(e.target.value)} placeholder='Enter your Adress Email' required />
                
                <label id='ila'>Description : </label>
                    <textarea value={feedtext} onChange={(e)=>setFeedtext(e.target.value)}  className ="description-text" rows="6" cols="10" required placeholder="Write your description here..." />
                 

                <button type='submit' className='send-button'>Send</button>

            </form>
            

    </>

  )
}
