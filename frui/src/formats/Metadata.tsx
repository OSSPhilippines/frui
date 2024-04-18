//types
export type MetadataProps = { value: Record<string, string|number> };

/**
 * Metadata Format Component (Main)
 */
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