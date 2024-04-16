//types
import type { 
  AutocompleteDropdownProps, 
  AutocompleteProps 
} from '../types/fields';
//components
import Input from './Input';
//hooks
import useAutocomplete  from '../hooks/useAutocomplete';

/**
 * Autocomplete Dropdown
 */
export function Dropdown(props: AutocompleteDropdownProps) {
  const { 
    options, 
    show, 
    select, 
    match 
  } = props;

  const style = !show ? { display: 'none' }: undefined;

  return (
    <div className="field-autocomplete-dropdown" style={style}>
      <div className="field-autocomplete-options">
        {options.filter(match).map((option, i) => (
          <div 
            key={i} 
            onClick={_ => select(option)} 
            className="field-autocomplete-option"
          >
            {option.label || option.value}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Autocomplete  Component (Main)
 */
export default function Autocomplete(props: AutocompleteProps) {
  const { 
    options,
    error, 
    className,
    style,
    defaultValue,
    onQuery,
    onDropdown,
    onChange,
    onUpdate,
    ...attributes
  } = props;
  const { value, showing, handlers } = useAutocomplete({
    defaultValue,
    onQuery,
    onDropdown,
    onChange,
    onUpdate
  });
  //variables
  const classNames = [ 'field-autocomplete' ];
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')} style={style}>
      <Input 
        onBlur={handlers.blur}
        onKeyDown={handlers.search}
        onChange={handlers.update}
        {...attributes}
        value={value}
      />
      <Dropdown 
        options={options} 
        show={showing} 
        select={handlers.select} 
        match={handlers.match} 
      />
    </div>
  );
};