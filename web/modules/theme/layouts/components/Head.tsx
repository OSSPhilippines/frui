import HTMLHead from 'next/head';
import { useLanguage } from 'r22n';

export default function Head(props: {
  uri?: string;
  title?: string;
  description?: string;
}) {
  const { 
    uri = '', 
    title: defaultTitle = 'Free ReactJS UI - FRUI', 
    description = 'FRUI is a suite of free react components you can use without the commitments.'
  } = props;
  const title = defaultTitle === 'Free ReactJS UI - FRUI' 
    ? defaultTitle 
    : `${defaultTitle.trim()} - Free ReactJS UI`;
  const { _ } = useLanguage();
  return (
    <HTMLHead>
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
    </HTMLHead>
  );
}