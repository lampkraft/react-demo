import { ISearchItem } from "../../presentational/search/search.types";

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