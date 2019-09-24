import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import './ImageResult.css';
import { ImageResultViewProps } from './ImageResult.types';

export function ImageResultView(props: ImageResultViewProps) {
	return (
		<div className="ImageResultContainer">
			{!props.loading && (props.imageResult ? <img alt="Search image" src={props.imageResult} /> : <span className="ImageResultNoImageText">Image from search query shown here</span>)}
			{props.loading && <Spinner animation="border" />}
		</div>
	);
}