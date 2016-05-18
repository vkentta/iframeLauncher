(function(){
    var iframeLauncher = {
        init: function(options){
            var opt = this.setOptions(options);
            var iframe = document.createElement("IFRAME");
            var button = this.initButton(iframe, opt);
            var props = {
                options: opt,
                iframe: iframe,
                button: button
            };
            
            iframe.classList.add(opt.cssClass, opt.position, opt.transition, opt.size);
            iframe.src = opt.src;

            this.setButton(props, props.options.texts.open, this.loadIframe.bind(this, props));
            
            return {
                openIframe: this.loadIframe.bind(this, props),
                closeIframe: this.closeIframe.bind(this, props),
                setIframeMessageListener: this.setIframeMessageListener.bind(this, props),
                deinit: this.deinit.bind(this, props)
            };
        },
        
        deinit: function(props){
            if(props.button && props.button.classList){
                this.hideButton(props.button);
            }
            this.closeIframe(props);
            
            setTimeout(this.deleteSelf.bind(this, props), 1000);
        },
        
        deleteSelf: function(props){
            if(props.iframe.parentNode){
                props.iframe.parentNode.removeChild(props.iframe);
            }
            if(props.button && props.button.parentNode){
                props.button.parentNode.removeChild(props.button);
            }
            delete props.iframe;
            delete props.button;
        },
        
        initButton: function(iframe, opt){
            var button;
            if(opt.button){
                button = document.createElement("BUTTON");
                button.classList.add(opt.cssClass, opt.position, opt.transition);
                document.body.appendChild(button);
                setTimeout(this.showButton.bind(this, button), 0);
            }
            return button;
        },
        
        showButton: function(button){
            button.classList.add("visible");
        },
        
        hideButton: function(button){
            button.classList.remove("visible");
        },
        
        setButton: function(props, text, clickAction){
            if(props.options.button){
                props.button.textContent = text;
                props.button.onclick = clickAction;
            }
        },
        
        setOptions: function(opt){
            return {
                cssClass: "iframe-launcher",
                src: opt && opt.src ? opt.src : window.location,
                texts: {
                    open: opt && opt.texts && opt.texts.open ? opt.texts.open : "Open iframe",
                    opening: opt && opt.texts && opt.texts.opening ? opt.texts.opening : "Opening iframe...",
                    close: opt && opt.texts && opt.texts.close ? opt.texts.close : "Close iframe",
                },
                button: opt && opt.button !== undefined ? opt.button : true,
                position: opt && opt.position ? opt.position : "right",
                transition: opt && opt.transition ? opt.transition : "slide",
                size: opt && opt.size ? opt.size : "half",
            };
        },
        
        loadIframe: function(props){
            props.iframe.onload = this.iframeLoaded.bind(this, props);
            this.setButton(props, props.options.texts.opening, null);
            document.body.appendChild(props.iframe);
        },
        
        iframeLoaded: function(props){
            props.iframe.onload = null;
            this.loadIframe = this.openIframe;
            this.openIframe(props);
        },
        
        openIframe: function(props){
            props.iframe.classList.add("visible");
            this.setButton(props, props.options.texts.close, this.closeIframe.bind(this, props));
        },
        
        closeIframe: function(props){
            props.iframe.classList.remove("visible");
            this.setButton(props, props.options.texts.open, this.openIframe.bind(this, props));
        },
        
        setIframeMessageListener: function(props, eventData, callback){
            var helperLink = document.createElement('a');
            helperLink.href = props.options.src;
            var listenerProps = {
                iframeHostname: helperLink.hostname,
                eventData: eventData,
                callback: callback
            };
            
            window.addEventListener("message", function(props, event) {
                var origin = event.origin || event.originalEvent.origin;
                
                if(origin.indexOf(props.iframeHostname) !== -1 && event.data == props.eventData) {
                	props.callback();
                }
            }.bind(null, listenerProps), false);
        }
    };
    
    window.iframeLauncher = iframeLauncher.init.bind(iframeLauncher);
})();