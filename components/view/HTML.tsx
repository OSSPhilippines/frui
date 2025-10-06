//--------------------------------------------------------------------//
// Types

export type ClassStyleProps = { value: string };

//--------------------------------------------------------------------//
// Components

/**
 * HTML Format Component (Main)
 */
export function HTML({ value }: ClassStyleProps) {
  return (
    <div dangerouslySetInnerHTML={{ __html: value }} />
  );
};

//defaults to html
export default HTML;