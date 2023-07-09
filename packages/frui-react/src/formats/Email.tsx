//types
import type { EmailProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';
//components
import Link from './Link';

const Email: React.FC<EmailProps> = ({ value, ...attributes }) => {
  return (
    <Link {...attributes} value={`mailto:${value}`}>
      {value}
    </Link>
  );
};

export default Email;