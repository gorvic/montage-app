
var Component = require("montage/ui/component").Component,
    AuthToken = require("core/auth-token").AuthToken;

/**
 * @class Header
 * @extends Component
 */
exports.Header = Component.specialize(/** @lends Header# */ {
    constructor: {
        value: function Header() {
            this.super();
        }
    },

    templateDidLoad: {
        value: function() {
            this.templateObjects.logoutButton.title = "Sign Out";
            this.templateObjects.profileButton.title = "Account Management";
        }
    },
    
    handleLoginButtonAction: {
        value: function () {
            myApp.authWindow.show('login');
        }
    },

    handleLogoutButtonAction: {
        value: function () {
            AuthToken.token = null;
            myApp.user.model = null;
            document.location.reload();
        }
    },

    handleRegisterButtonAction: {
        value: function () {
            myApp.authWindow.show('signup');
        }
    }

});
