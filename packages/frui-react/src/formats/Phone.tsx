//types
import type { PhoneProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';
//components
import Link from './Link';

const Phone: React.FC<PhoneProps> = ({ value, ...attributes }) => {
  return (
    <Link {...attributes} value={`tel:${value}`}>
      {value}
    </Link>
  );
};

export default Phone;