const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '5hawje',
  e2e: {
    baseUrl: "https://dev500designs.wpengine.com",
    chromeWebSecurity: false,
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 20000,
    requestTimeout: 5000,
    viewportWidth: 1440,
    viewportHeight: 900,
    waitForAnimations:	true,
    animationDistanceThreshold:	5,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      hideXhr: true
    }
  },
});
