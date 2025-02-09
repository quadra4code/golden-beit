/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    fontFamily :{
      'poppins' : ['Poppins', 'sans-serif'],
      'cairo' : ['Cairo', 'sans-serif'],
      'LibreBaskerville' : ['Libre Baskerville', 'sans-serif'],
    },
    boxShadow: {
      'custom':'0px 4px 4px 0px #00000036'
    },
    fontSize: {
      xxs: '0.6rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': '4.7rem',
    },
    lineHeight:{
      'xxl':'3rem'
    },
    borderRadius: {
      'half':'50%',
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
      '2xl': '16px',
    },
    extend: {
      colors: {
        'navbar-blue' : '#4e3426',
        'golden-sand' : '#d8b773',
        'deep-teal' : '#256882',
        'blueBlack' : '#1C2D49',
        'deep-teal-hover' : '#22566a',
        'golden-sand-hover' : 'rgb(178 150 92)',
        'gray' : '#f5f5f5',
        'input' : '#ECF9FE',
      }
    },
  },
  plugins: [],
}
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX/TS/TSX files in the src folder
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

