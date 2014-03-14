appAPI.ready ($) ->
    # Do something (ideal for handling browser button, global timers, etc.)
    "use strict"
    console.log "My new Crossrider extension works! The current page is: " + document.location.href
    appAPI.resources.includeJS "js/gremlins.min.js"
    false
