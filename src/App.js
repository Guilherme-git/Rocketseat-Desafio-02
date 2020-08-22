import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositorie, setRepositorie] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositorie(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Maria",
      url: "aaaaa",
      "techs": ["bbbbb","cccc"]
    });
  
    setRepositorie([...repositorie, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRepositorie(repositorie.filter(
      repository => repository.id != id
    ))
  }

  return (
    <div>
   
      <ul data-testid="repository-list">
        {repositorie.map(res =>  
          <li key={res.id}>
            {res.title}

            <button onClick={() => handleRemoveRepository(res.id)}>
              Remover
            </button>
          </li> 
        )}
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
