//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Table from 'components/element/Table.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Code, 
  C,
  Props,
  Preview
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

export type TableRuleProps = { width: string };

const props = [
  //table
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'columnClassStyle', 'string | string[] | React.CSSProperties | React.CSSProperties[]', 'No', 'List of class names or styles to use for each column, or a single class name to use for all columns' ],
    [ 'footClassStyle', 'string | React.CSSProperties', 'No', 'Class name or styles to use for all foot cells' ],
    [ 'headClassStyle', 'string | React.CSSProperties', 'No', 'Class name or styles to use for all head cells' ],
    [ 'style', 'CSS Object', 'No', 'Standard CSS input' ]
  ],
  //table head
  [
    [ 'addClassStyle', 'string | React.CSSProperties', 'No', 'Additional class names to add to the head cell' ],
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'colSpan', 'number', 'No', 'How many columns this cell will cover' ],
    [ 'noWrap', 'boolean', 'No', 'Keeps all text in one line' ],
    [ 'rowSpan', 'number', 'No', 'How many rows this cell will cover' ],
    [ 'stickyLeft', 'boolean', 'No', 'Always show on the left, even on overflow' ],
    [ 'stickyRight', 'boolean', 'No', 'Always show on the right, even on overflow' ],
    [ 'stickyTop', 'boolean', 'No', 'Always show on the top, even on overflow' ],
    [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
    [ 'wrap1', 'boolean', 'No', 'Keeps the cell size a minimum of 100px' ],
    [ 'wrap2', 'boolean', 'No', 'Keeps the cell size a minimum of 200px' ],
    [ 'wrap3', 'boolean', 'No', 'Keeps the cell size a minimum of 300px' ],
    [ 'wrap4', 'boolean', 'No', 'Keeps the cell size a minimum of 400px' ],
    [ 'wrap5', 'boolean', 'No', 'Keeps the cell size a minimum of 500px' ]
  ],
  //table row
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'columnStyleClass', 'string | React.CSSProperties', 'No', 'Class name to use for all columns in this row, overrides the columnClassStyle prop from Table' ],
    [ 'colSpan', 'number', 'No', 'How many columns this cell will cover' ],
    [ 'noWrap', 'boolean', 'No', 'Keeps all text in one line' ],
    [ 'rowSpan', 'number', 'No', 'How many rows this cell will cover' ],
    [ 'stripe', 'number', 'No', 'Which stripe to use for this row' ]
  ],
  //table col
  [
    [ 'addClassStyle', 'string | React.CSSProperties', 'No', 'Additional class names or styles to add to the column cell' ],
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'colSpan', 'number', 'No', 'How many columns this cell will cover' ],
    [ 'noWrap', 'boolean', 'No', 'Keeps all text in one line' ],
    [ 'rowSpan', 'number', 'No', 'How many rows this cell will cover' ],
    [ 'stickyBottom', 'boolean', 'No', 'Always show on the bottom, even on overflow' ],
    [ 'stickyLeft', 'boolean', 'No', 'Always show on the left, even on overflow' ],
    [ 'stickyRight', 'boolean', 'No', 'Always show on the right, even on overflow' ],
    [ 'stickyTop', 'boolean', 'No', 'Always show on the top, even on overflow' ],
    [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
    [ 'wrap1', 'boolean', 'No', 'Keeps the cell size a minimum of 100px' ],
    [ 'wrap2', 'boolean', 'No', 'Keeps the cell size a minimum of 200px' ],
    [ 'wrap3', 'boolean', 'No', 'Keeps the cell size a minimum of 300px' ],
    [ 'wrap4', 'boolean', 'No', 'Keeps the cell size a minimum of 400px' ],
    [ 'wrap5', 'boolean', 'No', 'Keeps the cell size a minimum of 500px' ]
  ],
  //table foot
  [
    [ 'addClassStyle', 'string | React.CSSProperties', 'No', 'Additional class names or styles to add to the foot cell' ],
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'colSpan', 'number', 'No', 'How many columns this cell will cover' ],
    [ 'noWrap', 'boolean', 'No', 'Keeps all text in one line' ],
    [ 'rowSpan', 'number', 'No', 'How many rows this cell will cover' ],
    [ 'stickyBottom', 'boolean', 'No', 'Always show on the bottom, even on overflow' ],
    [ 'stickyLeft', 'boolean', 'No', 'Always show on the left, even on overflow' ],
    [ 'stickyRight', 'boolean', 'No', 'Always show on the right, even on overflow' ],
    [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
    [ 'wrap1', 'boolean', 'No', 'Keeps the cell size a minimum of 100px' ],
    [ 'wrap2', 'boolean', 'No', 'Keeps the cell size a minimum of 200px' ],
    [ 'wrap3', 'boolean', 'No', 'Keeps the cell size a minimum of 300px' ],
    [ 'wrap4', 'boolean', 'No', 'Keeps the cell size a minimum of 400px' ],
    [ 'wrap5', 'boolean', 'No', 'Keeps the cell size a minimum of 500px' ]
  ],
  //table rule
  [
    [ 'width', 'string', 'Yes', 'Width of the rule, e.g. 50%, 100px, etc.' ]
  ],
];

