/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: ['./node_modules/flowbite/**/*.js', './node_modules/flowbite-react/**/*.js', './public/**/*.html', './app/**/*.{ts,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('flowbite/plugin')],
  theme: {},
}
