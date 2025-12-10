//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';
//frui
import Box from 'src/base/Box.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/tool/box';
const title = 'Box Tool';
const description = 'The box tool provides a flexible container '
  + 'component with various styling options.';


export type DimensionSizeProps = {
  h?: string | number,
  w?: string | number,
  minh?: string | number,
  minw?: string | number,
  maxh?: string | number,
  maxw?: string | number
};

const props = [
  [ 'align', 'string', 'No', 'Custom text align value to apply to the box' ],
  [ 'applyColor', 'ColorTypeProp', 'No', 'Specifies which color type to apply (txc, bgc, bdc). Default is txc' ],
  [ 'applySize', 'SizeTypeProp', 'No', 'Specifies which size type to apply (txs, pa, ma, ba). Default is txs' ],
  [ 'asChild', 'boolean', 'No', 'If true, applies styles to the child element directly' ],
  [ 'ba', 'string | number', 'No', 'Border all sides size value to apply to the box' ],
  [ 'bb', 'string | number', 'No', 'Border bottom size value to apply to the box' ],
  [ 'bdc', 'string', 'No', 'Border color value to apply to the box' ],
  [ 'bdStyle', 'string', 'No', 'Custom border style value to apply to the box' ],
  [ 'bgc', 'string', 'No', 'Background color value to apply to the box' ],
  [ 'bl', 'string | number', 'No', 'Border left size value to apply to the box' ],
  [ 'black', 'boolean', 'No', 'If true, applies the black color to the box' ],
  [ 'block', 'boolean', 'No', 'If true, sets display to block' ],
  [ 'br', 'string | number', 'No', 'Border right size value to apply to the box' ],
  [ 'bt', 'string | number', 'No', 'Border top size value to apply to the box' ],
  [ 'bx', 'string | number', 'No', 'Border horizontal size value to apply to the box' ],
  [ 'by', 'string | number', 'No', 'Border vertical size value to apply to the box' ],
  [ 'center', 'boolean', 'No', 'If true, centers text inside the box' ],
  [ 'children', 'ReactNode', 'No', 'Child elements to be rendered inside the box' ],
  [ 'className', 'string', 'No', 'Additional class names to apply to the box' ],
  [ 'color', 'string', 'No', 'Custom color value to apply to the box' ],
  [ 'curved', 'boolean', 'No', 'If true, applies curved border radius to the box' ],
  [ 'dashed', 'boolean', 'No', 'If true, applies dashed border style to the box' ],
  [ 'display', 'string', 'No', 'Custom display value to apply to the box' ],
  [ 'dotted', 'boolean', 'No', 'If true, applies dotted border style to the box' ],
  [ 'error', 'boolean', 'No', 'If true, applies the error color to the box' ],
  [ 'fill', 'boolean', 'No', 'If true, makes the box take the full width of its container' ],
  [ 'flex', 'boolean', 'No', 'If true, sets display to flex' ],
  [ 'grid', 'boolean', 'No', 'If true, sets display to grid' ],
  [ 'h', 'string | number', 'No', 'Height value to apply to the box' ],
  [ 'hidden', 'boolean', 'No', 'If true, hides the box' ],
  [ 'iblock', 'boolean', 'No', 'If true, sets display to inline-block' ],
  [ 'iflex', 'boolean', 'No', 'If true, sets display to inline-flex' ],
  [ 'igrid', 'boolean', 'No', 'If true, sets display to inline-grid' ],
  [ 'info', 'boolean', 'No', 'If true, applies the info color to the box' ],
  [ 'inline', 'boolean', 'No', 'If true, sets display to inline' ],
  [ 'justify', 'boolean', 'No', 'If true, justifies text inside the box' ],
  [ 'left', 'boolean', 'No', 'If true, aligns text to the left inside the box' ],
  [ 'lg', 'boolean', 'No', 'If true, applies large size to the box' ],
  [ 'ma', 'string | number', 'No', 'Margin all sides size value to apply to the box' ],
  [ 'maxh', 'string | number', 'No', 'Maximum height value to apply to the box' ],
  [ 'maxw', 'string | number', 'No', 'Maximum width value to apply to the box' ],
  [ 'mb', 'string | number', 'No', 'Margin bottom size value to apply to the box' ],
  [ 'md', 'boolean', 'No', 'If true, applies medium size to the box' ],
  [ 'minh', 'string | number', 'No', 'Minimum height value to apply to the box' ],
  [ 'minw', 'string | number', 'No', 'Minimum width value to apply to the box' ],
  [ 'ml', 'string | number', 'No', 'Margin left size value to apply to the box' ],
  [ 'mr', 'string | number', 'No', 'Margin right size value to apply to the box' ],
  [ 'mt', 'string | number', 'No', 'Margin top size value to apply to the box' ],
  [ 'muted', 'boolean', 'No', 'If true, applies the muted color to the box' ],
  [ 'mx', 'string | number', 'No', 'Margin horizontal size value to apply to the box' ],
  [ 'my', 'string | number', 'No', 'Margin vertical size value to apply to the box' ],
  [ 'outline', 'boolean', 'No', 'If true, applies an outline style to the box' ],
  [ 'pa', 'string | number', 'No', 'Padding all sides size value to apply to the box' ],
  [ 'pb', 'string | number', 'No', 'Padding bottom size value to apply to the box' ],
  [ 'pill', 'boolean', 'No', 'If true, applies pill border radius to the box' ],
  [ 'pl', 'string | number', 'No', 'Padding left size value to apply to the box' ],
  [ 'pr', 'string | number', 'No', 'Padding right size value to apply to the box' ],
  [ 'primary', 'boolean', 'No', 'If true, applies the primary color to the box' ],
  [ 'pt', 'string | number', 'No', 'Padding top size value to apply to the box' ],
  [ 'px', 'string | number', 'No', 'Padding horizontal size value to apply to the box' ],
  [ 'py', 'string | number', 'No', 'Padding vertical size value to apply to the box' ],
  [ 'radius', 'string | number', 'No', 'Custom border radius value to apply to the box' ],
  [ 'right', 'boolean', 'No', 'If true, aligns text to the right inside the box' ],
  [ 'rounded', 'boolean', 'No', 'If true, applies rounded border radius to the box' ],
  [ 'secondary', 'boolean', 'No', 'If true, applies the secondary color to the box' ],
  [ 'sm', 'boolean', 'No', 'If true, applies small size to the box' ],
  [ 'solid', 'boolean', 'No', 'If true, applies solid border style to the box' ],
  [ 'style', 'CSSProperties', 'No', 'Inline styles to apply to the box' ],
  [ 'success', 'boolean', 'No', 'If true, applies the success color to the box' ],
  [ 'tertiary', 'boolean', 'No', 'If true, applies the tertiary color to the box' ],
  [ 'txc', 'string', 'No', 'Text color value to apply to the box' ],
  [ 'txs', 'string | number', 'No', 'Text size value to apply to the box' ],
  [ 'w', 'string | number', 'No', 'Width value to apply to the box' ],
  [ 'warning', 'boolean', 'No', 'If true, applies the warning color to the box' ],
  [ 'white', 'boolean', 'No', 'If true, applies the white color to the box' ],
  [ 'xl', 'boolean', 'No', 'If true, applies extra large size to the box' ],
  [ 'xl2', 'boolean', 'No', 'If true, applies 2x extra large size to the box' ],
  [ 'xl3', 'boolean', 'No', 'If true, applies 3x extra large size to the box' ],
  [ 'xl4', 'boolean', 'No', 'If true, applies 4x extra large size to the box' ],
  [ 'xl5', 'boolean', 'No', 'If true, applies 5x extra large size to the box' ],
  [ 'xs', 'boolean', 'No', 'If true, applies extra small size to the box' ]
];

