export type UnoCSSVariantMatcherFill = (
  matcher: string
) => {
  matcher: string,
  parent: string,
  sort: number
} | string;

export type UnoCSSRuleMatcherFill = (
  args: string[]
) => Record<string, string | undefined>;

export type FruiPreset = {
  name: string,
  variants: Array<UnoCSSVariantMatcherFill>,
  rules: Array<[ RegExp, UnoCSSRuleMatcherFill ]>,
};

const fruiPreset: FruiPreset = {
  name: 'unocss-frui-preset',
  variants: [
    //desktop first rule set
    matcher => matcher.startsWith('r4xl-') ? {
      matcher: matcher.slice(5),
      parent: '@media (max-width: 1920px)',
      sort: -10
    }: matcher,
    matcher => matcher.startsWith('r3xl-') ? {
      matcher: matcher.slice(5),
      parent: '@media (max-width: 1536px)',
      sort: -20
    }: matcher,
    matcher => matcher.startsWith('r2xl-') ? {
      matcher: matcher.slice(5),
      parent: '@media (max-width: 1280px)',
      sort: -30
    }: matcher,
    matcher => matcher.startsWith('rxl-') ? {
      matcher: matcher.slice(4),
      parent: '@media (max-width: 1024px)',
      sort: -40
    }: matcher,
    matcher => matcher.startsWith('rlg-') ? {
      matcher: matcher.slice(4),
      parent: '@media (max-width: 992px)',
      sort: -50
    }: matcher,
    matcher => matcher.startsWith('rmd-') ? {
      matcher: matcher.slice(4),
      parent: '@media (max-width: 767px)',
      sort: -60
    }: matcher,
    matcher => matcher.startsWith('rsm-') ? {
      matcher: matcher.slice(4),
      parent: '@media (max-width: 420px)',
      sort: -70
    }: matcher,
    matcher => matcher.startsWith('rxs-') ? {
      matcher: matcher.slice(4),
      parent: '@media (max-width: 360px)',
      sort: -80
    }: matcher,
  ],
  rules: [
    //theme rule set
    [ /^theme-(\w+)$/, ([_, color]) => ({ color: `var(--${color})` }) ],
    [ /^theme-(\d)$/, ([_, color]) => {
      if (color === '0') return { color: 'var(--zero)' };
      if (color === '1') return { color: 'var(--default)' };
      if (color === '2') return { color: 'var(--primary)' };
      if (color === '3') return { color: 'var(--secondary)' };
      return {};
    } ],
    [ /^theme-bg-(\w+)$/, ([_, color]) => ({ 'background-color': `var(--${color})` }) ],
    [ /^theme-bg-(\d)$/, ([_, color]) => {
      if (color === '0') return { 'background-color': 'var(--bg-zero)' };
      if (color === '1') return { 'background-color': 'var(--bg-first)' };
      if (color === '2') return { 'background-color': 'var(--bg-second)' };
      if (color === '3') return { 'background-color': 'var(--bg-third)' };
      if (color === '4') return { 'background-color': 'var(--bg-fourth)' };
      return {};
    } ],
    [ /^theme-bc-(\w+)$/, ([_, color]) => ({ 'border-color': `var(--${color})` }) ],
    [ /^theme-bc-(\d)$/, ([_, color]) => {
      if (color === '0') return { 'border-color': 'var(--bg-zero)' };
      if (color === '1') return { 'border-color': 'var(--bg-first)' };
      if (color === '2') return { 'border-color': 'var(--bg-second)' };
      if (color === '3') return { 'border-color': 'var(--bg-third)' };
      if (color === '4') return { 'border-color': 'var(--bg-fourth)' };
      return {};
    } ],
    //hex color rule set
    [ /^hex-(\w{2,6})$/, ([_, color]) => ({ color: `#${color}` }) ],
    [ /^hex-bg-(\w{2,6})$/, ([_, color]) => ({ 'background-color': `#${color}` }) ],
    [ /^hex-bc-(\w{2,6})$/, ([_, color]) => ({ 'border-color': `#${color}` }) ],
    //rgba color rule set
    [ /^rgb-(\d+)-(\d+)-(\d+)$/, ([_, r, g, b]) => ({ color: `rgb(${r}, ${g}, ${b})` }) ],
    [ /^rgb-bg-(\d+)-(\d+)-(\d+)$/, ([_, r, g, b]) => ({ 'background-color': `rgb(${r}, ${g}, ${b})` }) ],
    [ /^rgb-bc-(\d+)-(\d+)-(\d+)$/, ([_, r, g, b]) => ({ 'border-color': `rgb(${r}, ${g}, ${b})` }) ],
    [ /^rgba-(\d+)-(\d+)-(\d+)-(\d+)$/, ([_, r, g, b, a]) => ({ color: `rgba(${r}, ${g}, ${b}, ${Number(a) / 100})` }) ],
    [ /^rgba-bg-(\d+)-(\d+)-(\d+)-(\d+)$/, ([_, r, g, b, a]) => ({ 'background-color': `rgba(${r}, ${g}, ${b}, ${Number(a) / 100})` }) ],
    [ /^rgba-bc-(\d+)-(\d+)-(\d+)-(\d+)$/, ([_, r, g, b, a]) => ({ 'border-color': `rgba(${r}, ${g}, ${b}, ${Number(a) / 100})` }) ],
    //pixel perfect rule set
    [ /^px-ba-([\.\d]+)$/, ([_, num]) => ({ 'border-width': `${num}px` }) ],
    [ /^px-bb-([\.\d]+)$/, ([_, num]) => ({ 'border-bottom-width': `${num}px` }) ],
    [ /^px-bl-([\.\d]+)$/, ([_, num]) => ({ 'border-left-width': `${num}px` }) ],
    [ /^px-br-([\.\d]+)$/, ([_, num]) => ({' border-right-width': `${num}px` }) ],
    [ /^px-bt-([\.\d]+)$/, ([_, num]) => ({ 'border-top-width': `${num}px` }) ],
    [ /^px-bx-([\.\d]+)$/, ([_, num]) => ({ 'border-left-width': `${num}px`, 'border-right-width': `${num}px` }) ],
    [ /^px-by-([\.\d]+)$/, ([_, num]) => ({ 'border-bottom-width': `${num}px`, 'border-top-width': `${num}px` }) ],
    [ /^px-m-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` }) ],
    [ /^px-m-(\-{0,1}[\.\d]+)-(\-{0,1}[\.\d]+)-(\-{0,1}[\.\d]+)-(\-{0,1}[\.\d]+)$/, ([_, num1, num2, num3, num4]) => ({ margin: `${num1}px ${num2}px ${num3}px ${num4}px` }) ],
    [ /^px-mb-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ 'margin-bottom': `${num}px` }) ],
    [ /^px-ml-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}px` }) ],
    [ /^px-mr-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({' margin-right': `${num}px` }) ],
    [ /^px-mt-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}px` }) ],
    [ /^px-mx-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}px`, 'margin-right': `${num}px` }) ],
    [ /^px-my-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ 'margin-bottom': `${num}px`, 'margin-top': `${num}px` }) ],
    [ /^px-p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` }) ],
    [ /^px-p-([\.\d]+)-([\.\d]+)-([\.\d]+)-([\.\d]+)$/, ([_, num1, num2, num3, num4]) => ({ padding: `${num1}px ${num2}px ${num3}px ${num4}px` }) ],
    [ /^px-pb-([\.\d]+)$/, ([_, num]) => ({ 'padding-bottom': `${num}px` }) ],
    [ /^px-pl-([\.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}px` }) ],
    [ /^px-pr-([\.\d]+)$/, ([_, num]) => ({' padding-right': `${num}px` }) ],
    [ /^px-pt-([\.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}px` }) ],
    [ /^px-px-([\.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}px`, 'padding-right': `${num}px` }) ],
    [ /^px-py-([\.\d]+)$/, ([_, num]) => ({ 'padding-bottom': `${num}px`, 'padding-top': `${num}px` }) ],
    [ /^px-h-([\.\d]+)$/, ([_, num]) => ({ height: `${num}px` }) ],
    [ /^px-w-([\.\d]+)$/, ([_, num]) => ({ width: `${num}px` }) ],
    [ /^px-mh-([\.\d]+)$/, ([_, num]) => ({ 'max-height': `${num}px` }) ],
    [ /^px-mw-([\.\d]+)$/, ([_, num]) => ({ 'max-width': `${num}px` }) ],
    [ /^px-b-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ bottom: `${num}px` }) ],
    [ /^px-l-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ left: `${num}px` }) ],
    [ /^px-r-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ right: `${num}px` }) ],
    [ /^px-t-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ top: `${num}px` }) ],
    [ /^px-o-(\d+)$/, ([_, num]) => ({ 'opacity': `${Number(num) / 100}` }) ],
    [ /^px-z-(\-{0,1}\d+)$/, ([_, num]) => ({ 'z-index': num }) ],
    [ /^px-lh-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ 'line-height': `${num}px` }) ],
    [ /^px-fb-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ 'flex-basis': `${num}px` }) ],
    [ /^px-fg-(\-{0,1}[\.\d]+)$/, ([_, num]) => ({ 'gap': `${num}px` }) ],
    [ /^px-fs-([\.\d]+)$/, ([_, num]) => ({ 'font-size': `${num}px` }) ],
    [ /^px-bw-([\.\d]+)$/, ([_, num]) => ({ 'border-width': `${num}px` }) ],
    [ /^px-m-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ margin: `calc(${per}% - ${num}px)` }) ],
    [ /^px-mb-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'margin-bottom': `calc(${per}% - ${num}px)` }) ],
    [ /^px-ml-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'margin-left': `calc(${per}% - ${num}px)` }) ],
    [ /^px-mr-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'margin-right': `calc(${per}% - ${num}px)` }) ],
    [ /^px-mt-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'margin-top': `calc(${per}% - ${num}px)` }) ],
    [ /^px-p-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ padding: `calc(${per}% - ${num}px)` }) ],
    [ /^px-pb-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'padding-bottom': `calc(${per}% - ${num}px)` }) ],
    [ /^px-pl-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'padding-left': `calc(${per}% - ${num}px)` }) ],
    [ /^px-pr-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'padding-right': `calc(${per}% - ${num}px)` }) ],
    [ /^px-pt-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'padding-top': `calc(${per}% - ${num}px)` }) ],
    [ /^px-h-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ height: `calc(${per}% - ${num}px)` }) ],
    [ /^px-w-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ width: `calc(${per}% - ${num}px)` }) ],
    [ /^px-mh-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'max-height': `calc(${per}% - ${num}px)` }) ],
    [ /^px-mw-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'max-width': `calc(${per}% - ${num}px)` }) ],
    [ /^px-fb-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'flex-basis': `calc(${per}% - ${num}px)` }) ],
    [ /^px-fg-([\.\d]+)-([\.\d]+)$/, ([_, per, num]) => ({ 'gap': `calc(${per}% - ${num}px)` }) ]
  ]
};

export default fruiPreset;