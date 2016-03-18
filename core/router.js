
var Montage = require("montage/core/core").Montage;
var Map = require("montage/collections/map").Map;
/**
 * @class Router
 * @extends Montage
 */

//https://github.com/segphault/nominate/blob/master/public/ui/router.js
exports.Router = Montage.specialize(/** @lends Router# */ {
    routes: {
        value: []
    },
    parts: {
        value: null
    },

    path: {
        value: null 
    },
    defaultRoot: {
        value: null
    },
    constructor: {
        value: function Router() {
            var _this = this;
            window.onpopstate = function(e) {
                _this.updatePath();
            };
        }
    },

    updatePath: {
        value: function(path) {
            this.path = path && ("#!/" + path) || window.location.hash.slice(1);

            if (path)
                history.pushState(this.path, this.path, this.path);

            //parts = Map()
            this.parts = this.compare(this.path);
        }
    },
    compare: {
        value: function(target) {

            //defaultRoot = "home"
            var items = ( target.replace(/^#?!\//, "") || this.defaultRoot ).split("/");

            for (var i = 0; i < this.routes.length; i++) {
                var path = this.routes[i];

                //"root:identity/action:(login|signup)".split("/") => ["root:identity", "action:(login|signup)"]
                var route = path.split("/");

                //comparing each part. if ok = return Map with values
                if (route.length >= items.length) {
                    matches = [];
                    for (var iter = 0; iter < route.length; iter++) {
                        var item = items[iter] || "";
                        var el = route[iter].split(":");
                        var test = RegExp("^" + el[1] + "$").test(item);
                        matches.push([el[0], test ? item : false]);
                    }

                    //"<-": "@router.parts.get('root')" => root:auth
                    //"<-": "@router.parts.get('action')=> action:signup
                    if (matches.every(function(x) { return x[1] !== false; }))
                        return Map(matches);
                }
            }

            return Map();
        }
    }
});