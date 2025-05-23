//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Button from 'frui/form/Button';
import Tooltip from 'frui/element/Tooltip';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const codeDefault = `
// Default
<Tooltip text="Submit">
  <Button color="#333">Submit</Button>
</Tooltip>`.trim();
const codeInfo = `
<Tooltip text="Submit info" info>
  <Button info>Submit info</Button>
</Tooltip>`.trim();
const codeWarn = `
<Tooltip text="Submit warning" warning>
  <Button warning>Submit Warning</Button>
</Tooltip>`.trim();
const codeSuccess = `
<Tooltip text="Submit success" success>
  <Button success>Submit Success</Button>
</Tooltip>`.trim();
const codeError = `
<Tooltip text="Submit Error" error>
  <Button error>Submit Error</Button>
</Tooltip>`.trim();
const codeMuted = `
<Tooltip text="Submit Muted" muted>
  <Button muted>Submit Muted</Button>
</Tooltip>`.trim();
const codeCustom = `
<Tooltip text="Submit Custom" color="salmon">
  <Button color="salmon">Submit Custom</Button>
</Tooltip>`.trim();
const codeCurved = `
<Tooltip text="Submit Curved" info curved>
  <Button info curved>Submit Curved</Button>
</Tooltip>`.trim();
const codeRounded = `
<Tooltip text="Submit Rounded" warning rounded>
  <Button warning rounded>Submit Rounded</Button>
</Tooltip>`.trim();
const codePill = `
<Tooltip text="Submit Pill" success pill>
  <Button success pill>Submit Pill</Button>
</Tooltip>`.trim();
const codeArrow = `
<Tooltip text="Submit" arrow>
  <Button color="#333">Submit</Button>
</Tooltip>`.trim();
const codePlacement = `
// top, bottom, left, right, topLeft, topRight, bottomLeft, and bottomRight
<Tooltip text="top-right" topRight>
  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
    topRight
  </Button>
</Tooltip>`.trim();
const codePadding = `
<Tooltip text="Submit" padding={20}>
  <Button color="#333" rounded>Submit</Button>
</Tooltip>`.trim();
const codeOpacity = `
<Tooltip text="Submit" opacity={50}>
  <Button color="#333">Submit</Button>
</Tooltip>`.trim();

