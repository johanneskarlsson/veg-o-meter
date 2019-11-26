import React from 'react';
import './App.css';
import SearchBar from './searchBar';
import ListVegetables from './listVegetables';

function App() {

  return (
    <div className="App">
      <h1>Veggo app</h1>
      
      <SearchBar />
      <ListVegetables />
    </div>
  );
}

export default App;
