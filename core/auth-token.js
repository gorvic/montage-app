var Montage = require("montage").Montage;

exports.AuthToken = Montage.specialize({

    _token: {value: window.localStorage.getItem('token')},

    token: {
        get: function () {
            return this._token;
        },
        set: function (token) {
            if (token) {
                this._token = token;
                window.localStorage.setItem('token', token);
                ajaxLib.defaults.headers.post['x-access-token'] = token;
            } else {
                delete ajaxLib.defaults.headers.post['x-access-token'];
                //ajaxLib.defaults.headers.post['x-access-token'] = null;
                window.localStorage.removeItem('token');
            }

        }
    }
        //getToken: {
        //    value: function () {
        //        return window.localStorage.getItem('token');
        //    }
        //},
        //
        //setToken: {
        //    value: function (token) {
        //        if (token) {
        //            window.localStorage.setItem('token', token);
        //            ajaxLib.defaults.headers.post['x-access-token'] = token;
        //        }
        //        else
        //            window.localStorage.removeItem('token');
        //    }
        //}
    });


