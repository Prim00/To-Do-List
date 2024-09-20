import React ,{useState} from 'react'

function FiltreComponent({allTask, handleDelete, handleUpdate , formatTaskTime}) {

    const [filteredListTime, setFilteredListTime] = useState([]);
    
  const [filterTime, setFilterTime] = useState("");

  
  function handleFiltre(e){
    e.preventDefault()
try{
    const value = e.target.value
    setFilterTime(value)
    if(value.trim==""){
        setFilteredListTime([])
    }else{
        const lis = allTask.filter((task)=>{
          const taskDate = new Date(task.time).toISOString().split('T')[0]; 
          return taskDate === value;
        });
        setFilteredListTime(lis)
    }
}catch(e){
    console.log("error lors de filtrage par date !" ,e)
}
  }


  return (
    <>
    <label className='fil'>Filtrer : </label>
      <input  value={filterTime} className="search-d" type="date" placeholder="Date Filtre"  onChange={handleFiltre} />
      <ol>
      {filterTime.trim() !== "" && filteredListTime.length === 0 ? (
          <center><p>Aucune tâche trouvée.</p></center>
        ) : 
        filteredListTime.map((task, index) => (
          <li className="ok" key={index}>
            <span className="name">{task.name}</span>
            <span className="time">{formatTaskTime(task.time)}</span>
            <div className="butt">
              <button id="button-delete" onClick={() => handleDelete(task._id)}>
                Delete
              </button>
              <button id="button-update" onClick={() => handleUpdate(task._id)}>
                Update
              </button>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}

export default FiltreComponent
