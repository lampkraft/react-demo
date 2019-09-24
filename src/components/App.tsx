import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchContainer } from './container/SearchContainer/SearchContainer';

function App() {
  return (
    <div className="app">
      <header className="app-header">
      </header>
      <main className="app-content">
        <div className="app-search">
          <SearchContainer />
        </div>
      </main>
    </div>
  );
}

export default App;
