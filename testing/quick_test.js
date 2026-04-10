// Quick test to see if Selenium can open Chrome
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async () => {
  console.log("Attempting to launch Chrome...");
  try {
    const options = new chrome.Options();
    options.addArguments("--start-maximized");
    options.excludeSwitches("enable-logging");
    
    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    
    console.log("✅ Chrome launched!");
    await driver.get("http://localhost:3000/login");
    console.log("✅ Page loaded!");
    
    const title = await driver.getTitle();
    console.log("Page title:", title);
    
    await driver.quit();
    console.log("✅ Done!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
