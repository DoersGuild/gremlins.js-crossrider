appAPI.ready ($) ->
    # Do something (ideal for handling browser button, global timers, etc.)
    "use strict"

    appAPI.resources.addInlineJS "js/gremlins.min.js"

    gremlinsActive = false

    # Using unsafe window for accessing injected gemlins
    # @TODO: Switch to an event-messaging based approach
    # // https://getsatisfaction.com/crossrider/topics/cross_browser_unsafewindow#reply_10016412
    browserGremlins = unsafeWindow?.gremlins or window?.gremlins

    if !browserGremlins
        try
            tag = document.createElement "div"
            tag.setAttribute "onclick", "return window;"
            # console.log tag, tag.onclick
            windowCompatible = tag.onclick()
            browserGremlins = windowCompatible?.gremlins
        catch err
            console.warn "No gremlins for you", err.message
            return false


    horde = browserGremlins.createHorde()

    horde.after () ->
        # Mark attack as complete
        gremlinsActive = false
        appAPI.message.toBackground
            gremlinsActive : gremlinsActive
        return


    appAPI.message.toBackground
        gremlinsActive : gremlinsActive

    appAPI.message.addListener (msg) ->
        console.log "Received", msg
        if msg.getStatus
            # Send it the current text status
            appAPI.message.toBackground
                gremlinsActive : gremlinsActive
        else
            # Pass along the message to the iframes
            appAPI.message.toCurrentTabIframes msg
            if msg.gremlinsActive
                # Start the gremlins
                gremlinsActive = true
                horde.unleash()
                appAPI.message.toBackground
                    gremlinsActive : gremlinsActive
            else
                # Stop the gremlins
                gremlinsActive = false
                horde.stop()
                appAPI.message.toBackground
                    gremlinsActive : gremlinsActive
        return

    return
