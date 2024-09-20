
import React, { useState } from 'react';


function SearchComponent({ allTask, handleDelete, handleUpdate , formatTaskTime }) {

  const [filteredList, setFilteredList] = useState([]);
 
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    try {
        const value = e.target.value
        setSearchQuery(value)

    if (value.trim() === "") {
            setFilteredList([]);

    }else {
      const newlist = allTask.filter((task) => task.name.toLowerCase().includes(value.toLowerCase()));
    
      setFilteredList(newlist);
    }

    } catch (error) {
      console.log("Erreur lors de la recherche de Task !");
    }
  };


  return (
    <div>
        <form className="search-c">
            <input  value={searchQuery} className="search-i" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
            
        </form>

        <br />

      <ol>
      {searchQuery.trim() !== "" && filteredList.length === 0 ? (
          <center><p>Aucune tâche trouvée.</p></center>
        ) : 
        filteredList.map((task, index) => (
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
    </div>
  );
}

export default SearchComponent;
