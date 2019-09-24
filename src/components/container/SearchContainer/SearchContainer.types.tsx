import { ISearchItem } from "../../presentational/Search/Search.types";

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