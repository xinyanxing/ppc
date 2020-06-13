const { override, fixBabelImports, addLessLoader } = require('customize-cra');


const findWebpackPlugin = (plugins, pluginName) =>
  plugins.find(plugin => plugin.constructor.name === pluginName);

const overrideProcessEnv = value => config => {
  const plugin = findWebpackPlugin(config.plugins, 'DefinePlugin');
  const processEnv = plugin.definitions['process.env'] || {};

  plugin.definitions['process.env'] = {
    ...processEnv,
    ...value,
  };

  return config;
};

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {},
  }),
  overrideProcessEnv({
    SERVICE: JSON.stringify(process.env.SERVICE),
  })
);