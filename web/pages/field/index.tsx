//types
import type { Crumb } from "modules/components/Crumbs";
//hooks
import { useLanguage } from "r22n";
import { useRouter } from "next/router";
//fields
import Crumbs from "modules/components/Crumbs";
import { LayoutPanel } from "modules/theme";
import Autocomplete from "frui/field/Autocomplete";
import Checkbox from "frui/field/Checkbox";
import CodeEditor from "frui/field/CodeEditor";
import Country from "frui/field/Country";
import Currency from "frui/field/Currency";
import Date from "frui/field/Date";
import Datetime from "frui/field/Datetime";
import File from "frui/field/File";
import Filelist from "frui/field/Filelist";
import ImageField from "frui/field/Image";
import Imagelist from "frui/field/Imagelist";
import Input from "frui/field/Input";
import Markdown from "frui/field/Markdown";
import Mask from "frui/field/Mask";
import Metadata from "frui/field/Metadata";
import Number from "frui/field/Number";
import Password from "frui/field/Password";
import Radio from "frui/field/Radio";
import Select from "frui/field/Select";
import Slug from "frui/field/Slug";
import Switch from "frui/field/Switch";
import Taglist from "frui/field/Taglist";
import Textarea from "frui/field/Textarea";
import Textlist from "frui/field/Textlist";
import Time from "frui/field/Time";

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  const router = useRouter();
  //variables
  const crumbs: Crumb[] = [{ icon: "rectangle-list", label: "Fields" }];
  //render
  return (
    <LayoutPanel
      uri="/field"
      title="Fields"
      description="Choose from over 25 ReactJS field components to use in your application."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow pt-3 pb-5 overflow-auto">
          <h1 className="px-3 flex items-center uppercase font-bold text-xl">
            {_("Fields")}
          </h1>
          <p className="px-3 pt-3">
            Thanks to our sponsors, contributors, and users. The following
            fields have been unlocked and are free to use.
          </p>
          <div className="flex flex-wrap mt-4">
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Autocomplete options={["foo", "bar"]} value="bar" />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/autocomplete")}
                >
                  {_("Autocomplete")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Checkbox checked label="Enable" className="text-white" />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/checkbox")}
                >
                  {_("Checkbox")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 7,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_("Checklist")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <CodeEditor
                    setup="basic"
                    className="w-[60%] h-[50%] bg-white"
                    value='console.log("Hello, World!");'
                    language="ts"
                  />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/code-editor")}
                >
                  {_("Code Editor")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 1,000 donations
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_("Color")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Country className="w-full" value="US" />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/country")}
                >
                  {_("Country")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Currency className="w-full" value="USD" />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/currency")}
                >
                  {_("Currency")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Date />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/date")}
                >
                  {_("Date")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Datetime />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/datetime")}
                >
                  {_("Datetime")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-left">
                    <Textlist value={["foobar"]} add="Add More" />
                  </div>
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/fieldset")}
                >
                  {_("Fieldset")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <File className="bg-white w-[150px]" />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/file")}
                >
                  {_("File")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Filelist
                    className="bg-white w-[150px]"
                    defaultValue={["https://images.wsj.net/8SR.pdf"]}
                  />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/filelist")}
                >
                  {_("Filelist")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] bg-b1 px-3">
                  <ImageField
                    className="bg-white w-[150px]"
                    value="https://images.wsj.net/im-580612/8SR"
                  />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/image")}
                >
                  {_("Image")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Imagelist
                    className="bg-white w-[150px]"
                    defaultValue={["https://images.wsj.net/im-580612/8SR"]}
                  />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/imagelist")}
                >
                  {_("Imagelist")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Input placeholder="Basic Input" />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/input")}
                >
                  {_("Input")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 15,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_("JSON")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 21,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_("Knob")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Markdown rows={2} defaultValue="# FRUI" />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/markdown")}
                >
                  {_("Markdown")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Mask mask="999-999-9999" placeholder="999-999-9999" />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/mask")}
                >
                  {_("Mask")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-left">
                    <Metadata
                      add="Add More"
                      value={Object.entries({ foo: "bar" })}
                    />
                  </div>
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/metadata")}
                >
                  {_("Metadata")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 12,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_("Multi Select")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Number defaultValue="1234.56" />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/number")}
                >
                  {_("Number")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Password value="1234567890" />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/password")}
                >
                  {_("Password")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Radio rounded checked className="text-white" label="Yes" />
                  <Radio
                    rounded
                    checked={false}
                    className="text-white ml-2"
                    label="No"
                  />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/radio")}
                >
                  {_("Radio")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 9,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_("Radio Group")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 18,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_("Range Slider")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 3,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_("Rating")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Select
                    className="w-full"
                    options={[]}
                    value={{
                      label: (
                        <div className="flex items-center w-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="foobar"
                            height="30"
                            width="30"
                            src="https://e7.pngegg.com/pngimages/971/854/png-clipart-white-and-gray-illustration-angle-symbol-snout-fictional-character-black-metroui-apps-foobar-angle-logo-thumbnail.png"
                          />
                          <div className="ml-2 text-left flex-grow">Foobar</div>
                          <i className="fas fa-chevron-down"></i>
                        </div>
                      ),
                      value: "bar",
                    }}
                  />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/select")}
                >
                  {_("Select")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Slug value="I am a Title" />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/slug")}
                >
                  {_("Slug")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Switch ridge checked rounded />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/switch")}
                >
                  {_("Switch")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Taglist value={["foo", "bar"]} />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/taglist")}
                >
                  {_("Taglist")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Textarea placeholder="Morbi tincidunt, dolor at sodales auctor, magna eros sagittis enim, ut aliquet velit nulla vel metus." />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/textarea")}
                >
                  {_("Textarea")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-left">
                    <Textlist value={["foobar"]} add="Add More" />
                  </div>
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/textlist")}
                >
                  {_("Textlist")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Time />
                </div>
                <h2
                  className="my-2 font-semibold text-center uppercase"
                  onClick={() => router.push("/field/time")}
                >
                  {_("Time")}
                </h2>
              </div>
            </div>
            <div className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 5,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_("WYSIWYG")}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}