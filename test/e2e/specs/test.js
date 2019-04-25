// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser.url(devServer)
      .waitForElementVisible('#app', 5000);
    browser.expect.element('.toggle-volume')
      .to.not.be.visible
    browser.expect.element('[title=pause]')
      .to.have.attribute('disabled')
    browser.expect.element('[title=stop]')
      .to.have.attribute('disabled')
    browser.expect.element('[title=start]')
      .to.not.have.attribute('disabled')
    browser.click('[title=start]')
      .waitForElementVisible('.toggle-volume', 5000)
    browser.expect.element('[title=pause]')
      .to.not.have.attribute('disabled')
    browser.expect.element('[title=stop]')
      .to.not.have.attribute('disabled')
    browser.expect.element('[title=start]')
      .to.have.attribute('disabled')
    browser.end()
  },

  'wait for kitten test': (browser) => {
    browser.url(browser.globals.devServerURL)
    .waitForElementVisible('#app', 5000)
    // initially the kitten element is not visible
    browser.expect.element('.well.kittens').to.not.be.visible
    // click on the start button and wait for 7s for
    // kitten element to appear
    browser.click('[title=start]').waitForElementVisible('.well.kittens', 7000)
    // check that the image contains the src element
    // that matches thecatapi string
    browser.expect.element('.well.kittens img')
    .to.have.attribute('src')
    .which.matches(/thecatapi/);
    browser.end()
  }
}
