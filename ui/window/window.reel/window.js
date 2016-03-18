
var Component = require("montage/ui/component").Component,
    PressComposer = require("montage/composer/press-composer").PressComposer,
    Dict = require("montage/collections/dict");

/**
 * @class Window
 * @extends Component
 */
exports.Window = Component.specialize(/** @lends Window# */ {

    hideOnDismiss: { value: true },

    _isShown: { value: false },

    _pressComposer: { value: null },

    _keyComposer: { value: null },

    constructor: {
        value: function Window() {
            this.super();
        }
    },


    //http://docs.montagestudio.com/montagejs/gestures-composers.html
    didCreate: {
        value: function() {
                this._pressComposer = new PressComposer();
                this.addComposer(this._pressComposer);
        }
    },

    prepareForActivationEvents: {
        value: function () {
            this._pressComposer.addEventListener("press", this, false);
        }
    },

    draw: {
        value: function() {
            if (this._isShown) {
                this.classList.add('isShown');   
            }
            else {
                this.classList.remove('isShown')
            }
        }
    },

    show: {
        value: function() {
            if (!this._isShown) {
                this._isShown = true;
                this.needsDraw = true;
            }
        }
    },

    hide: {
        value: function() {
            if (this._isShown) {
                this._isShown = false;
                this.needsDraw = true;
            }
        }
    },

    __detail: { value: null },

    _detail: {
        get: function() {
            if (this.__detail === null) {
                this.__detail = new Dict();
            }
            return this.__detail;
        }
    },

    __dismissEvent: {value: null},

    _dismissEvent: {
        get: function() {
            if (!this.__dismissEvent) {
                this.__dismissEvent = document.createEvent("CustomEvent");
                this.__dismissEvent.initCustomEvent("dismiss", true, true, this._detail);
            }
            return this.__dismissEvent;
        }
    },

    // Handlers
    handlePress: {
        value: function(event) {
            if (this.hideOnDismiss && event.targetElement == this.element) {
                this.hide();
                this.dispatchEvent(this._dismissEvent);
            }
        }
    },

    handleCloseButtonAction: {
        value: function (event) {
            this.hide(); 
            this.dispatchEvent(this._dismissEvent);
        }
    }

});
