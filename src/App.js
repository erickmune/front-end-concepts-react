import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repository, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      console.log(response.data);
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Projeto de CNAB',
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs',
      techs: ['React', 'Node.js', 'Insomnia']
    });

    setRepositories([...repository, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repository.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repo => 
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
