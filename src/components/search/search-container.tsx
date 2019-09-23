import React, { Component } from 'react';
import { SearchView } from './search-view';
import { getFood, getFoodDetails } from './search.service';
import { ISearchContainerState } from './search.types';
import Alert from 'react-bootstrap/Alert'

export class SearchContainer extends Component<any>  {
	state: ISearchContainerState = {
		autoCompleteItems: [],
		selectedFoodItemId: null,
		result: null,
		showDropdown: false,
		loading: false,
		inputValue: '',
		errorMsg: ''
	};

	onSearch = (value: string): void => {
		console.log('searching ', value);
		this.setState({
			loading: true,
			inputValue: value
		});
		getFood(value)
			.then((response) => {
				console.log('SearchContainer:onSearch: ', response);
				this.setState({
					autoCompleteItems: [...response.data],
					showDropdown: this.state.autoCompleteItems.length > 0 && this.state.inputValue !== '',
				});
			})
			.catch((err) => {
				console.error('SearchContainer:onSearch: ', err);
			})
			.finally(() => {
				this.setState({
					loading: false,
				});
			});
	};

	onSelect = (foodId: number): void => {
		const food = this.state.autoCompleteItems.find(item => item.id === foodId);
		this.setState({
			showDropdown: false,
			inputValue: food && food.namn,
			errorMsg: '',
			loading: true
		});
		getFoodDetails(foodId)
			.then((response) => {
				console.log('SearchContainer:onSearch: ', response);
				this.setState({
					result: [...response.data],
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
					loading: false,
				});
			});
	};

	onClear = () => {
		this.setState({
			showDropdown: false,
			inputValue: '',
			errorMsg: '',
			loading: false
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
					placeholder="Sök livsmedel"
					loading={this.state.loading}
					clear={this.onClear}></SearchView>
				{this.state.errorMsg && <Alert variant="danger">{this.state.errorMsg}</Alert>}
				{this.state.result}
			</div>
		);
	}
}