const examples = [
//0
`:root {
  --black: #222222;
  --white: #FCFCFC;
  --info: #1474FC;
  --error: #DC3545;
  --warning: #FF7B07;
  --success: #28A745;
  --muted: #999999;
  --primary: #ba5400;
  --secondary: #4d3421;
  --tertiary: #800080;
}`,
//1
`<Box txc="#006699">Box 1</Box>
<Box txc="red">Box 2</Box>
<Box txc="info">Box 3</Box>
<Box txc="warning">Box 4</Box>
<Box txc="error">Box 5</Box>
<Box txc="success">Box 6</Box>
<Box txc="muted">Box 7</Box>
<Box txc="primary">Box 8</Box>
<Box txc="secondary">Box 9</Box>
<Box txc="tertiary">Box 10</Box>
<Box txc="black">Box 11</Box>
<Box txc="white">Box 12</Box>`,
//2
`<Box bgc="#006699">Box 1</Box>
<Box bgc="red">Box 2</Box>
<Box bgc="info">Box 3</Box>
<Box bgc="warning">Box 4</Box>
<Box bgc="error">Box 5</Box>
<Box bgc="success">Box 6</Box>
<Box bgc="muted">Box 7</Box>
<Box bgc="primary">Box 8</Box>
<Box bgc="secondary">Box 9</Box>
<Box bgc="tertiary">Box 10</Box>
<Box bgc="black">Box 11</Box>
<Box bgc="white">Box 12</Box>`,
//3
`<Box bdc="#006699">Box 1</Box>
<Box bdc="red">Box 2</Box>
<Box bdc="info">Box 3</Box>
<Box bdc="warning">Box 4</Box>
<Box bdc="error">Box 5</Box>
<Box bdc="success">Box 6</Box>
<Box bdc="muted">Box 7</Box>
<Box bdc="primary">Box 8</Box>
<Box bdc="secondary">Box 9</Box>
<Box bdc="tertiary">Box 10</Box>
<Box bdc="black">Box 11</Box>
<Box bdc="white">Box 12</Box>`,
//4
`<Box info applyColor="bdc">Box 1</Box>
<Box warning applyColor="bgc">Box 2</Box>
<Box color="#006699" applyColor="txs">Box 3</Box>`,
//5
`:root {
  --bx-xs: 1px;
  --bx-sm: 2px;
  --bx-md: 3px;
  --bx-lg: 4px;
  --bx-xl: 5px;
  --bx-2xl: 6px;
  --bx-3xl: 7px;
  --bx-4xl: 8px;
  --bx-5xl: 9px;

  --by-xs: 1px;
  --by-sm: 2px;
  --by-md: 3px;
  --by-lg: 4px;
  --by-xl: 5px;
  --by-2xl: 6px;
  --by-3xl: 7px;
  --by-4xl: 8px;
  --by-5xl: 9px;

  --mx-xs: 1px;
  --mx-sm: 2px;
  --mx-md: 3px;
  --mx-lg: 4px;
  --mx-xl: 5px;
  --mx-2xl: 6px;
  --mx-3xl: 8px;
  --mx-4xl: 10px;
  --mx-5xl: 12px;

  --my-xs: 1px;
  --my-sm: 2px;
  --my-md: 3px;
  --my-lg: 4px;
  --my-xl: 5px;
  --my-2xl: 6px;
  --my-3xl: 8px;
  --my-4xl: 10px;
  --my-5xl: 12px;

  --px-xs: 1px;
  --px-sm: 2px;
  --px-md: 3px;
  --px-lg: 4px;
  --px-xl: 5px;
  --px-2xl: 6px;
  --px-3xl: 8px;
  --px-4xl: 10px;
  --px-5xl: 12px;

  --py-xs: 1px;
  --py-sm: 2px;
  --py-md: 3px;
  --py-lg: 4px;
  --py-xl: 5px;
  --py-2xl: 6px;
  --py-3xl: 8px;
  --py-4xl: 10px;
  --py-5xl: 12px;
  
  --tx-xs: 8px;
  --tx-sm: 10px;
  --tx-md: 12px;
  --tx-lg: 14px;
  --tx-xl: 16px;
  --tx-2xl: 18px;
  --tx-3xl: 20px;
  --tx-4xl: 22px;
  --tx-5xl: 24px;

  --h-xs: 10px;
  --h-sm: 20px;
  --h-md: 30px;
  --h-lg: 40px;
  --h-xl: 50px;
  --h-2xl: 60px;
  --h-3xl: 80px;
  --h-4xl: 100px;
  --h-5xl: 200px;

  --w-xs: 360px;
  --w-sm: 420px;
  --w-md: 767px;
  --w-lg: 992px;
  --w-xl: 1024px;
  --w-2xl: 1220px;
  --w-3xl: 1440px;
  --w-4xl: 2048px;
  --w-5xl: 4000px;
}`,
//6
`<Box txs="xs">Box 1</Box>
<Box txs="sm">Box 2</Box>
<Box txs="md">Box 3</Box>
<Box txs="lg">Box 4</Box>
<Box txs="xl">Box 5</Box>
<Box txs="2xl">Box 6</Box>
<Box txs="3xl">Box 7</Box>
<Box txs="4xl">Box 8</Box>
<Box txs="5xl">Box 9</Box>
<Box txs="fourth">Box 10</Box>
<Box txs="third">Box 11</Box>
<Box txs="half">Box 12</Box>
<Box txs="full">Box 13</Box>
<Box txs={2}>Box 14</Box>
<Box txs="2em">Box 15</Box>`,
//7
`<Box pa="xs">Box 1</Box>
<Box pb="sm">Box 2</Box>
<Box pl="md">Box 3</Box>
<Box pr="lg">Box 4</Box>
<Box pt="xl">Box 5</Box>
<Box px="2xl">Box 6</Box>
<Box py="3xl">Box 7</Box>
<Box pa="4xl">Box 8</Box>
<Box pb="5xl">Box 9</Box>
<Box pl="fourth">Box 10</Box>
<Box pr="third">Box 11</Box>
<Box pt="half">Box 12</Box>
<Box px="full">Box 13</Box>
<Box py={2}>Box 14</Box>
<Box pa="2em">Box 15</Box>`,
//8
`<Box ma="xs">Box 1</Box>
<Box mb="sm">Box 2</Box>
<Box ml="md">Box 3</Box>
<Box mr="lg">Box 4</Box>
<Box mt="xl">Box 5</Box>
<Box mx="2xl">Box 6</Box>
<Box my="3xl">Box 7</Box>
<Box ma="4xl">Box 8</Box>
<Box mb="5xl">Box 9</Box>
<Box ml="fourth">Box 10</Box>
<Box mr="third">Box 11</Box>
<Box mt="half">Box 12</Box>
<Box mx="full">Box 13</Box>
<Box my={2}>Box 14</Box>
<Box ma="2em">Box 15</Box>`,
//9
`<Box ba="xs">Box 1</Box>
<Box bb="sm">Box 2</Box>
<Box bl="md">Box 3</Box>
<Box br="lg">Box 4</Box>
<Box bt="xl">Box 5</Box>
<Box bx="2xl">Box 6</Box>
<Box by="3xl">Box 7</Box>
<Box ba="4xl">Box 8</Box>
<Box bb="5xl">Box 9</Box>
<Box bl="fourth">Box 10</Box>
<Box br="third">Box 11</Box>
<Box bt="half">Box 12</Box>
<Box bx="full">Box 13</Box>
<Box by={2}>Box 14</Box>
<Box ba="2em">Box 15</Box>`,
//10
`<Box w="xs">Box 1</Box>
<Box h="sm">Box 2</Box>
<Box maxw="md">Box 3</Box>
<Box maxh="lg">Box 4</Box>
<Box minw="xl">Box 5</Box>
<Box minh="2xl">Box 6</Box>
<Box w="3xl">Box 7</Box>
<Box h="4xl">Box 8</Box>
<Box maxw="5xl">Box 9</Box>
<Box maxh="fourth">Box 10</Box>
<Box minw="third">Box 11</Box>
<Box minh="half">Box 12</Box>
<Box w="full">Box 13</Box>
<Box h={2}>Box 14</Box>
<Box maxw="2em">Box 15</Box>`,
//11
`<Box curved>Box 1</Box>
<Box rounded>Box 2</Box>
<Box pill>Box 3</Box>`,
//12
`<Box solid>Box 1</Box>
<Box dashed>Box 2</Box>
<Box dotted>Box 3</Box>`,
//13
`<Box info fill>Box 1</Box>
<Box warning outline>Box 2</Box>`,
//14
`<Box left>Box 1</Box>
<Box center>Box 2</Box>
<Box right>Box 3</Box>
<Box justified>Box 4</Box>`
];

