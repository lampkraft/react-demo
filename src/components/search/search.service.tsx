import { foodSearchAutoCompleteUrl, foodSearchDetailsUrl } from "../../environment";
import axios from 'axios';

export function getFood(name: string): Promise<any> { // IFoodAutoComplete[]
	return axios.get(`${foodSearchAutoCompleteUrl}?sokOrd=${name}&soktyp=1&_=1564687838842`);
}

export function getFoodDetails(foodId: number): Promise<any> { // IFoodAutoComplete[]
	return axios.post(foodSearchDetailsUrl, { livsmedelsId: "2507", naringsamneId: "0" });
}
