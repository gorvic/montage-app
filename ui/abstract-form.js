
var Component = require("montage/ui/component").Component,
    KeyComposer = require("montage/composer/key-composer").KeyComposer;

/**
 * @class AbstractForm
 * @extends Montage
 */
exports.AbstractForm = Component.specialize(/** @lends AbstractForm# */ {
    
    keyInputs: { value: [] },
    
    constructor: {
        value: function AbstractForm() {
            this.super();
            KeyComposer.createKey(this, "enter", "enter").addEventListener("keyPress", this);
        }
    },
    
    handleKeyPress: {
       value: function (event) {      
           if (event.identifier == 'enter') {
               var l = this.keyInputs.length;
               for (var i = 0; i < l; i++) {
                   if (event.activeElement == this.keyInputs[i].element && i < l - 1) {
                       this.keyInputs[i + 1].element.focus();
                   }
                   else if (event.activeElement == this.keyInputs[i].element && i == l - 1) {
                       this.submitForm();
                   }
               }
           }
       }
    },
    
    submitForm: {
        value: function() {
            console.warn('Abstract');
        }
    }
    
});
