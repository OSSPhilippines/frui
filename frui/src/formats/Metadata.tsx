//types
import type { MetadataProps } from '../types/formats';

export default function Metadata({ value }: MetadataProps) {
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