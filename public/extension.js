appAPI.ready(function($) {
  "use strict";
  console.log("My new Crossrider extension works! The current page is: " + document.location.href);
  appAPI.resources.includeJS("js/gremlins.min.js");
  return false;
});
