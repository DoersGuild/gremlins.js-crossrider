appAPI.ready ($) ->
    "use strict"

    gremlinsActive = {}

    # Set resource icon
    appAPI.browserAction.setResourceIcon 'images/icon.png'

    # Sets the tooltip for the button
    appAPI.browserAction.setTitle 'Release the Gremlins'

    appAPI.browserAction.setBadgeText 'Start'
    appAPI.browserAction.setBadgeBackgroundColor [0, 255, 0, 150]

    appAPI.browserAction.onClick () ->

        appAPI.tabs.getActive (tabInfo) ->

            appAPI.message.toActiveTab
                "gremlinsActive" : !gremlinsActive[tabInfo.tabId]

            console.log "Command sent", !gremlinsActive[tabInfo.tabId]

            return

        return

    appAPI.tabs.onTabSelectionChanged  (tabInfo) ->
        # Get current tab's status when switching to it
        appAPI.browserAction.setBadgeText ''
        appAPI.message.toActiveTab
            "getStatus" : true
        console.log "Tab selection changed; Requesting status", tabInfo
        return

    appAPI.message.addListener (msg) ->
        # Set the badge text
        console.log "Msg from tab", msg

        appAPI.tabs.getActive (tabInfo) ->

            if msg.gremlinsActive
                appAPI.browserAction.setBadgeText 'Stop'
                appAPI.browserAction.setBadgeBackgroundColor [255, 0, 0, 150]
                gremlinsActive[tabInfo.tabId] = true
            else
                appAPI.browserAction.setBadgeText 'Start'
                appAPI.browserAction.setBadgeBackgroundColor [0, 255, 0, 150]
                gremlinsActive[tabInfo.tabId] = false

            return

        return

    return