const examples = [
//0
`<Table className="w-full">
  <Table.Head className="theme-bg-3 text-left">ID</Table.Head>
  <Table.Head className="theme-bg-3 text-left">Name</Table.Head>
  <Table.Head className="theme-bg-3 text-center">Active</Table.Head>
  <Table.Head className="theme-bg-3 text-right">Created</Table.Head>
  <Table.Head className="theme-bg-3 text-right">Updated</Table.Head>
  <Table.Row>
    <Table.Col className="theme-bg-1">1</Table.Col>
    <Table.Col className="theme-bg-1">John Doe</Table.Col>
    <Table.Col className="theme-bg-1 text-center">Yes</Table.Col>
    <Table.Col className="theme-bg-1 text-right">2025-01-02</Table.Col>
    <Table.Col className="theme-bg-1 text-right">2025-03-04</Table.Col>
  </Table.Row>
  <Table.Row>
    <Table.Col className="theme-bg-1">2</Table.Col>
    <Table.Col className="theme-bg-1">Jane Doe</Table.Col>
    <Table.Col className="theme-bg-1 text-center">No</Table.Col>
    <Table.Col className="theme-bg-1 text-right">2025-04-05</Table.Col>
    <Table.Col className="theme-bg-1 text-right">2025-05-06</Table.Col>
  </Table.Row>
  <Table.Row>
    <Table.Col className="theme-bg-1">3</Table.Col>
    <Table.Col className="theme-bg-1">Jack Doe</Table.Col>
    <Table.Col className="theme-bg-1 text-center">Yes</Table.Col>
    <Table.Col className="theme-bg-1 text-right">2025-07-08</Table.Col>
    <Table.Col className="theme-bg-1 text-right">2025-09-01</Table.Col>
  </Table.Row>
</Table>`,
//1
`<Table 
  className="w-full"
  columnClassStyle={[ 'theme-bg-2', 'theme-bg-1' ]}
  headClassStyle="theme-bg-3"
>
  <Table.Head addClassStyle="text-left">ID</Table.Head>
  <Table.Head addClassStyle="text-left">Name</Table.Head>
  <Table.Head addClassStyle="text-center">Active</Table.Head>
  <Table.Head addClassStyle="text-right">Created</Table.Head>
  <Table.Head addClassStyle="text-right">Updated</Table.Head>
  <Table.Row stripe={0}>
    <Table.Col>1</Table.Col>
    <Table.Col>John Doe</Table.Col>
    <Table.Col addClassStyle="text-center">Yes</Table.Col>
    <Table.Col addClassStyle="text-right">2025-01-02</Table.Col>
    <Table.Col addClassStyle="text-right">2025-03-04</Table.Col>
  </Table.Row>
  <Table.Row stripe={1}>
    <Table.Col>2</Table.Col>
    <Table.Col>Jane Doe</Table.Col>
    <Table.Col addClassStyle="text-center">No</Table.Col>
    <Table.Col addClassStyle="text-right">2025-04-05</Table.Col>
    <Table.Col addClassStyle="text-right">2025-05-06</Table.Col>
  </Table.Row>
  <Table.Row stripe={2}>
    <Table.Col>3</Table.Col>
    <Table.Col>Jack Doe</Table.Col>
    <Table.Col addClassStyle="text-center">Yes</Table.Col>
    <Table.Col addClassStyle="text-right">2025-07-08</Table.Col>
    <Table.Col addClassStyle="text-right">2025-09-01</Table.Col>
  </Table.Row>
</Table>`,
//2
`<Table headClassStyle="theme-bg-3 border-t-0!" className="w-full">
  <Table.Head addClassStyle="text-left" wrap1>ID</Table.Head>
  <Table.Head addClassStyle="text-left" wrap2>Name</Table.Head>
  <Table.Head addClassStyle="text-center">Active</Table.Head>
  <Table.Head addClassStyle="text-right">Created</Table.Head>
  <Table.Head addClassStyle="text-right">Updated</Table.Head>
  <Table.Row columnClassStyle="theme-bg-2">
    <Table.Col>1</Table.Col>
    <Table.Col>John Doe</Table.Col>
    <Table.Col addClassStyle="text-center">Yes</Table.Col>
    <Table.Col addClassStyle="text-right" noWrap>January 02, 2025</Table.Col>
    <Table.Col addClassStyle="text-right" noWrap>March 04, 2025</Table.Col>
  </Table.Row>
  <Table.Row columnClassStyle="theme-bg-1">
    <Table.Col>2</Table.Col>
    <Table.Col>Jane Doe</Table.Col>
    <Table.Col addClassStyle="text-center">No</Table.Col>
    <Table.Col addClassStyle="text-right" noWrap>April 05, 2025</Table.Col>
    <Table.Col addClassStyle="text-right" noWrap>May 06, 2025</Table.Col>
  </Table.Row>
  <Table.Row columnClassStyle="theme-bg-2">
    <Table.Col>3</Table.Col>
    <Table.Col>Jack Doe</Table.Col>
    <Table.Col addClassStyle="text-center">Yes</Table.Col>
    <Table.Col addClassStyle="text-right" noWrap>July 08, 2025</Table.Col>
    <Table.Col addClassStyle="text-right" noWrap>September 01, 2025</Table.Col>
  </Table.Row>
</Table>`,
//3
`<Table className="w-full" headClassStyle="theme-bg-3 border-t-0!">
    <Table.Head addClassStyle="text-left" stickyLeft stickyTop>ID</Table.Head>
    <Table.Head addClassStyle="text-left" noWrap stickyTop>First Name</Table.Head>
    <Table.Head addClassStyle="text-left" noWrap stickyTop>Last Name</Table.Head>
    <Table.Head addClassStyle="text-center" stickyTop>Active</Table.Head>
    <Table.Head addClassStyle="text-center" stickyTop>Role</Table.Head>
    <Table.Head addClassStyle="text-center" stickyTop>Rating</Table.Head>
    <Table.Head addClassStyle="text-right" stickyTop>Created</Table.Head>
    <Table.Head addClassStyle="text-right" stickyTop>Updated</Table.Head>
    <Table.Head addClassStyle="text-center" stickyRight stickyTop>Actions</Table.Head>
    <Table.Row columnClassStyle="theme-bg-1">
      <Table.Col stickyLeft>1</Table.Col>
      <Table.Col noWrap>John</Table.Col>
      <Table.Col noWrap>Doe</Table.Col>
      <Table.Col addClassStyle="text-center">Yes</Table.Col>
      <Table.Col addClassStyle="text-center">Admin</Table.Col>
      <Table.Col addClassStyle="text-center">⭐⭐⭐⭐⭐</Table.Col>
      <Table.Col addClassStyle="text-right" noWrap>January 02, 2025</Table.Col>
      <Table.Col addClassStyle="text-right" noWrap>March 04, 2025</Table.Col>
      <Table.Col addClassStyle="text-center" noWrap stickyRight>
        <i className="fas fa-edit mr-2 theme-info"></i>
        <i className="fas fa-trash-alt theme-error"></i>
      </Table.Col>
    </Table.Row>
    <Table.Row columnClassStyle="theme-bg-1">
      <Table.Col stickyLeft>2</Table.Col>
      <Table.Col noWrap>Jane</Table.Col>
      <Table.Col noWrap>Doe</Table.Col>
      <Table.Col addClassStyle="text-center">No</Table.Col>
      <Table.Col addClassStyle="text-center">User</Table.Col>
      <Table.Col addClassStyle="text-center">⭐⭐⭐⭐</Table.Col>
      <Table.Col addClassStyle="text-right" noWrap>April 05, 2025</Table.Col>
      <Table.Col addClassStyle="text-right" noWrap>May 06, 2025</Table.Col>
      <Table.Col addClassStyle="text-center" noWrap stickyRight>
        <i className="fas fa-edit mr-2 theme-info"></i>
        <i className="fas fa-trash-alt theme-error"></i>
      </Table.Col>
    </Table.Row>
  </Table>`
];

