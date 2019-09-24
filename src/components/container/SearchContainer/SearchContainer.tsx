import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert'
import { ISearchContainerState } from './SearchContainer.types';
import { ImageResultView } from '../../presentational/ImageResult/ImageResult';
import { Search } from '../../presentational/Search/Search';
import { getSearchAutocomplete, getImage } from './SearchContainer.service';

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
		this.setState({
			searchLoading: true,
			inputValue: value
		});
		if (value !== '') {
			getSearchAutocomplete(value)
				.then((response) => {
					this.setState({
						autoCompleteItems: response.data[1].map((itemName: string) => { return { id: itemName, value: itemName } }),
						showDropdown: this.state.autoCompleteItems.length > 0 && this.state.inputValue !== '',
					});
				})
				.catch((err) => {
					this.setState({
						errorMsg: err.message,
					});
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
					const image = response.data && response.data.hits && response.data.hits[0] && response.data.hits[0].largeImageURL;
					if (!image) {
						throw new Error(`Could not find any image related to "${selectedItem.value}"`);
					}
					this.setState({
						imageResult: image,
					});
				})
				.catch((err: Error) => {
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
		const { inputValue, imageResult, resultLoading, autoCompleteItems, searchLoading, errorMsg, showDropdown } = this.state;
		return (
			<div>
				<Search showDropdown={showDropdown}
					search={this.onSearch}
					select={this.onSelect}
					inputValue={inputValue}
					autoCompleteItems={autoCompleteItems}
					placeholder="Search for anything"
					loading={searchLoading}
					clear={this.onClear}></Search>
				{!searchLoading && errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
				<div>
					<ImageResultView loading={resultLoading} imageResult={imageResult}></ImageResultView>
				</div>
			</div>
		);
	}
}
