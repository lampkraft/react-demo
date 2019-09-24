import React from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

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
