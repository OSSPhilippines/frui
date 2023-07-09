//types
import type { MetadataProps }from 'frui-core/dist/types/formats';
//react
import React from 'react';

const Metadata: React.FC<MetadataProps> = ({ value }) => {
  return (
    <table>
      <tbody>
        {Object.entries(value).map(([key, value]) => (
          <tr key={key}>
            <td className="pr-[10px]">{key}</td>
            <td className="pl-[10px]">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Metadata;