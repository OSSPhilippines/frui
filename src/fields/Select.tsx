//types
import type { 
  SelectDropdownProps, 
  SelectOption, 
  SelectProps 
} from '../types/fields';
//components
import Input from './Input';
//hooks
import useSelect from '../hooks/useSelect';

/**
 * Select Dropdown
 */
export function Dropdown(props: SelectDropdownProps) {
  const { 
    show, 
    searchable,
    select, 
    search, 
    match 
  } = props;

  //we need to change from {k:v} to [{value: k, label: v}]
  const options: SelectOption[] = (
    typeof props.options === 'object' && !Array.isArray(props.options)
  ) ? Object.keys(props.options).map(value => ({ 
    value, label: (props.options as Record<string, string>)[value] 
  })) : props.options;

  const style = !show ? { display: 'none' }: undefined;

  return (
    <div className="field-select-dropdown" style={style}>
      {searchable && (
        <div className="field-select-search">
          <Input className="field-select-search-control" onKeyUp={search} />
          <span className="field-select-search-icon">
            <i className="fas fa-search"></i>
          </span>
        </div>
      )}
      <div className="field-select-options">
        {options.filter(match).map((option, i) => (
          <div 
            key={i} 
            onClick={_ => select(option)} 
            className="field-select-option"
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Styled Select  Component (Main)
 */
export default function Select(props: SelectProps) {
  const { 
    options,
    searchable,
    value,
    defaultValue,
    placeholder = 'Choose an Option',
    error, 
    className,
    style,
    onDropdown,
    onSelected,
    onUpdate
  } = props;

  const { selected, showing, handlers } = useSelect({
    value,
    defaultValue,
    onDropdown,
    onSelected,
    onUpdate
  });

  const classNames = [ 'field-select' ];
  if (className) {
    classNames.push(className);
  }

  const placeholderClass = [ 'field-select-placeholder' ];
  if (error) {
    placeholderClass.push('tx-error', 'bd-error');
  }

  return (
    <div className={classNames.join(' ')} style={style}>
      <div className="field-select-control" onClick={handlers.toggle}>
        {value?.label || selected?.label || (
          <span className={placeholderClass.join(' ')}>
            {placeholder}
          </span>
        )}
      </div>
      <Dropdown 
        options={options} 
        show={showing} 
        error={error}
        searchable={searchable} 
        select={handlers.select} 
        search={handlers.search} 
        match={handlers.match} 
      />
    </div>
  );
};