//--------------------------------------------------------------------//
// Imports

//types
import type { CSSProperties } from 'react';

//--------------------------------------------------------------------//
// Types

export type MetadataFormatProps = { 
  style?: CSSProperties,
  className?: string,
  value: Record<string, string|number>
};

//--------------------------------------------------------------------//
// Components

/**
 * MetadataFormat Component (Main)
 */
export function MetadataFormat({ className, style, value }: MetadataFormatProps) {
  return (
    <table>
      <tbody>
        {Object.entries(value).map(([key, value]) => (
          <tr key={key}>
            <td className={className} style={style}>{key}</td>
            <td className={className} style={style}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

//defaults to metadata format
export default MetadataFormat;