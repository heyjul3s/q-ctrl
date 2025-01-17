/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_'
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript'
  ],
  devOptions: {
    open: 'false'
  },
  alias: {
    '@components': './src/components',
    '@state': './src/state'
  }
};
