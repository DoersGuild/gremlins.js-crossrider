appAPI.ready(function($) {
  "use strict";
  var gremlinsActive;
  gremlinsActive = {};
  appAPI.browserAction.setResourceIcon('images/icon.png');
  appAPI.browserAction.setTitle('Release the Gremlins');
  appAPI.browserAction.setBadgeText('Start');
  appAPI.browserAction.setBadgeBackgroundColor([0, 255, 0, 150]);
  appAPI.browserAction.onClick(function() {
    appAPI.tabs.getActive(function(tabInfo) {
      appAPI.message.toActiveTab({
        "gremlinsActive": !gremlinsActive[tabInfo.tabId]
      });
      console.log("Command sent", !gremlinsActive[tabInfo.tabId]);
    });
  });
  appAPI.tabs.onTabSelectionChanged(function(tabInfo) {
    appAPI.browserAction.setBadgeText('');
    appAPI.message.toActiveTab({
      "getStatus": true
    });
    console.log("Tab selection changed; Requesting status", tabInfo);
  });
  appAPI.message.addListener(function(msg) {
    console.log("Msg from tab", msg);
    appAPI.tabs.getActive(function(tabInfo) {
      if (msg.gremlinsActive) {
        appAPI.browserAction.setBadgeText('Stop');
        appAPI.browserAction.setBadgeBackgroundColor([255, 0, 0, 150]);
        gremlinsActive[tabInfo.tabId] = true;
      } else {
        appAPI.browserAction.setBadgeText('Start');
        appAPI.browserAction.setBadgeBackgroundColor([0, 255, 0, 150]);
        gremlinsActive[tabInfo.tabId] = false;
      }
    });
  });
});
