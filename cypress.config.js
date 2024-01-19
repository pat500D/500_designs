const { defineConfig } = require("cypress");
const browserstackTestObservabilityPlugin = require('browserstack-cypress-cli/bin/testObservability/plugin');

module.exports = defineConfig({
  projectId: '5hawje',
  e2e: {
    baseUrl: "https://dev500designs.wpengine.com/",
    chromeWebSecurity: false,
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    requestTimeout: 5000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    waitForAnimations:	true,
    animationDistanceThreshold:	5,
    setupNodeEvents(on, config) {
      browserstackTestObservabilityPlugin(on, config);
      return config;
    },
    env: {
      hideXhr: true,
      DEV: "https://dev500designs.wpengine.com/",
      STG: "https://stg500designs.wpengine.com/",
      PRD: "https://500designs.com/"
    }
  },
});
