import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'b0': 'var(--bg-zero)',
        'b1': 'var(--bg-first)',
        'b2': 'var(--bg-second)',
        'b3': 'var(--bg-third)',
        'b4': 'var(--bg-fourth)',
        'b-inverse': 'var(--bg-inverse)',
        'b-info': 'var(--bg-info)',
        'b-error': 'var(--bg-error)',
        'b-warning': 'var(--bg-warning)',
        'b-success': 'var(--bg-success)',
        't0': 'var(--fg-zero)',
        't1': 'var(--fg-default)',
        't2': 'var(--fg-primary)',
        't3': 'var(--fg-secondary)',
        't-inverse': 'var(--fg-inverse)',
        't-info': 'var(--fg-info)',
        't-error': 'var(--fg-error)',
        't-warning': 'var(--fg-warning)',
        't-success': 'var(--fg-success)',
        't-muted': 'var(--fg-muted)'
      },
      fontFamily: {
        awesome: ['"Font Awesome 6 Free"']
      },
      content: {
        'icon-error': '"\\f06a"',
        'icon-info': '"\\f05a"',
        'icon-success': '"\\f058"',
        'icon-warning': '"\\f071"',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5'
      }
    },
  },
  plugins: [],
}
export default config
