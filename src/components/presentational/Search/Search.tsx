import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import './Search.css';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button';
import { ISearchProps } from './Search.types';

library.add(faSearch);
library.add(faTimes);

export function Search(props: ISearchProps) {

  const { search, clear, select, placeholder, inputValue, loading, showDropdown, autoCompleteItems } = props;
  let searchValue: string = '';

  const onSearch = (event: any): void => {
    searchValue = event.target.value;
    search(searchValue);
  };

  const onSelect = (eventKey: string, _event: Object): void => {
    select(eventKey);
  }

  const onClear = (): void => {
    clear();
  }

  return (
    <div className="SearchWrapper">
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>
            {loading ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon icon="search" />}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder={placeholder}
          onChange={onSearch}
          value={inputValue}
          aria-label={placeholder}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={onClear}><FontAwesomeIcon icon="times" /></Button>
        </InputGroup.Append>
        <div className="Autocomplete">
          <Dropdown show={showDropdown}>
            <Dropdown.Menu>
              {autoCompleteItems
                .map(item =>
                  <Dropdown.Item
                    onSelect={onSelect}
                    key={item.id}
                    eventKey={item.id}>
                    {item.value}
                  </Dropdown.Item>
                )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </InputGroup>
    </div>
  );
}
