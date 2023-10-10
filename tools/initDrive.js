const webdriver = require('selenium-webdriver') // 加入虛擬網頁套件
const chrome = require('selenium-webdriver/chrome');
exports.initDrive = initDrive;//讓其他程式在引入時可以使用這個函式
async function initDrive() {
  // 建立這個browser的類型
  const options = new chrome.Options();
  //因為FB會有notifications干擾到爬蟲，所以要先把它關閉
  options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });
  return await new webdriver.Builder().forBrowser("chrome").withCapabilities(
    options,
    { acceptSslCerts: true, acceptInsecureCerts: true }//解決跨網域問題
  ).build();
}
