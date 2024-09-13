import React from 'react'
import './Contact.css'
export default function Contact() {
  return (
    <>
        <form className='formulaire'>
            <h3>Your FeedBack is our happiness 😁 </h3>
                <label className='label1'>Your Adress Email : </label>
                    <input type="text" className='feed' placeholder='Enter your Adress Email'/>
                
                <label id='ila'>Description : </label>
                    <textarea  className ="description-text" rows="6" cols="10" placeholder="Write your description here..."/>
                 

                <button className='send-button'>Send</button>

            </form>
            

    </>

  )
}
