import { FocusEvent } from "react";

export interface ISearchViewProps {
	search: Function;
	select: Function;
	showDropdown: boolean;
	autoCompleteItems: IFoodAutoComplete[];
	placeholder: string;
	loading: boolean;
	inputValue: string;
	clear: Function;
}

export interface IFoodAutoComplete {
	id: number;
	namn: string;
	arLivsmedel: boolean;
	bildtyp: number;
}

export interface ISearchContainerState {
	autoCompleteItems: IFoodAutoComplete[],
	selectedFoodItemId: string | null,
	result: any | null,
	showDropdown: boolean;
	inputValue: string;
	errorMsg: string;
	imageResult: string;
	resultLoading: boolean;
	searchLoading: boolean;
}