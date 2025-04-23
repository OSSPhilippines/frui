import React, { useState, useEffect, useRef } from 'react';

interface MultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: string[];
  custom?: boolean;
  searchable?: boolean;
  name?: string;
  placeholder?: string;
}

export default function MultiSelect({
  options = [],
  custom = false,
  searchable = false,
  className = '',
  name = '',
  placeholder = 'Select an option',
  ...htmlProps
}: MultiSelectProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  //update filtered options based on input and searchable prop
  useEffect(() => {
    let filtered: string[] = [];
    if (searchable && inputValue) {
      const query = inputValue.toLowerCase();
      filtered = options.filter(
        (option) =>
          option.toLowerCase().includes(query) && !selected.includes(option)
      );
    } else {
      filtered = options.filter((option) => !selected.includes(option));
    }
    setFilteredOptions(filtered);
  }, [inputValue, options, selected, searchable]);

  //handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setInputValue('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isDropdownOpen && (searchable || custom)) {
      setIsDropdownOpen(true);
    }
  };

  //add a tag
  const addTag = (tag: string) => {
    tag = tag.trim();
    if (!tag || selected.includes(tag)) return;

    //allow adding only if tag is in options or custom is true
    if (custom || options.includes(tag)) {
      setSelected([...selected, tag]);
      setInputValue('');
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    }
  };

  //remove a tag
  const removeTag = (index: number) => {
    setSelected(selected.filter((_, i) => i !== index));
    inputRef.current?.blur();
  };

  //handle keydown (Enter or Tab to add tag)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', 'Tab'].includes(e.key)) {
      e.preventDefault();
      if (inputValue && (custom || options.includes(inputValue))) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && selected.length > 0) {
      //remove last tag on backspace when input is empty
      removeTag(selected.length - 1);
    }
  };

  //toggle dropdown
  const toggleDropdown = () => {
    if (filteredOptions.length > 0 || custom || searchable) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div
      className={`frui-field-multiselect ${className}`}
      role="combobox"
      aria-multiselectable="true"
      aria-expanded={isDropdownOpen}
      {...htmlProps}
      ref={wrapperRef}
    >
      <div className="frui-field-multiselect-control" onClick={toggleDropdown}>
        {selected.length > 0 ? (
          selected.map((tag, index) => (
            <span key={index} className="frui-field-multiselect-tag">
              {tag}
              <button
                type="button"
                className="frui-field-multiselect-tag-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))
        ) : (
          <span className="frui-field-multiselect-placeholder">
            {placeholder}
          </span>
        )}
      </div>

      <div
        className="frui-field-multiselect-dropdown"
        style={{ display: isDropdownOpen ? 'block' : 'none' }}
      >
        {(searchable || custom) && (
          <div className="frui-field-multiselect-search">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="frui-field-multiselect-search-control"
              placeholder={placeholder}
              aria-autocomplete={searchable ? 'list' : 'none'}
              autoFocus
            />
          </div>
        )}
        {filteredOptions.length > 0 && (
          <div className="frui-field-multiselect-options">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className="frui-field-multiselect-option"
                onClick={() => addTag(option)}
                role="option"
                aria-selected={selected.includes(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {selected.map((tag, index) => (
        <input key={index} type="hidden" name={`${name}[]`} value={tag} />
      ))}
    </div>
  );
};