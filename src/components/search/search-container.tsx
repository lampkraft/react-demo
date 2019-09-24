import React, { Component } from 'react';
import { SearchView } from './search-view';
import { getSearchAutocomplete, getImage } from './search.service';
import { ISearchContainerState } from './search.types';
import Alert from 'react-bootstrap/Alert'
import { ImageResultView } from '../image-result/image-result-view';

export class SearchContainer extends Component<any>  {
	state: ISearchContainerState = {
		autoCompleteItems: [],
		result: null,
		showDropdown: false,
		searchLoading: false,
		resultLoading: false,
		inputValue: '',
		errorMsg: '',
		imageResult: ''
	};

	onSearch = (value: string): void => {
		console.log('searching ', value);
		this.setState({
			searchLoading: true,
			inputValue: value
		});
		if (value !== '') {
			getSearchAutocomplete(value)
				.then((response) => {
					console.log('SearchContainer:onSearch: ', response);
					this.setState({
						autoCompleteItems: response.data[1].map((itemName: string) => { return { id: itemName, value: itemName } }),
						showDropdown: this.state.autoCompleteItems.length > 0 && this.state.inputValue !== '',
					});
				})
				.catch((err) => {
					console.error('SearchContainer:onSearch: ', err);
				})
				.finally(() => {
					this.setState({
						searchLoading: false,
					});
				});
		} else {
			this.setState({
				imageResult: null
			});
		}
	};

	onSelect = (selectedItemId: string): void => {
		const selectedItem = this.state.autoCompleteItems.find(item => item.id === selectedItemId);
		if (selectedItem && selectedItem.value) {
			this.setState({
				showDropdown: false,
				inputValue: selectedItem.value,
				errorMsg: '',
				searchLoading: true,
				resultLoading: true
			});
			getImage(selectedItem.value)
				.then((response: any) => {
					console.log('SearchContainer:onSearch: ', response);
					const image = response.data && response.data.hits && response.data.hits[0] && response.data.hits[0].largeImageURL;
					if (!image) {
						throw new Error(`Could not find any image related to "${selectedItem.value}"`);
					}
					this.setState({
						imageResult: image,
					});
				})
				.catch((err: Error) => {
					console.error('SearchContainer:onSearch: ', err);
					this.setState({
						errorMsg: err.message,
					});
				})
				.finally(() => {
					this.setState({
						searchLoading: false,
						resultLoading: false
					});
				});
		} else {
			throw new Error('Could not find the selected item');
		}
	};

	onClear = () => {
		this.setState({
			showDropdown: false,
			inputValue: '',
			errorMsg: '',
			imageResult: null,
			searchLoading: false,
			resultLoading: false
		});
	}

	render() {
		return (
			<div>
				<SearchView showDropdown={this.state.showDropdown}
					search={this.onSearch}
					select={this.onSelect}
					inputValue={this.state.inputValue}
					autoCompleteItems={this.state.autoCompleteItems}
					placeholder="Search for anything"
					loading={this.state.searchLoading}
					clear={this.onClear}></SearchView>
				{this.state.errorMsg && <Alert variant="danger">{this.state.errorMsg}</Alert>}
				<ImageResultView loading={this.state.resultLoading} imageResult={this.state.imageResult}></ImageResultView>
			</div>
		);
	}
}
