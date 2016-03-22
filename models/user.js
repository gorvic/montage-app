var Montage = require("montage/core/core").Montage;
/**
 * @class User
 * @extends Montage
 */
exports.User = Montage.specialize(/** @lends User# */ {

    _model: {value: null},

    email: { value: ''},

    _authProvider: {value: null},

    _roles: { value: []},

    isAuthed: { value: false},
    
    constructor: {
        value: function User() {
            this.super();
        }
    },
    
    model: {
            get: function () {
                return this.super();
            },
            set: function (model) {
                if (model) {
                    //this.super(model);
                    this._model = model;
                    this.email = model.email;
                    this._roles = model.roles;
                    this._authProvider = model.authProvider;
                }

                this.isAuthed = model && true;
            }
    },

    hasRoleOf: {
        value: function(roleName) {
            for (var i in this._roles)
                if (this._roles[i].name == roleName)
                    return true;
            return false;
        }
    }
    
});
