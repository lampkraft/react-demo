import React from 'react';
import './ImageResult.css';
import Spinner from 'react-bootstrap/Spinner'
import { ImageResultViewProps } from './ImageResult.types';

export function ImageResultView(props: ImageResultViewProps) {
	return (
		<div className="image-result-container">
			{!props.loading && (props.imageResult ? <img alt="Sökresultat" src={props.imageResult} /> : <span className="no-image-text">Sök efter något!</span>)}
			{props.loading && <Spinner animation="border" />}
		</div>
	);
}