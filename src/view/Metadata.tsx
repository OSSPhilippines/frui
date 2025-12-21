//--------------------------------------------------------------------//
// Imports

//types
import type { CSSProperties } from 'react';

//--------------------------------------------------------------------//
// Types

export type MetadataProps = { 
  style?: CSSProperties,
  className?: string,
  value: Record<string, string|number>
};

//--------------------------------------------------------------------//
// Components

/**
 * Metadata Component (Main)
 */
export function Metadata({ className, style, value }: MetadataProps) {
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
export default Metadata;