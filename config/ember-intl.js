/*jshint node:true*/

module.exports = function(environment) {
  return {
    locales: ['en-us', 'en-gb', 'fr-fr'],
    baseLocale: null,
    disablePolyfill: false,
    publicOnly: false,
    inputPath: 'translations',
    outputPath: 'translations'
  };
};
