export interface ISearchItem {
	id: string;
	value: string;
}

export interface ISearchViewProps {
	search: Function;
	select: Function;
	showDropdown: boolean;
	autoCompleteItems: ISearchItem[];
	placeholder: string;
	loading: boolean;
	inputValue: string;
	clear: Function;
}

export interface ISearchContainerState {
	autoCompleteItems: ISearchItem[];
	result: any | null,
	showDropdown: boolean;
	inputValue: string;
	errorMsg: string;
	imageResult: string;
	resultLoading: boolean;
	searchLoading: boolean;
}

export interface ImageResultViewProps {
	imageResult: string,
	loading: boolean
}