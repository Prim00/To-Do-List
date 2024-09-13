import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

import './UserPageStyle.css';
import {Link,useNavigate } from 'react-router-dom';

import moment from 'moment';

function UserPage() {

  function formatTaskTime(time){
    return (moment(time).format("YYYY-MM-DD HH:mm"))
  }
  
  const [userData ,setUserData] = useState({
          firstname : "",
          lastname : "",
          email : "" ,
  })
  const [taskName , setTaskName] =useState("")
  const [taskTime , setTaskTime] =useState("")

  const [allTask , setAllTask] = useState([])

  const navigate = useNavigate();

  async function populateUserPage() {
    const req = await fetch("http://localhost:3030/api/UserPage", {
      headers: { 
        'x-access-token': localStorage.getItem("token")
       },
    });

    const data_user = await req.json();
    if(data_user.status ==="ok"){
      setUserData(data_user.userInfo)

      const req2 = await fetch("http://localhost:3030/getAllTask",{
        headers: {
          "Content-Type" : "application/json" ,
          "x-access-token" : localStorage.getItem("token")
        }
      })

      const data = await req2.json();
      if(data.status ==="ok"){
        const sortedTask = data.tasks.sort((a,b) => new Date(a.time)-new Date(b.time))
        setAllTask(sortedTask)
      }
      else{
        alert("Erreur d'affichage des tâches !");      }
    }
    else{
      alert("User not found or invalide Token ! ")
      navigate("/Login")
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user =jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/Login");
      } else {
        populateUserPage();
      }
    }else{
      navigate("/Login")
    }
  }, [])

async function handleAdd(event){

  event.preventDefault()

  const doTask = {
    name : taskName,
    time : taskTime
  }
  try{
  const response = await fetch("http://localhost:3030/addTask", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
      "x-access-token" : localStorage.getItem("token")
    },
    body : JSON.stringify(doTask)
  })
  const data = await response.json()

    if(data.status ==="ok"){
        alert("Task added Successfully 🥰")
        populateUserPage()
    }
    else{
      alert("Failed ! Task  can not added 😥 ")}
  } catch(e){
    console.log("errrrorrrrrr lors de l'ajout de tache !!!!! 😡")
  }
}

  async function handleDelete(taskId) {
      try{
            const resDelete = await fetch ("http://localhost:3030/deleteTask",{
              method: "DELETE",
              headers:{
                "x-access-token" : localStorage.getItem("token"),
                "Content-Type" : "application/json"
              },
              body:JSON.stringify({id:taskId})
            })

            console.log("response status :" ,resDelete.status)

            const finish = await resDelete.json()

            if(finish.status =="ok"){
                  alert("Task deleted Successfully ")
                  populateUserPage()
            }else{
              alert("Sorry ! we couldn't delete teh task  ")
            }
    }catch(e){
      console.log("error lors du suppression de Task ! " ,e)
  }

}

async function handleUpdate(taskId){

  try{    
      localStorage.setItem("taskId" ,taskId)
      const updatePage = await fetch("http://localhost:3030/api/updateTask",{
          method : "POST",
          headers:{
              "Content-Type" : "application/json",
              "x-access-token" : localStorage.getItem("token")
          },
      })

      const valide = await updatePage.json()

      if(valide.status=="ok"){
        navigate("/UpdatePage")
      }else{
        alert("Token invalide ! ")
        navigate("/Login")
      }

  }catch(e){
      console.log("Erreur lors de la modifiation de tache !! Veuillez verifier svp ! ")
  }


}

  return (
    <>
    <hr />
      <h2 className='welcome'>Welcome {userData.firstname} {userData.lastname} 🤗</h2> 
        <p className='des'> Our app is here to help you </p>
  
    <div className='hole'>
      <form className='container-add' onSubmit={handleAdd} >
        <input type="text" value={taskName} onChange={(e)=>setTaskName(e.target.value)} placeholder='Enter a Task' required />
        <input type="datetime-local" value={taskTime} onChange={(e)=>setTaskTime(e.target.value)} required />
        <button type='submit' className='add'>Add Task</button>
      </form>
    </div>
  
    <ol>
      {allTask.map((task,index)=>(
          <li className='ok' key={index}>
              <span className='name'>{task.name}</span>
              <span className='time'>{formatTaskTime(task.time)}</span>
              <div className='butt'>
                <button id='button-delete' onClick={() => handleDelete(task._id)}>Delete</button>
                <button id='button-update' onClick={()=>handleUpdate(task._id)}>Update</button>
              </div>
          </li>
        ))}
    </ol>
    </>
);
}
export default UserPage