//--------------------------------------------------------------------//
// Components

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumbClassStyle="font-normal" activeClassStyle="font-bold">
      <Bread.Slicer />
      <Bread.Crumb icon="icons" href="/component">
        Components
      </Bread.Crumb>
      <Bread.Crumb>Table</Bread.Crumb>
    </Bread>
  );
};

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
        <a className="block pb-1 font-bold" href="#top">{_('Table')}</a>
        <ul className="list-disc pl-3">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#style">{_('Global Styles')}</a>
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
      {/* Basic Example */}
      <Preview 
        height={216}
        title="Basic Table Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example>
          <Table className="w-full">
            <Table.Head className="theme-bg-3 text-left">ID</Table.Head>
            <Table.Head className="theme-bg-3 text-left">Name</Table.Head>
            <Table.Head className="theme-bg-3 text-center">Active</Table.Head>
            <Table.Head className="theme-bg-3 text-right">Created</Table.Head>
            <Table.Head className="theme-bg-3 text-right">Updated</Table.Head>
            <Table.Row>
              <Table.Col className="theme-bg-1">1</Table.Col>
              <Table.Col className="theme-bg-1">John Doe</Table.Col>
              <Table.Col className="theme-bg-1 text-center">Yes</Table.Col>
              <Table.Col className="theme-bg-1 text-right">2025-01-02</Table.Col>
              <Table.Col className="theme-bg-1 text-right">2025-03-04</Table.Col>
            </Table.Row>
            <Table.Row>
              <Table.Col className="theme-bg-1">2</Table.Col>
              <Table.Col className="theme-bg-1">Jane Doe</Table.Col>
              <Table.Col className="theme-bg-1 text-center">No</Table.Col>
              <Table.Col className="theme-bg-1 text-right">2025-04-05</Table.Col>
              <Table.Col className="theme-bg-1 text-right">2025-05-06</Table.Col>
            </Table.Row>
            <Table.Row>
              <Table.Col className="theme-bg-1">3</Table.Col>
              <Table.Col className="theme-bg-1">Jack Doe</Table.Col>
              <Table.Col className="theme-bg-1 text-center">Yes</Table.Col>
              <Table.Col className="theme-bg-1 text-right">2025-07-08</Table.Col>
              <Table.Col className="theme-bg-1 text-right">2025-09-01</Table.Col>
            </Table.Row>
          </Table>
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>
      {/* Stripe Example */}
      <Preview 
        height={216}
        title="Stripe Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example>
          <Table 
            className="w-full"
            columnClassStyle={[ 'theme-bg-2', 'theme-bg-1' ]}
            headClassStyle="theme-bg-3"
          >
            <Table.Head addClassStyle="text-left">ID</Table.Head>
            <Table.Head addClassStyle="text-left">Name</Table.Head>
            <Table.Head addClassStyle="text-center">Active</Table.Head>
            <Table.Head addClassStyle="text-right">Created</Table.Head>
            <Table.Head addClassStyle="text-right">Updated</Table.Head>
            <Table.Row stripe={0}>
              <Table.Col>1</Table.Col>
              <Table.Col>John Doe</Table.Col>
              <Table.Col addClassStyle="text-center">Yes</Table.Col>
              <Table.Col addClassStyle="text-right">2025-01-02</Table.Col>
              <Table.Col addClassStyle="text-right">2025-03-04</Table.Col>
            </Table.Row>
            <Table.Row stripe={1}>
              <Table.Col>2</Table.Col>
              <Table.Col>Jane Doe</Table.Col>
              <Table.Col addClassStyle="text-center">No</Table.Col>
              <Table.Col addClassStyle="text-right">2025-04-05</Table.Col>
              <Table.Col addClassStyle="text-right">2025-05-06</Table.Col>
            </Table.Row>
            <Table.Row stripe={2}>
              <Table.Col>3</Table.Col>
              <Table.Col>Jack Doe</Table.Col>
              <Table.Col addClassStyle="text-center">Yes</Table.Col>
              <Table.Col addClassStyle="text-right">2025-07-08</Table.Col>
              <Table.Col addClassStyle="text-right">2025-09-01</Table.Col>
            </Table.Row>
          </Table>
        </Preview.Example>
        <Preview.Code>{examples[1]}</Preview.Code>
      </Preview>
      {/* Wrap and No Wrap Example */}
      <Preview 
        height={216}
        title="Wrap and No Wrap Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example>
          <Table headClassStyle="theme-bg-3 border-t-0!" className="w-full">
            <Table.Head addClassStyle="text-left" wrap1>ID</Table.Head>
            <Table.Head addClassStyle="text-left" wrap2>Name</Table.Head>
            <Table.Head addClassStyle="text-center">Active</Table.Head>
            <Table.Head addClassStyle="text-right">Created</Table.Head>
            <Table.Head addClassStyle="text-right">Updated</Table.Head>
            <Table.Row columnClassStyle="theme-bg-2">
              <Table.Col>1</Table.Col>
              <Table.Col>John Doe</Table.Col>
              <Table.Col addClassStyle="text-center">Yes</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>January 02, 2025</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>March 04, 2025</Table.Col>
            </Table.Row>
            <Table.Row columnClassStyle="theme-bg-1">
              <Table.Col>2</Table.Col>
              <Table.Col>Jane Doe</Table.Col>
              <Table.Col addClassStyle="text-center">No</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>April 05, 2025</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>May 06, 2025</Table.Col>
            </Table.Row>
            <Table.Row columnClassStyle="theme-bg-2">
              <Table.Col>3</Table.Col>
              <Table.Col>Jack Doe</Table.Col>
              <Table.Col addClassStyle="text-center">Yes</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>July 08, 2025</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>September 01, 2025</Table.Col>
            </Table.Row>
          </Table>
        </Preview.Example>
        <Preview.Code>{examples[2]}</Preview.Code>
      </Preview>
      {/* Sticky Example */}
      <Preview 
        height={216}
        title="Sticky Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example>
          <Table className="w-full" headClassStyle="theme-bg-3 border-t-0!">
            <Table.Head addClassStyle="text-left" stickyLeft stickyTop>ID</Table.Head>
            <Table.Head addClassStyle="text-left" noWrap stickyTop>First Name</Table.Head>
            <Table.Head addClassStyle="text-left" noWrap stickyTop>Last Name</Table.Head>
            <Table.Head addClassStyle="text-center" stickyTop>Active</Table.Head>
            <Table.Head addClassStyle="text-center" stickyTop>Role</Table.Head>
            <Table.Head addClassStyle="text-center" stickyTop>Rating</Table.Head>
            <Table.Head addClassStyle="text-right" stickyTop>Created</Table.Head>
            <Table.Head addClassStyle="text-right" stickyTop>Updated</Table.Head>
            <Table.Head addClassStyle="text-center" stickyRight stickyTop>Actions</Table.Head>
            <Table.Row columnClassStyle="theme-bg-1">
              <Table.Col stickyLeft>1</Table.Col>
              <Table.Col noWrap>John</Table.Col>
              <Table.Col noWrap>Doe</Table.Col>
              <Table.Col addClassStyle="text-center">Yes</Table.Col>
              <Table.Col addClassStyle="text-center">Admin</Table.Col>
              <Table.Col addClassStyle="text-center">⭐⭐⭐⭐⭐</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>January 02, 2025</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>March 04, 2025</Table.Col>
              <Table.Col addClassStyle="text-center" noWrap stickyRight>
                <i className="fas fa-edit mr-2 theme-info"></i>
                <i className="fas fa-trash-alt theme-error"></i>
              </Table.Col>
            </Table.Row>
            <Table.Row columnClassStyle="theme-bg-1">
              <Table.Col stickyLeft>2</Table.Col>
              <Table.Col noWrap>Jane</Table.Col>
              <Table.Col noWrap>Doe</Table.Col>
              <Table.Col addClassStyle="text-center">No</Table.Col>
              <Table.Col addClassStyle="text-center">User</Table.Col>
              <Table.Col addClassStyle="text-center">⭐⭐⭐⭐</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>April 05, 2025</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>May 06, 2025</Table.Col>
              <Table.Col addClassStyle="text-center" noWrap stickyRight>
                <i className="fas fa-edit mr-2 theme-info"></i>
                <i className="fas fa-trash-alt theme-error"></i>
              </Table.Col>
            </Table.Row>
            <Table.Row columnClassStyle="theme-bg-1">
              <Table.Col stickyLeft>3</Table.Col>
              <Table.Col noWrap>Jack</Table.Col>
              <Table.Col noWrap>Doe</Table.Col>
              <Table.Col addClassStyle="text-center">Yes</Table.Col>
              <Table.Col addClassStyle="text-center">Admin</Table.Col>
              <Table.Col addClassStyle="text-center">⭐⭐</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>July 08, 2025</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>September 01, 2025</Table.Col>
              <Table.Col addClassStyle="text-center" noWrap stickyRight>
                <i className="fas fa-edit mr-2 theme-info"></i>
                <i className="fas fa-trash-alt theme-error"></i>
              </Table.Col>
            </Table.Row>
            <Table.Row columnClassStyle="theme-bg-1">
              <Table.Col stickyLeft>4</Table.Col>
              <Table.Col noWrap>John</Table.Col>
              <Table.Col noWrap>Doe</Table.Col>
              <Table.Col addClassStyle="text-center">Yes</Table.Col>
              <Table.Col addClassStyle="text-center">Guest</Table.Col>
              <Table.Col addClassStyle="text-center">⭐</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>January 02, 2025</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>March 04, 2025</Table.Col>
              <Table.Col addClassStyle="text-center" noWrap stickyRight>
                <i className="fas fa-edit mr-2 theme-info"></i>
                <i className="fas fa-trash-alt theme-error"></i>
              </Table.Col>
            </Table.Row>
            <Table.Row columnClassStyle="theme-bg-1">
              <Table.Col stickyLeft>5</Table.Col>
              <Table.Col noWrap>Jane</Table.Col>
              <Table.Col noWrap>Doe</Table.Col>
              <Table.Col addClassStyle="text-center">No</Table.Col>
              <Table.Col addClassStyle="text-center">Manager</Table.Col>
              <Table.Col addClassStyle="text-center">⭐⭐⭐</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>April 05, 2025</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>May 06, 2025</Table.Col>
              <Table.Col addClassStyle="text-center" noWrap stickyRight>
                <i className="fas fa-edit mr-2 theme-info"></i>
                <i className="fas fa-trash-alt theme-error"></i>
              </Table.Col>
            </Table.Row>
            <Table.Row columnClassStyle="theme-bg-1">
              <Table.Col stickyLeft>6</Table.Col>
              <Table.Col noWrap>Jack</Table.Col>
              <Table.Col noWrap>Doe</Table.Col>
              <Table.Col addClassStyle="text-center">Yes</Table.Col>
              <Table.Col addClassStyle="text-center">User</Table.Col>
              <Table.Col addClassStyle="text-center">⭐⭐⭐⭐⭐</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>July 08, 2025</Table.Col>
              <Table.Col addClassStyle="text-right" noWrap>September 01, 2025</Table.Col>
              <Table.Col addClassStyle="text-center" noWrap stickyRight>
                <i className="fas fa-edit mr-2 theme-info"></i>
                <i className="fas fa-trash-alt theme-error"></i>
              </Table.Col>
            </Table.Row>
          </Table>
        </Preview.Example>
        <Preview.Code>{examples[3]}</Preview.Code>
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
  //const stripe = useStripe('theme-bg-2', 'theme-bg-1');
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Table')}
      </h1>
      <Code language="typescript" className="mt-2">
        {`import Table from 'frui/Table';`}
      </Code>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div className="curved overflow-hidden">
        <p className="py-2">
          <Translate>
            The following are some basic examples of tables.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can add use the following CSS classes to globally theme tables.
          </Translate>
        </p>
        <ul className="list-disc pl-3">
          <li className="ml-2 pb-1"><C value="frui-table" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-col" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-foot" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-head" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-nowrap" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-row" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-overflow" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-sticky" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-sticky-b" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-sticky-l" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-sticky-t" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-sticky-r" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-z1" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-z2" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-z3" /></li>
          <li className="ml-2 pb-1"><C value="frui-table-z4" /></li>
        </ul>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following section describes the props for each table
            component.
          </Translate>
        </p>
        <h3 className="font-semibold mt-4">{_('Root')}</h3>
          <p className="py-2">
            <Translate>
              The <C value="<Table>" /> component can be passed the 
              following props.
            </Translate>
          </p>
          <Props props={props[0]} />
  
          <h3 className="font-semibold mt-4">{_('Head')}</h3>
          <p className="py-2">
            <Translate>
              The <C value="<Tabs.Head>" /> component can be passed the 
              following props.
            </Translate>
          </p>
          <Props props={props[1]} />

          <h3 className="font-semibold mt-4">{_('Row')}</h3>
          <p className="py-2">
            <Translate>
              The <C value="<Table.Row>" /> component can be passed the 
              following props.
            </Translate>
          </p>
          <Props props={props[2]} />

          <h3 className="font-semibold mt-4">{_('Col')}</h3>
          <p className="py-2">
            <Translate>
              The <C value="<Table.Col>" /> component can be passed the 
              following props.
            </Translate>
          </p>
          <Props props={props[3]} />

          <h3 className="font-semibold mt-4">{_('Foot')}</h3>
          <p className="py-2">
            <Translate>
              The <C value="<Table.Foot>" /> component can be passed the 
              following props.
            </Translate>
          </p>
          <Props props={props[4]} />

          <h3 className="font-semibold mt-4">{_('Rule')}</h3>
          <p className="py-2">
            <Translate>
              The <C value="<Table.Rule>" /> component can be passed the 
              following props.
            </Translate>
          </p>
          <Props props={props[5]} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component/progress">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Progress')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/tabs">
          {_('Tabs')}
          <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/component/table"
      title="Table Component"
      description={
        'Tables in FRUI are ReactJS components used to display '
        + 'tabular information.'
      }
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <LayoutProvider>
      <LayoutPanel pathname="/component/table">
        <main className="flex flex-col h-full w-full">
          <div className="p-3 theme-bg-2">
            <Crumbs />
          </div>
          <section className="flex-grow relative h-full">
            <Menu />
            <Body />
          </section>
        </main>
      </LayoutPanel>
    </LayoutProvider>
  );
};

//defaults to page
export default Page;
