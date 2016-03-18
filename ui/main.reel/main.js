var Component = require("montage/ui/component").Component;

/**
 * @class Main
 * @extends Component
 */
var main = exports.Main = Component.specialize(/** @lends Main# */ {

    constructor: {
        value: function Main() {
            this.super();
        }
    },

    templateDidLoad: {
        value: function () {
            myApp.authWindow = this.templateObjects.authWindow;
        }
    }


});
