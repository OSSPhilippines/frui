//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
import { useState } from 'react';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import JsonField from 'frui/field/JsonField';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const examples = [
//0-------------------------------------------------------------------//
`<JsonField
  name="config"
  value={config}
  onChange={setConfig}
  placeholder="Enter JSON configuration..."
  rows={8}
/>`,
//1-------------------------------------------------------------------//
`<JsonField
  name="apiData"
  value={apiData}
  onChange={setApiData}
  onError={setError}
  validateOnChange={true}
  rows={10}
  indent={4}
/>`,
//2-------------------------------------------------------------------//
`<JsonField
  value={{
    user: {
      name: "Jane Doe",
      email: "jane@example.com"
    },
    settings: {
      theme: "dark",
      notifications: true
    }
  }}
  readOnly
  rows={12}
/>`,
//3-------------------------------------------------------------------//
`<JsonField
  name="theme"
  defaultValue={{
    colors: {
      primary: "#007bff",
      secondary: "#6c757d"
    }
  }}
  placeholder="Customize your theme..."
  indent={2}
  rows={8}
/>`,
];

export default function JsonFieldDemoPage() {
  const { _ } = useLanguage();
  const [config, setConfig] = useState({ name: "John", age: 30, city: "New York" });
  const [apiData, setApiData] = useState({ endpoint: "/api/users", method: "GET" });
  const [error, setError] = useState<string | null>(null);

  // Handle JSON changes with proper type safety
  const handleConfigChange = (value: object | null) => {
    if (value) setConfig(value as typeof config);
  };

  const handleApiDataChange = (value: object | null) => {
    if (value) setApiData(value as typeof apiData);
  };

  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'JSON Field' }
  ];

  const propsData = [
    [ _('name'), _('string'), _('No'), _('Form field name for submission.') ],
    [ _('value'), _('JsonValue'), _('No'), _('Current JSON value. If undefined, component is uncontrolled.') ],
    [ _('defaultValue'), _('JsonValue'), _('No'), _('Initial value if \`value\` is undefined (uncontrolled).') ],
    [ _('onChange'), _('function'), _('No'), _('Callback \`(value: object | null) => void\`.') ],
    [ _('onError'), _('function'), _('No'), _('Callback \`(error: string | null) => void\`.') ],
    [ _('placeholder'), _('string'), _('No'), _('Placeholder text for the textarea.') ],
    [ _('disabled'), _('boolean'), _('No (false)'), _('Disable interaction.') ],
    [ _('readOnly'), _('boolean'), _('No (false)'), _('Make field read-only.') ],
    [ _('rows'), _('number'), _('No (6)'), _('Number of textarea rows.') ],
    [ _('indent'), _('number'), _('No (2)'), _('Number of spaces for JSON indentation.') ],
    [ _('validateOnChange'), _('boolean'), _('No (true)'), _('Validate JSON on each change.') ],
    [ _('className'), _('string'), _('No'), _('CSS class names.') ],
    [ _('style'), _('CSS Object'), _('No'), _('Inline styles.') ],
  ];

  return (
    <LayoutPanel
      uri="/field/json"
      title="JSON Field"
      description="A field component for editing and validating JSON data with real-time feedback and auto-formatting."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('JSON Field')}</Link>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
              <li>
                <Link href="#props" className="block pb-1 hover:text-link">
                  {_('Props')}
                </Link>
              </li>
              <li>
                <Link href="#basic" className="block pb-1 hover:text-link">
                  {_('Basic Usage')}
                </Link>
              </li>
              <li>
                <Link href="#validation" className="block pb-1 hover:text-link">
                  {_('Validation')}
                </Link>
              </li>
              <li>
                <Link href="#readonly" className="block pb-1 hover:text-link">
                  {_('Read-only')}
                </Link>
              </li>
              <li>
                <Link href="#formatting" className="block pb-1 hover:text-link">
                  {_('Formatting')}
                </Link>
              </li>
            </ul>
          </aside>

          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
               <i className="fas fa-code mr-2"></i> {_('JSON Field')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import JsonField from 'frui/field/JsonField';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Props')}
            </h2>
            <Props props={propsData} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Basic Usage')}
            </h2>
            <p className="py-2">
              <Translate>
                Use JsonField for editing JSON data with real-time validation and 
                auto-formatting. The <C value="onChange"/> prop receives the parsed 
                JSON object when valid.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-6 bg-b1">
                <div className="w-full max-w-lg">
                  <JsonField
                    name="config"
                    value={config}
                    onChange={handleConfigChange}
                    placeholder="Enter JSON configuration..."
                    rows={8}
                  />
                  <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
                    <strong>Current Value:</strong> {JSON.stringify(config)}
                  </div>
                </div>
              </div>
              <Code language="typescript">{examples[0]}</Code>
            </div>

            <h2 id="validation" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Validation & Error Handling')}
            </h2>
            <p className="py-2">
              <Translate>
                JsonField provides real-time validation with the <C value="onError"/> 
                callback. Invalid JSON shows clear error messages to help users 
                fix syntax issues.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-6 bg-b1">
                <div className="w-full max-w-lg">
                  <JsonField
                    name="apiData"
                    value={apiData}
                    onChange={handleApiDataChange}
                    onError={setError}
                    validateOnChange={true}
                    rows={10}
                    indent={4}
                  />
                  {error && (
                    <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                      <strong>Validation Error:</strong> {error}
                    </div>
                  )}
                  <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
                    <strong>API Data:</strong> {JSON.stringify(apiData)}
                  </div>
                </div>
              </div>
              <Code language="typescript">{examples[1]}</Code>
            </div>

            <h2 id="readonly" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Read-only Display')}
            </h2>
            <p className="py-2">
              <Translate>
                Use <C value="readOnly={true}"/> to display JSON data in a 
                non-editable format. Perfect for showing API responses, 
                configuration previews, or debug information.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-6 bg-b1">
                <div className="w-full max-w-lg">
                  <JsonField
                    value={{
                      user: {
                        name: "Jane Doe",
                        email: "jane@example.com",
                        preferences: {
                          theme: "dark",
                          notifications: true
                        }
                      },
                      settings: {
                        language: "en",
                        timezone: "UTC"
                      }
                    }}
                    readOnly
                    rows={12}
                  />
                </div>
              </div>
              <Code language="typescript">{examples[2]}</Code>
            </div>

            <h2 id="formatting" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Auto-formatting & Customization')}
            </h2>
            <p className="py-2">
              <Translate>
                JsonField automatically formats JSON on blur or when the Format 
                button is clicked. Customize indentation with the <C value="indent"/> prop.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-6 bg-b1">
                <div className="w-full max-w-lg">
                  <JsonField
                    name="theme"
                    defaultValue={{
                      colors: {
                        primary: "#007bff",
                        secondary: "#6c757d",
                        success: "#28a745",
                        danger: "#dc3545"
                      },
                      fonts: {
                        body: "Arial, sans-serif",
                        heading: "Georgia, serif"
                      }
                    }}
                    placeholder="Customize your theme..."
                    indent={2}
                    rows={8}
                  />
                </div>
              </div>
              <Code language="typescript">{examples[3]}</Code>
            </div>

            <h2 className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Form Integration')}
            </h2>
            <p className="py-2">
              <Translate>
                JsonField works seamlessly with HTML forms using hidden inputs 
                when the <C value="name"/> prop is provided.
              </Translate>
            </p>
            <div className="curved">
              <div className="p-6 bg-b1">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target as HTMLFormElement);
                  alert(`Form Data: ${JSON.stringify(Object.fromEntries(data.entries()))}`);
                }}>
                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">API Configuration:</label>
                    <JsonField
                      name="formApiConfig"
                      defaultValue={{
                        baseUrl: "https://api.example.com",
                        timeout: 5000,
                        retries: 3
                      }}
                      rows={6}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">User Preferences:</label>
                    <JsonField
                      name="formUserPrefs"
                      defaultValue={{
                        theme: "light",
                        language: "en",
                        notifications: {
                          email: true,
                          push: false
                        }
                      }}
                      rows={8}
                      indent={4}
                    />
                  </div>
                  
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Submit Form
                  </button>
                </form>
              </div>
              <Code language="typescript">
{`<form onSubmit={handleSubmit}>
  <JsonField 
    name="apiConfig" 
    defaultValue={{ baseUrl: "https://api.example.com" }}
    rows={6}
  />
  <JsonField 
    name="userPrefs" 
    defaultValue={{ theme: "light", notifications: true }}
    rows={8}
  />
  <button type="submit">Submit</button>
</form>`}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2 hover:text-link" href="/field/image">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Image')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2 hover:text-link" href="/field/knob">
                {_('Knob')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
