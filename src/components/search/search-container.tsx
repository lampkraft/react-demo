import React, { Component } from 'react';
import { SearchView } from './search-view';
import { getFood, getFoodDetails } from './search.service';
import { ISearchContainerState } from './search.types';
import Alert from 'react-bootstrap/Alert'
import { FoodDetailsView } from '../food-details/food-details-view';

export class SearchContainer extends Component<any>  {
	state: ISearchContainerState = {
		autoCompleteItems: [],
		selectedFoodItemId: null,
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
					searchLoading: false,
				});
			});
	};

	onSelect = (foodId: string): void => {
		const food = this.state.autoCompleteItems.find(item => item.namn === foodId);
		this.setState({
			showDropdown: false,
			inputValue: food && food.namn,
			errorMsg: '',
			searchLoading: true,
			resultLoading: true
		});
		getFoodDetails(foodId)
			.then((response) => {
				console.log('SearchContainer:onSearch: ', response);
				this.setState({
					imageResult: response.data && response.data.hits && response.data.hits[0].largeImageURL,
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
					placeholder="Sök livsmedel"
					loading={this.state.searchLoading}
					clear={this.onClear}></SearchView>
				{this.state.errorMsg && <Alert variant="danger">{this.state.errorMsg}</Alert>}
				<FoodDetailsView loading={this.state.resultLoading} imageResult={this.state.imageResult}></FoodDetailsView>
			</div>
		);
	}
}
