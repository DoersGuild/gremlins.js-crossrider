appAPI.ready ($) ->
    "use strict"

    console.log appAPI.browserAction

    # Set resource icon
    appAPI.browserAction.setResourceIcon 'images/icon.png'

    # Sets the tooltip for the button
    appAPI.browserAction.setTitle 'Release the Gremlins'

    # Badge text
    appAPI.browserAction.setBadgeText 'Attack'

    false
