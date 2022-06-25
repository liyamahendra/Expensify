export default {
    scrollDelay: 200,

    originalHeight: 0,
    heightWithKeyboardShown: 0,

    correctedSpacing: false,
    isKeyboardShown: false,

    register: function() {
        if(this.isiPhone15() && this.shouldFixPage()) {
            window.visualViewport.addEventListener('resize', this.finishedShowingKeyboard);
        }    
    },

    unregister: function() {
        window.visualViewport.removeEventListener('resize', this.fireFinishedShowingKeyboard);
    },

    isiPhone15: function() {
        return !!navigator.platform.match(/iPhone|iPod/)
                && window.navigator.userAgent.includes('OS 15_');
    },

    shouldFixPage: function() {
        const isChatRoom = !!window.location.pathname.match(/r\/[0-9]+/);
        return isChatRoom;
    },

    fireFinishedShowingKeyboard: function() {
        setTimeout(this.finishedShowingKeyboard, 200);
    },

    finishedShowingKeyboard: function() {
        let self = this;
        this.originalHeight = window.document.getElementById("root").getClientRects()[0].height;
        this.heightWithKeyboardShown = window.innerHeight;

        if (this.heightWithKeyboardShown < this.originalHeight) {
            this.isKeyboardShown = true;
            if (!this.correctedSpacing) {
                this.correctedSpacing = true;

                // Scroll to full extend when the keyboard is showing up
                console.log("Full scrolling");
                window.scroll(0, this.originalHeight);
    
                // Scroll down to innerHeight (which discards the extra spacing added by iOS Safari)
                setTimeout(function() {
                    window.scroll(0, window.innerHeight);
                }, self.scrollDelay);
            }

            document.ontouchmove = function(e){
                e.preventDefault();
            }
        } else {
            this.isKeyboardShown = false;
            this.correctedSpacing = false;

            document.ontouchmove = function(e){

            }
        }
    },
};
