
var Montage = require("montage/core/core").Montage;
/**
 * @class ApiModel
 * @extends Montage
 */
exports.ApiModel = Montage.specialize(/** @lends ApiModel# */ {

    _model: { value: null},
    
    model: {
        get: function() {
            return this._model;
        },
        set: function(model) {
            this._model = model;
        }
    },
    
    constructor: {
        value: function ApiModel(model) {
            this.super();
            this.model = model || null;
        }
    }
    
});
