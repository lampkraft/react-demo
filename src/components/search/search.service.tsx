import { foodSearchAutoCompleteUrl } from "../../environment";
import axios from 'axios';

export function getFood(name: string): Promise<any> { // IFoodAutoComplete[]
	return axios.get(`${foodSearchAutoCompleteUrl}?sokOrd=${name}&soktyp=1&_=1564687838842`);
}

export function getFoodDetails(foodName: string): Promise<any> { // IFoodAutoComplete[]
	return axios.get(`https://pixabay.com/api/?key=13733115-e2a7ae76a1227a1163c6906a4&q=${foodName}&image_type=photo`);
}
