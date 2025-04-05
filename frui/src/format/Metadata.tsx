//types
import type { CSSProperties } from 'react';

export type MetadataProps = { 
  style?: CSSProperties,
  className?: string,
  value: Record<string, string|number>
};

/**
 * Metadata Format Component (Main)
 */
export default function Metadata({ className, style, value }: MetadataProps) {
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