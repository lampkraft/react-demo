import axios from 'axios';

export function getSearchAutocomplete(value: string): Promise<any> {
	return axios.get(`/complete/search?client=firefox&q=${value}`);
}

export function getImage(value: string): Promise<any> {
	return axios.get(`https://pixabay.com/api/?key=13733115-e2a7ae76a1227a1163c6906a4&q=${value}&image_type=photo`);
}
