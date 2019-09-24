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