//--------------------------------------------------------------------//
// Components

const { C, Code, Props, Preview } = Docs;

/**
 * Aside right menu component
 */
export function Menu() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <aside className={
      'hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 '
      + 'border-l theme-bc-1 text-sm'
    }>
      <h4 className={
        'p-3 border-b theme-bc-1 theme-bg-1 text-sm uppercase '
        + 'font-semibold'
      }>
        {_('Contents')}
      </h4>
      <div className="p-3">
        <a className="block pb-1 font-bold" href="#top">
          {_('Box')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#colors">{_('Colors')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#sizes">{_('Sizes')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#border-radius">{_('Border Radius')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#border-style">{_('Border Style')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#fill">{_('Fill')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#align">{_('Text Align')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#api">{_('API Reference')}</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

/**
 * Examples component
 */
export function Examples() {
  return (
    <div className="flex items-start rmd-block flex-wrap gap-4">
      {/* Info Box Example */}
      <Preview 
        height={100}
        title="Info Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info fill pa="md">Info Box</Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info fill pa="md">Info Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Warning Box Example */}
      <Preview 
        height={100}
        title="Warning Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box warning fill pa="md">Warning Box</Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box warning fill pa="md">Warning Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Error Box Example */}
      <Preview 
        height={100}
        title="Warning Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box error fill pa="md">Error Box</Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box error fill pa="md">Error Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Success Box Example */}
      <Preview 
        height={100}
        title="Success Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box success fill pa="md">Success Box</Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box success fill pa="md">Success Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Muted Box Example */}
      <Preview 
        height={100}
        title="Muted Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box muted fill pa="md">Muted Box</Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box muted fill pa="md">Muted Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Custom Color Box Example */}
      <Preview 
        height={100}
        title="Custom Color Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box color="salmon" fill pa="md">Custom Color Box</Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box color="salmon" fill pa="md">Custom Color Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Center Aligned Box Example */}
      <Preview 
        height={100}
        title="Centered Aligned Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info fill pa="md" center>
            Centered Aligned Box
          </Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info fill pa="md" center>Centered Aligned Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Right Aligned Box Example */}
      <Preview 
        height={100}
        title="Right Aligned Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info fill pa="md" right>
            Right Aligned Box
          </Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info fill pa="md" right>Right Aligned Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Justified Box Example */}
      <Preview 
        height={100}
        title="Justified Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info fill pa="md" justify>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed quis enim ante. Aliquam volutpat tortor tempor est 
              efficitur vehicula.
          </Box>
        </Preview.Example>
       <Preview.Code>
          {'<Box info fill pa="md" justify>Justified Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Outline Example */}
      <Preview 
        height={100}
        title="Outline Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info outline pa="md">
            Outline Box
          </Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info outline pa="md">Outline Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Dashed Outline Example */}
      <Preview 
        height={100}
        title="Dashed Outline Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info outline dashed pa="md">
            Dashed Outline Box
          </Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info outline dashed pa="md">Dashed Outline Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Dotted Outline Example */}
      <Preview 
        height={100}
        title="Dotted Outline Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info outline dotted pa="md">
            Dotted Outline Box
          </Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info outline dotted pa="md">Dotted Outline Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Curved Example */}
      <Preview 
        height={100}
        title="Curved Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info fill px="2xl" py="md" curved>
            Curved Box
          </Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info fill px="2xl" py="md" curved>Curved Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Rounded Example */}
      <Preview 
        height={100}
        title="Rounded Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info fill px="5xl" py="md" rounded>
            Rounded Box
          </Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info fill px="5xl" py="md" rounded>Rounded Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Pill Example */}
      <Preview 
        height={100}
        title="Pill Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info fill px="5xl" py="md" pill>
            Pill Box
          </Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info fill px="5xl" py="md" pill>Pill Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Padding Example */}
      <Preview 
        height={100}
        title="Padded Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info fill pa="5xl">
            Padded Box
          </Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info fill pa="5xl">Padded Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Margin Example */}
      <Preview 
        height={100}
        title="Margin Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info fill ma="5xl" pa="md">
            Margined Box
          </Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info fill ma="5xl" pa="md">Margined Box</Box>'}
        </Preview.Code>
      </Preview>
      {/* Inline Example */}
      <Preview 
        height={100}
        title="Inline Box Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Box info fill ma="5xl" pa="md" iblock>
            Inline Box
          </Box>
        </Preview.Example>
        <Preview.Code>
          {'<Box info fill ma="5xl" pa="md" iblock>Inline Box</Box>'}
        </Preview.Code>
      </Preview>
    </div>
  );
};

