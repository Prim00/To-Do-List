import React, { useState } from 'react'
import "./UpdatePageStyle.css"
import { useNavigate } from 'react-router-dom'

function UpdatePage() {

    const [newName , setNewName] = useState("")
    const [newTime , setNewTime] = useState("")

    const navigate =useNavigate()

    async function handleUpdate(event){

        event.preventDefault()

        try{   
            const data = ({
                newName,
                newTime
            })

            const updatePage = await fetch("http://localhost:3030/updateTask",{
                method : "PUT",
                headers:{
                    "Content-Type" : "application/json",
                    "x-task-id" : localStorage.getItem("taskId")
                },
                body : JSON.stringify(data)
            })

            console.log("reponse status : " ,data.status)

            const resUpdate = await updatePage.json()

            if(resUpdate.status == "ok"){
                alert("Task Updated Succesfully ")
                navigate("/UserPage")
            }else{  
                alert("Erreur while updating the task ! ")
            }
        }catch(e){
            console.log("Erreur lors de la modifiation de tache !! Veuillez verifier svp ! ")
        }
}

  return (
    <>
    
        <form  className="update-container" onSubmit={handleUpdate}>
            <h2 className='title-task'>Update your Task</h2>
            <div className='name-update'>
                <label className='task-name'>Task Name : </label><br />
                <input type="text" className="input-name" value={newName} onChange={(e)=>setNewName(e.target.value)} required />
            </div>
            <div className='time-update'>
                <label id='task-name'>Task Time :</label><br />
                <input type="datetime-local" className="input-name" value={newTime} onChange={(e)=>setNewTime(e.target.value)}  required />
            </div>
            <button id='update' type='sumbit'>Save Change</button>
        </form>
      
    </>
  )
}

export default UpdatePage
