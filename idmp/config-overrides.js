const { override, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path')

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
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {},
  }),
  addWebpackAlias({
    ["view"]: path.resolve(__dirname, "src/view"),
    ["component"]: path.resolve(__dirname, "src/component"),
  }),
  overrideProcessEnv({
    SERVICE: JSON.stringify(process.env.SERVICE),
  })
);
