//modules
import { useLanguage } from 'r22n';

export type ThemeHeadProps = {
  uri?: string,
  title?: string,
  description?: string,
  styles?: string[]
};

export default function ThemeHead(props: ThemeHeadProps) {
  const { 
    uri = '', 
    title: defaultTitle = 'Free ReactJS UI - FRUI', 
    description = 'FRUI is a suite of free react components you can use without the commitments.',
    styles = []
  } = props;
  const title = defaultTitle === 'Free ReactJS UI - FRUI' 
    ? defaultTitle 
    : `${defaultTitle.trim()} - Free ReactJS UI`;
  const { _ } = useLanguage();
  return (
    <>
      <title>{_(title)}</title>
      <meta name="description" content={_(description)} />
      <meta property="og:title" content={_(title)} />
      <meta property="og:description" content={_(description)} />
      <meta property="og:image" content="https://frui.js.org/frui-icon.png" />
      <meta property="og:url" content={`https://frui.js.org${uri}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@OSSPhilippines" />
      <meta name="twitter:title" content={_(title)} />
      <meta name="twitter:description" content={_(description)} />
      <meta name="twitter:image" content="https://frui.js.org/frui-icon.png" />
      <link rel="shortcut icon" href="https://frui.js.org/favicon.ico" type="image/png" />
      <link rel="icon" href="https://frui.js.org/favicon.ico" type="image/png" />
      <link rel="stylesheet" type="text/css" href="/styles/reset.css" />
      <link rel="stylesheet" type="text/css" href="/styles/globals.css" />
      {styles.map((href, index) => (
        <link key={index} rel="stylesheet" type="text/css" href={href} />
      ))}
    </>
  );
}