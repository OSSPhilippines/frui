//--------------------------------------------------------------------//
// Types

export type HTMLProps = { value: string };

//--------------------------------------------------------------------//
// Components

/**
 * HTML Format Component (Main)
 */
export function HTML({ value }: HTMLProps) {
  return (
    <div dangerouslySetInnerHTML={{ __html: value }} />
  );
};

//defaults to html
export default HTML;