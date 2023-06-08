//types
import type { FormatFormulaProps } from '../types';
//react
import React from 'react';

const FormatFormula: React.FC<FormatFormulaProps> = (props) => {
  const { value, data = {}, formula } = props;
  let calculations = formula.replace(/\{this\}/, String(Number(value) || 0));
  //replace templates from the dataset
  for (const key in data) {
    calculations = calculations.replace(
      new RegExp(`\\{${key}\\}`), 
      String(Number(data[key]) || 0)
    );
  }
  //remove all other variables
  calculations = calculations.replace(/\{[^\}]*\}/, '0');
  let solution = 0;
  try {
    solution = eval(`(${calculations})`);
  } catch (e) {}
  return (<>{solution}</>);
};

export default FormatFormula;