const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLessModule = require('./build/react-app-rewire-less-module');

module.exports = function override(config, env) {
  config = injectBabelPlugin('transform-decorators-legacy', config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);

  config = rewireLessModule(config, env, {
    modifyVars: {
      // 需要覆盖的antd主题变量
      '@primary-color': '#1DA57A',
    },
  });

  return config;
};
