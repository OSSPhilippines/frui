//types
import type { FormatOverflowProps } from '../types';
//react
import React from 'react';

const FormatOverflow: React.FC<FormatOverflowProps> = (props) => {
  const { value, length, words, hellip } = props;
  const count = typeof length === 'string' ? Number(length) || undefined : length;
  if (words) {
    const words = value.split(' ');
    if (count && words.length > count) {
      return (
        <>
          {words.slice(0, count).join(' ')}
          {hellip && (<>&hellip;</>)}
        </>
      );
    }

    return (<>{value}</>);
  }

  if (count && value.length > count) {
    return (
      <>
        {value.slice(0, count)}
        {hellip && (<>&hellip;</>)}
      </>
    );
  }

  return (<>{value}</>);
};

export default FormatOverflow;