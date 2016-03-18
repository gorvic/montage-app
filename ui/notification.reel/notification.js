
var Component = require("montage/ui/component").Component,
    KeyComposer = require("montage/composer/key-composer").KeyComposer,
    PressComposer = require("montage/composer/press-composer").PressComposer;

/**
 * @class Notification
 * @extends Component
 */
exports.Notification = Component.specialize(/** @lends Notification# */ {

    //http://docs.montagestudio.com/montagejs/gestures-composers.html
    constructor: {
        value: function Notification() {
            this.super();
            
            this.pressComposer = new PressComposer();
            this.addComposer(this.pressComposer);
            this.pressComposer.addEventListener("pressStart", this, false);
            this.pressComposer.addEventListener("press", this, false);

            KeyComposer.createKey(this, "enter", "enter").addEventListener("keyPress", this);
            KeyComposer.createKey(this, "escape", "escape").addEventListener("keyPress", this);

            this.isPressOwner = false;
        }
    },

    draw: {
        value: function() {
            if (this.classList.has('isVisible')) {
                //TODO: debug, binding in template is not triggered..
                this.templateObjects.messages.innerHTML = myApp.notificationMessage;
                this.templateObjects.hiddenField.focus();
            }
        }
    },
    
    //Handlers
    handlePress: {
        value: function (event) {
            event.stopPropagation();
            event.preventDefault();
            if (this.element == event.targetElement && this.isPressOwner) {
                myApp.hideNotification();
                this.isPressOwner = false;
            }
        }
    },    
 
    handlePressStart: {
        value: function (event) {
           this.isPressOwner = true;
        }
    },
    
    handleKeyPress: {
        value: function (event) {
            myApp.hideNotification();
        }
    }
});
