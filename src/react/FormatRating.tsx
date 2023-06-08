//types
import type { FormatRatingProps } from '../types';
//react
import React from 'react';

const FormatRating: React.FC<FormatRatingProps> = (props) => {
  const {
    value,
    max,
    remainder,
    round,
  } = props;
  const rating = round === 'round' ? Math.round(Number(value)) 
    : round === 'ceil' ? Math.ceil(Number(value))
    : round === 'floor' ? Math.floor(Number(value))
    : Math.round(Number(value));
  const stars: JSX.Element[] = [];
  for (let i = 0; i < (max || rating); i++) {
    if (i < rating) {
      stars.push(<span key={i}>★</span>);
    } else if(remainder) {
      stars.push(<span key={i}>☆</span>);
    }
  }
  return (<>{stars}</>);
};

export default FormatRating;