export default function Page() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: "icons", label: "Components", href: "/component" },
    { label: "Tooltip" },
  ];
  const props = [
    [_("arrow"), _("boolean"), _("No"), _("Displays an arrow on the tooltip")],
    [_("bottom"), _("boolean"), _("No"), _("Places in bottom")],
    [_("children"), _("ReactNode"), _("Yes"), _("Content that triggers tooltip")],
    [_("className"), _("string"), _("No"), _("Standard HTML class names")],
    [_("color"), _("string"), _("No"), _("Custom CSS hex or name")],
    [_("curved"), _("boolean"), _("No"), _("Slight curved corners")],
    [_("error"), _("boolean"), _("No"), _("Red tooltip")],
    [_("info"), _("boolean"), _("No"), _("Blue tooltip")],
    [_("muted"), _("boolean"), _("No"), _("Gray tooltip")],
    [_("left"), _("boolean"), _("No"), _("Places in left")],
    [_("opacity"), _("string | number"), _("No"), _("Adjust the transparency [0-100]")],
    [_("pill"), _("boolean"), _("No"), _("Max rounded corners")],
    [_("right"), _("boolean"), _("No"), _("Places in right")],
    [_("rounded"), _("boolean"), _("No"), _("Rounded corners")],
    [_("style"), _("CSS Object"), _("No"), _("Standard CSS input")],
    [_("success"), _("boolean"), _("No"), _("Green tooltip")],
    [_("text"), _("string"), _("Yes"), _("Text displayed inside the tooltip")],
    [_("top"), _("boolean"), _("No"), _("Places in top (default)")],
    [_("warning"), _("boolean"), _("No"), _("Orange tooltip")],
  ];
  //render
  return (
    <LayoutPanel
      uri="/component/tooltip"
      title="Tooltip Component"
      description="Tooltips in FRUI, are interactive ReactJS components that display 
      informative text when users hover over, focus on, or tap an element."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
              {_("Contents")}
            </h4>
            <div className="p-3">
              <Link className="block pb-1" href="#top">
                Tooltip
              </Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <Link href="#props">{_("Props")}</Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#types">{_("Types")}</Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#arrow">{_("Arrow")}</Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#place">{_("Placements")}</Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#rounded">{_("Rounded")}</Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#padding">{_("Padding")}</Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#opacity">{_("Opacity")}</Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#custom">{_("Custom Color")}</Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#styles">{_("Custom Styles")}</Link>
                </li>
              </ul>
            </div>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1
              id="top"
              className="flex items-center uppercase font-bold text-xl"
            >
              {_("Tooltip")}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Tooltip from 'frui/Tooltip';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_("Props")}
            </h2>
            <Props props={props} />

            <h2 id="types" className="uppercase font-bold text-lg mt-8">
              {_("Types")}
            </h2>
            <p className="py-4">
              <Translate>
                Tooltips have the following types: default, <C value="info" />,
                <C l value="warning" />, <C value="success" />,
                <C l value="error" />, and <C value="muted" />.
              </Translate>
            </p>

            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit">
                  <Button color="#333">Submit</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codeDefault}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit info" info>
                  <Button info>Submit info</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codeInfo}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit warning" warning>
                  <Button warning>Submit Warning</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codeWarn}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit success" success>
                  <Button success>Submit Success</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codeSuccess}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit Error" error>
                  <Button error>Submit Error</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codeError}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit Muted" muted>
                  <Button muted>Submit Muted</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codeMuted}
              </Code>
            </div>

            <h2 id="arrow" className="uppercase font-bold text-lg mt-8">
              {_("Arrow")}
            </h2>
            <p className="py-4">
              <Translate>
                You can add an arrow to your tooltip: <C value="arrow" />.
              </Translate>
            </p>

            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit" arrow>
                  <Button color="#333">Submit</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codeArrow}
              </Code>
            </div>

            <h2 id="place" className="uppercase font-bold text-lg mt-8">
              {_("Placements")}
            </h2>
            <p className="py-4">
              <Translate>
                Change the placement using: <C value="top" />, <C value="bottom" />, <C value="left" />
                , <C value="right" />.
              </Translate>
            </p>

            <div className="flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2">
                <Tooltip text="top left" top left arrow>
                  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
                    top left
                  </Button>
                </Tooltip>
                <Tooltip text="top" arrow>
                  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
                    top
                  </Button>
                </Tooltip>
                <Tooltip text="top right" top right arrow>
                  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
                    top right
                  </Button>
                </Tooltip>
                <Tooltip text="left" left arrow>
                  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
                    left
                  </Button>
                </Tooltip>
                <div></div> {/* Empty div for middle cell */}
                <Tooltip text="right" right arrow>
                  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
                    right
                  </Button>
                </Tooltip>
                <Tooltip text="bottom left" bottom left arrow>
                  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
                    bottom left
                  </Button>
                </Tooltip>
                <Tooltip text="bottom" bottom arrow>
                  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
                    bottom
                  </Button>
                </Tooltip>
                <Tooltip text="bottom right" bottom right arrow>
                  <Button className="flex items-center justify-center w-32 h-11 p-3" info rounded>
                    bottom right
                  </Button>
                </Tooltip>
              </div>
            </div>

            <div className="curved overflow-hidden mt-4">
              <Code language="typescript">
                {codePlacement}
              </Code>
            </div>

            <h2 id="rounded" className="uppercase font-bold text-lg mt-8">
              {_('Rounded')}
            </h2>
            <p className="py-4">
              <Translate>
                Tooltips can be rounded in three ways: <C value="curved" />,
                <C l value="rounded" />, and <C value="pill" />.
              </Translate>
            </p>

            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit Curved" info curved>
                  <Button info curved>Submit Curved</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codeCurved}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit Rounded" warning rounded>
                  <Button warning rounded>Submit Rounded</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codeRounded}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit Pill" success pill>
                  <Button success pill>Submit Pill</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codePill}
              </Code>
            </div>     

            <h2 id="padding" className="uppercase font-bold text-lg mt-8">
              {_('Padding')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add custom padding to your tooltip: <C value="padding={number}" />.
              </Translate>
            </p>

            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit" padding={20}>
                  <Button color="#333" rounded>Submit</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codePadding}
              </Code>
            </div>

            <h2 id="opacity" className="uppercase font-bold text-lg mt-8">
              {_('Opacity')}
            </h2>
            <p className="py-4">
              <Translate>
                You can adjust the transparency: <C value="opacity={number}" />.
              </Translate>
            </p>

            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit" opacity={50}>
                  <Button color="#333">Submit</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codeOpacity}
              </Code>
            </div>       

            <h2 id="custom" className="uppercase font-bold text-lg mt-8">
              {_('Custom Color')}
            </h2>
            <p className="py-4">
              <Translate>
                Tooltips can have custom CSS compatible colors which includes hex
                and color names.
              </Translate>
            </p>

            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Tooltip text="Submit Custom" color="salmon">
                  <Button color="salmon">Submit Custom</Button>
                </Tooltip>
              </div>
              <Code language="typescript">
                {codeCustom}
              </Code>
            </div>   

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to the tooltip component or use the <C value="frui-tooltip" /> CSS class.
              </Translate>
            </p>
          
            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/component">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Components')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field">
                {_('Fields')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
}
