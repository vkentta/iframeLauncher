#iframeLauncher

A tiny library to load an iframe into an overlay.

This project was heavily inspired by [survey-button](https://bitbucket.org/kallelat/survey-button/src)-library.

[LIVE DEMO](http://vkentta.com/iframeLauncher/demo/)

##Installation and usage

```
    <head>
        <link rel="stylesheet" href="iframeLauncher.css"/>
    </head>
    <body>
        <!-- Your site content -->
        <script src="iframeLauncher.js"></script>
        <script>
            iframeLauncher({
                src: "https://my.surveypal.com/iframeLauncher",
                texts: {
                    open: "Give us feedback",
                    opening: "Loading survey...",
                    close: "Close survey"
                }
            });
        </script>
    </body>
```

To be able to use iframeLauncher on your page you need to include the CSS and JS files.
You can create an instance of iframeLauncher simply by calling ```iframeLauncher(options);```.

##API

iframeLauncher.js introduces a global iframeLauncher-generator.

###iframeLauncher(options)

######Description
Creates an iframeLauncher-instance

######Returns
Created iframeLauncher-instance

######Parameters
* options *(__type:__ Object)*
 * src *(__type:__ String, __description:__ The iframe source URL, __default:__ window.location)*
 * texts *(__type:__ Object, __description:__ Texts for the iframeLauncher button in different states)*
     * open *(__type:__ String, __description:__ Button text when the iframe is not visible, __default:__ "Open iframe")*
     * opening *(__type:__ String, __description:__ Button text when the iframe is being loaded, __default:__ "Opening iframe...")*
     * close *(__type:__ String, __description:__ Button text when the iframe is visible, __default:__ "Close iframe")*
 * button *(__type:__ Bool, __description:__ Should the button be shown, __default:__ true)*
 * position *(__type:__ String, __description:__ Button text when the iframe is not visible, __values:__ ["top", "bottom", "left", "right"], __default:__ "right")*
 * transition *(__type:__ String, __description:__ The animation style when showing the iframe, __values;__ ["slide", "fade", "zoom", "instant"], __default:__ "slide")*
 * size: *(__type:__ String, __description:__ In what size should the iframe be shown, __values:__ ["full", "half", "bordered"], __default:__ "half")*

####.openIframe()

######Description
Opens the iframe

######Returns
 -

######Parameters
 -

####.closeIframe()

######Description
Closes the iframe

######Returns
 -

######Parameters
 -

####.setIframeMessageListener(message, callback)

######Description
Sets a listener for messages emitted from the iframe.

######Returns
 -

######Parameters
* message: *(__type:__ String, __description:__ [Message](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to be expected from the iframe)*
* callbcak: *(__type:__ Function, __description:__ Function to be executed when the expected message is emitted)*

####.deinit()

######Description
Closes and deinitializes the iframeLauncher instance

######Returns
 -

######Parameters
 -

##Advanced usage example
```
var il = iframeLauncher({
                src: "https://my.surveypal.com/iframeLauncher",
                texts: {
                    open: "Give us feedback",
                    opening: "Loading survey...",
                    close: "Close survey"
                },
                button: false
            });
il.openIframe();
il.setIframeMessageListener("exit_survey", il.deinit);
```
The iframeLauncher instance gets deinitiated by calling ```window.parent.postMessage("exit_survey", '*');``` inside the iframe.
##License
MIT
