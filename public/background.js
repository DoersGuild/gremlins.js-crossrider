appAPI.ready(function($) {
  "use strict";
  console.log(appAPI.browserAction);
  appAPI.browserAction.setResourceIcon('images/icon.png');
  appAPI.browserAction.setTitle('Release the Gremlins');
  appAPI.browserAction.setBadgeText('Attack');
  return false;
});
