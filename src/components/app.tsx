import React from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import { FoodDetailsView } from './food-details/food-details-view';
import { SearchContainer } from './search/search-container';

function App() {
  return (
    <div className="app">
      <header className="app-header">
      </header>
      <main className="app-content">
        <div className="app-search">
          <SearchContainer />
        </div>
        <div>
          <FoodDetailsView></FoodDetailsView>
        </div>
      </main>
    </div>
  );
}

export default App;
