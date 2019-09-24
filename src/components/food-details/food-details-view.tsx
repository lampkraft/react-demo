import React from 'react';
import './food-details.css';
import Spinner from 'react-bootstrap/Spinner'

export interface IFoodDetailsView {
	imageResult: string,
	loading: boolean
}

export function FoodDetailsView(props: IFoodDetailsView) {
	return (
		<div className="food-details-container">
			{!props.loading && (props.imageResult ? <img alt="Sökresultat" src={props.imageResult} /> : <span className="no-image-text">Sök efter något!</span>)}
			{props.loading && <Spinner animation="border" />}
		</div>
	);
}