/**
 * Documentation body component
 */
export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Box')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Box>" /> tool is a low-level container 
            used by <C value="<Alert>" />, <C value="<Badge>" />, 
            <C l value="<Button>" />, <C value="<Card>" />, 
            and <C value="<Progress>" /> to add color, size, margin, 
            padding, dimensions and border styling props. Import the 
            box tool like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Box from 'frui/Box';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples of <C value="<Box>" /> component.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="colors" className="uppercase font-bold text-lg mt-8">
        {_('Colors')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can set colors for text, background, and borders using the 
            appropriate 
            props. <C value="info" />, <C value="warning" />, <C value="error" />, <C value="success" />, <C value="muted" />, <C value="primary" />, <C value="secondary" />, <C value="tertiary" />, <C value="black" />, 
            and <C value="white" /> are predefined color values you can customize with your global css file.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">{examples[0]}</Code>

        <h3 className="font-semibold mt-4">{_('Text Colors')}</h3>
        <p className="py-2">
          <Translate>
            Use <C value="txc" /> prop to explicitly set the text color.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[1]}</Code>

        <h3 className="font-semibold mt-4">{_('Background Colors')}</h3>
        <p className="py-2">
          <Translate>
            Use <C value="bgc" /> prop to explicitly set the background color.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[2]}</Code>

        <h3 className="font-semibold mt-4">{_('Border Colors')}</h3>
        <p className="py-2">
          <Translate>
            Use <C value="bdc" /> prop to explicitly set the border color.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[3]}</Code>

        <h3 className="font-semibold mt-4">{_('Generic Color Props')}</h3>
        <p className="py-2">
          <Translate>
            Use a combination of 
            the <C value="applyColor" /> prop with <C value="info" />, <C value="warning" />, <C value="error" />, <C value="success" />, <C value="muted" />, <C value="primary" />, <C value="secondary" />, <C value="tertiary" />, <C value="black" />, <C value="white" />, 
            or <C value="color" /> prop to set colors based on the type 
            specified. 
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[4]}</Code>
      </div>

      <h2 id="sizes" className="uppercase font-bold text-lg mt-8">
        {_('Sizes')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can set sizes for text, borders, margins, and paddings 
            using the appropriate 
            props. <C value="xs" />, <C value="sm" />, <C value="md" />, <C value="lg" />, <C value="xl" />, <C value="2xl" />, <C value="3xl" />, <C value="4xl" />, 
            and <C value="5xl" /> are predefined size values you can 
            customize with your global css file.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">{examples[5]}</Code>

        <h3 className="font-semibold mt-4">{_('Text Sizes')}</h3>
        <p className="py-2">
          <Translate>
            Use <C value="txs" /> prop to explicitly set the text size.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[6]}</Code>

        <h3 className="font-semibold mt-4">{_('Padding Sizes')}</h3>
        <p className="py-2">
          <Translate>
            Use <C value="pa" />, <C value="pb" />, <C value="pl" />, <C value="pr" />, <C value="pt" />, <C value="px" />, 
            and <C value="py" /> prop to explicitly set the padding sizes.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[7]}</Code>

        <h3 className="font-semibold mt-4">{_('Margin Sizes')}</h3>
        <p className="py-2">
          <Translate>
            Use <C value="ma" />, <C value="mb" />, <C value="ml" />, <C value="mr" />, <C value="mt" />, <C value="mx" />, 
            and <C value="my" /> prop to explicitly set the margin sizes.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[8]}</Code>

        <h3 className="font-semibold mt-4">{_('Border Sizes')}</h3>
        <p className="py-2">
          <Translate>
            Use <C value="ba" />, <C value="bb" />, <C value="bl" />, <C value="br" />, <C value="bt" />, <C value="bx" />, 
            and <C value="by" /> prop to explicitly set the border sizes.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[9]}</Code>

        <h3 className="font-semibold mt-4">{_('Dimensions')}</h3>
        <p className="py-2">
          <Translate>
            Use <C value="w" />, <C value="h" />, <C value="maxh" />, <C value="maxw" />, <C value="minh" />, 
            and <C value="minw" /> prop to explicitly set the dimensions.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[10]}</Code>
      </div>

      <h2 id="border-radius" className="uppercase font-bold text-lg mt-8">
        {_('Border Radius')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Use <C value="curved" />, <C value="rounded" />, 
            or <C value="pill" /> prop to explicitly set the border radius.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[11]}</Code>
      </div>

      <h2 id="border-style" className="uppercase font-bold text-lg mt-8">
        {_('Border Style')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Use <C value="solid" />, <C value="dashed" />, 
            or <C value="dotted" /> prop to explicitly set the border style.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[12]}</Code>
      </div>

      <h2 id="fills" className="uppercase font-bold text-lg mt-8">
        {_('Fill Options')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Use <C value="fill" />, or <C value="outline" /> prop in 
            combination with generic color props to to determine how 
            to color fill the box.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[13]}</Code>
      </div>

      <h2 id="align" className="uppercase font-bold text-lg mt-8">
        {_('Text Align')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Use <C value="left" />, <C value="center" />, <C value="right" />, 
            or <C value="justified" /> prop to explicitly set the text 
            alignment.
          </Translate>
        </p>
        <Code language="tsx" className="mt-2">{examples[14]}</Code>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Box>" /> format can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <Docs.Foot />
    </div>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <Docs.Head
      uri={uri}
      title={title}
      description={description}
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <Docs pathname={uri}>
      <Menu />
      <Body />
    </Docs>
  );
};

//defaults to page
export default Page;
