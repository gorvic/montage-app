
var Component = require("montage/ui/component").Component;

/**
 * @class Content
 * @extends Component
 */
exports.Content = Component.specialize(/** @lends Content# */ {
    constructor: {
        value: function Content() {
            this.super();
        }
    },
    templateDidLoad: {
        value: function() {

            this.templateObjects.router.updatePath();


        }
    }
});
