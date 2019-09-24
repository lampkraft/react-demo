import React from 'react';
import ReactDOM from 'react-dom';
import { SearchView } from '../search-view';

describe('Examining the syntax of Jest tests', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<SearchView showDropdown={false}
				search={() => { }}
				select={() => { }}
				inputValue={'TestSearchString'}
				autoCompleteItems={[]}
				placeholder="Sök livsmedel"
				loading={false}
				clear={() => { }}></SearchView>
			, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
