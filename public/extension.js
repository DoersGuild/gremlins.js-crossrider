appAPI.ready(function($) {
  "use strict";
  var browserGremlins, err, gremlinsActive, horde, tag, windowCompatible;
  appAPI.resources.addInlineJS("js/gremlins.min.js");
  gremlinsActive = false;
  browserGremlins = (typeof unsafeWindow !== "undefined" && unsafeWindow !== null ? unsafeWindow.gremlins : void 0) || (typeof window !== "undefined" && window !== null ? window.gremlins : void 0);
  if (!browserGremlins) {
    try {
      tag = document.createElement("div");
      tag.setAttribute("onclick", "return window;");
      windowCompatible = tag.onclick();
      browserGremlins = windowCompatible != null ? windowCompatible.gremlins : void 0;
    } catch (_error) {
      err = _error;
      console.warn("No gremlins for you", err.message);
      return false;
    }
  }
  horde = browserGremlins.createHorde();
  horde.after(function() {
    gremlinsActive = false;
    appAPI.message.toBackground({
      gremlinsActive: gremlinsActive
    });
  });
  appAPI.message.toBackground({
    gremlinsActive: gremlinsActive
  });
  appAPI.message.addListener(function(msg) {
    console.log("Received", msg);
    if (msg.getStatus) {
      appAPI.message.toBackground({
        gremlinsActive: gremlinsActive
      });
    } else {
      appAPI.message.toCurrentTabIframes(msg);
      if (msg.gremlinsActive) {
        gremlinsActive = true;
        horde.unleash();
        appAPI.message.toBackground({
          gremlinsActive: gremlinsActive
        });
      } else {
        gremlinsActive = false;
        horde.stop();
        appAPI.message.toBackground({
          gremlinsActive: gremlinsActive
        });
      }
    }
  });
});
