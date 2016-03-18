
var Component = require("montage/ui/component").Component;

/**
 * @class ActiveContent
 * @extends Component
 */
exports.ActiveContent = Component.specialize(/** @lends ActiveContent# */ {

    loading: { value: false},

    loaded: { value: true },


    constructor: {
        value: function ActiveContent() {

            this.super();

            this.defineBinding("classList.has('isLoading')", {"<-": "this.loading"});
            this.defineBinding("classList.has('isLoaded')", {"<-": "this.loaded"});

        }
    },

    contentHasLoaded: {
        value: function() {
            this.loading = false;
            this.loaded = true;
        }
    },

    contentIsLoading: {
        value: function() {
            this.loading = true;
            this.loaded = false;
        }
    }

});
