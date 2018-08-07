const cloneDeep = require('lodash.clonedeep');

const ruleChildren = loader => loader.use || loader.oneOf || (Array.isArray(loader.loader) && loader.loader) || [];

const findIndexAndRules = (rulesSource, ruleMatcher) => {
  let result;
  const rules = Array.isArray(rulesSource) ? rulesSource : ruleChildren(rulesSource);
  rules.some(
    (rule, index) =>
      (result = ruleMatcher(rule) ? { index, rules } : findIndexAndRules(ruleChildren(rule), ruleMatcher))
  );
  return result;
};

const findRule = (rulesSource, ruleMatcher) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
  return rules[index];
};

const cssRuleMatcher = rule => rule.test && String(rule.test) === String(/\.css$/);

const createLoaderMatcher = loader => rule => rule.loader && rule.loader.indexOf(`/${loader}/`) !== -1;
const cssLoaderMatcher = createLoaderMatcher('css-loader');
const postcssLoaderMatcher = createLoaderMatcher('postcss-loader');
const fileLoaderMatcher = createLoaderMatcher('file-loader');

const addAfterRule = (rulesSource, ruleMatcher, value) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
  rules.splice(index + 1, 0, value);
};

const addBeforeRule = (rulesSource, ruleMatcher, value) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
  rules.splice(index, 0, value);
};

module.exports = function(config, env, lessOptions = {}) {
  const cssRule = findRule(config.module.rules, cssRuleMatcher);
  const lessRule = cloneDeep(cssRule);
  const cssModulesRule = cloneDeep(cssRule);

  cssRule.exclude = /\.module\.css$/;

  const cssModulesRuleCssLoader = findRule(cssModulesRule, cssLoaderMatcher);
  cssModulesRuleCssLoader.options = Object.assign(
    { modules: true, localIdentName: '[local]___[hash:base64:5]' },
    cssModulesRuleCssLoader.options
  );
  addBeforeRule(config.module.rules, fileLoaderMatcher, cssModulesRule);

  lessRule.test = /\.less$/;
  lessRule.exclude = /\.module\.less$/;
  // 将lessOptions传入，以重写antd的主题
  addAfterRule(lessRule, postcssLoaderMatcher, {
    loader: require.resolve('less-loader'),
    options: lessOptions,
  });
  addBeforeRule(config.module.rules, fileLoaderMatcher, lessRule);

  const lessModulesRule = cloneDeep(cssModulesRule);
  lessModulesRule.test = /\.module\.less$/;

  addAfterRule(lessModulesRule, postcssLoaderMatcher, require.resolve('less-loader'));
  addBeforeRule(config.module.rules, fileLoaderMatcher, lessModulesRule);

  return config;
};
