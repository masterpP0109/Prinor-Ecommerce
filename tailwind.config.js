/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#9333EA',
        accent: '#FBBF24',
        neutral: '#F3F4F6',
        'meta-1': '#F9FAFB',
        'meta-2': '#E5E7EB',
        'meta-3': '#3B82F6',
        'meta-4': '#6B7280',
        'meta-5': '#EF4444',
      },
      spacing: {
        '90': '22.5rem',
        '11.5': '2.875rem',
        '7.5': '1.875rem',
      },
    },
  },
  plugins: [],
}