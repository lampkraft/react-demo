import { ISearchItem } from "../../presentational/Search/Search.types";

export interface ISearchContainerState {
	autoCompleteItems: ISearchItem[];
	result: any | null,
	inputValue: string;
	errorMsg: string;
	imageResult: string;
	resultLoading: boolean;
	searchLoading: boolean;
	showDropdown: boolean;
}