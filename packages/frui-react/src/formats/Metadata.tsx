//types
import type { MetadataProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';

const Metadata: React.FC<MetadataProps> = ({ value }) => {
  return (
    <table>
      <tbody>
        {Object.entries(value).map(([key, value]) => (
          <tr key={key}>
            <td style={{paddingRight: '10px'}}>{key}</td>
            <td style={{paddingLeft: '10px'}}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Metadata;