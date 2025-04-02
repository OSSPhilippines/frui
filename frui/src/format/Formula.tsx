/**
 * Formula Props
 */
export type FormulaProps = { 
  value: string, 
  formula: string,
  data?: Record<string, any> 
};

/**
 * Formula Format Component (Main)
 */
export default function Formula(props: FormulaProps) {
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