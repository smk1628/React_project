/** craco.config.js */

const CracoLessPlugin = require('craco-less');

module.exports = {
  babel: {   //用来支持装饰器
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'rgb(38,188,213)' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};