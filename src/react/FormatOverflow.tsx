//types
import type { FormatOverflowProps } from '../types';
//react
import React from 'react';

const FormatOverflow: React.FC<FormatOverflowProps> = (props) => {
  const { value, length, words, hellip } = props;
  if (words) {
    const words = value.split(' ');
    if (length && words.length > length) {
      return (
        <>
          {words.slice(0, length).join(' ')}
          {hellip && (<>&hellip;</>)}
        </>
      );
    }

    return (<>{value}</>);
  }

  if (length && value.length > length) {
    return (
      <>
        {value.slice(0, length)}
        {hellip && (<>&hellip;</>)}
      </>
    );
  }

  return (<>{value}</>);
};

export default FormatOverflow;