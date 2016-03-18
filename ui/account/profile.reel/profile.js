
var Component = require("montage/ui/component").Component;

/**
 * @class Env
 * @extends Component
 */
exports.Profile = Component.specialize(/** @lends Profile# */ {

    currentSection: { value: null },

    constructor: {
        value: function Env() {
            this.super();
        }
    },

    templateDidLoad: {
        value: function() {

        }
    },

    enterDocument: {
        value: function(isFirstTime) {
            if (isFirstTime) {

                if (myApp.user) {
                    var _this = this;
                    ajaxLib.get('init/profile').then(function (res) {

                        _this.templateObjects.mainMenu.items = res.data.menu[0].items;
                        _this.templateObjects.mainMenu.selectItemAtIndex(0);

                        if (res.data.menu[1]) {
                            _this.templateObjects.userMenu.title = res.data.menu[1].title;
                            _this.templateObjects.userMenu.items = res.data.menu[1].items;
                        }

                        _this.parentComponent.parentComponent.parentComponent.activeContent.contentHasLoaded();

                    });
                }
            }
        }
    },

    //Handlers
    handleChangePictureButtonAction: {
        value: function() {
            console.log('TODO: Change profile picture');
        }
    },

    handleMainMenuItemSelected: {
        value: function(event) {
            this.templateObjects.userMenu.deselect();
            this.currentSection = event.selectedItem;
        }
    },

    handleUserMenuItemSelected: {
        value: function(event) {
            this.templateObjects.mainMenu.deselect();
            this.currentSection = event.selectedItem;
        }
    }

});
