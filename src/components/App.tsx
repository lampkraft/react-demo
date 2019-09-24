import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { SearchContainer } from './container/SearchContainer/SearchContainer';

function App() {
  return (
    <div className="App">
      <main className="AppContent">
        <SearchContainer />
      </main>
    </div>
  );
}

export default App;
