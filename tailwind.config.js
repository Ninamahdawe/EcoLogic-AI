import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"SF Pro Display"', '"SF Pro Text"', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        canopy: '#0f3528',
        cedar: '#1e4d3a',
        fern: '#58a483',
        moss: '#7bb893',
        mist: '#f5f8f2',
        bark: '#1a1f1b',
      },
      backgroundImage: {
        'forest-canopy': 'radial-gradient(circle at 10% 20%, rgba(123,184,147,0.28) 0, transparent 45%), radial-gradient(circle at 80% 0%, rgba(88,164,131,0.25) 0, transparent 40%), radial-gradient(circle at 50% 80%, rgba(15,53,40,0.15) 0, transparent 35%)',
        'grain-noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='none'/%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='40' cy='60' r='1'/%3E%3Ccircle cx='90' cy='30' r='1'/%3E%3Ccircle cx='140' cy='80' r='1'/%3E%3Ccircle cx='70' cy='120' r='1'/%3E%3Ccircle cx='30' cy='140' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      dropShadow: {
        canopy: '0 45px 80px rgba(15,53,40,0.22)',
      },
      boxShadow: {
        canopy: 'none',
        branch: 'none',
      },
    },
  },
  plugins: [],
}
