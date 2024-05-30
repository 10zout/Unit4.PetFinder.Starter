import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/pets')
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pet Finder</h1>
        <ul>
          {pets.map(pet => (
            <li key={pet.id}>
              {pet.name} - {pet.breed} - age: {pet.age}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
