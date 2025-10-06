//--------------------------------------------------------------------//
// Imports

import type { JSX } from 'react';

//--------------------------------------------------------------------//
// Types

export type RatingProps = { 
  value: string|number,
  max?: number,
  remainder?: boolean,
  round?: 'round'|'ceil'|'floor'
};

//--------------------------------------------------------------------//
// Components

/**
 * Rating Format Component (Main)
 */
export function Rating(props: RatingProps) {
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

//defaults to rating
export default Rating;