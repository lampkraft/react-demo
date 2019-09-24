import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import './search-view.css';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button';

library.add(faSearch);
library.add(faTimes);

export function SearchView(props: ISearchViewProps) {

  let searchValue: string = '';

  const onSearch = (event: any): void => {
    searchValue = event.target.value;
    props.search(searchValue);
  };

  const onSelect = (eventKey: string, _event: Object): void => {
    props.select(eventKey);
  }

  const onClear = (): void => {
    props.clear();
  }

  return (
    <div className="search-wrapper">
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>
            {props.loading ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon icon="search" />}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder={props.placeholder}
          onChange={onSearch}
          value={props.inputValue}
          aria-label={props.placeholder}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={onClear}><FontAwesomeIcon icon="times" /></Button>
        </InputGroup.Append>
        <div className="prevent-blur autocomplete">
          <Dropdown show={props.showDropdown}>
            <Dropdown.Menu>
              {props.autoCompleteItems
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
