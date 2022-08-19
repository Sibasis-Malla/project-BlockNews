module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        'card': '30rem',
      },
      fontFamily: {
        antic: "'Antic Didone', serif",
        roboto: "'Roboto', sans-serif",
        robotoMono: "'Roboto Mono', monospace",
      },
      screen: {
        sm: '2rem',
        md: '4rem',
        lg: '6rem',
        xl: '10rem',
        '2xl': '20rem',
        new: '1600px',
        participant: '600px',
      },
      colors: {
        primary: '#190D2C',
        cardcol: '#0f0126',
        timer: '#FFF5CE',
        tcolor: '#94A1B2',
        tag: '#8247E5',
        cyan: '#00FFFF',
        wallet: '#8247E5',
        secondary: '#000000',
        nav: '#ffffff10',
        textcol: '#fffffe',
        blue: {
          450: '#5f99f7',
        },
      },
      width: {
        128: '32rem',
      },
    },
  },
  variants: {
    boxshadow: ['responsive', 'hover', 'focus'],
    extend: {},
  },
  plugins: [],
};
