
var Montage = require("montage/core/core").Montage,
    User = require("models/user").User,
    AuthToken = require("core/auth-token").AuthToken;
/**
 * @class AppDelegate
 * @extends Montage
 */
exports.AppDelegate = Montage.specialize(/** @lends AppDelegate# */ {
    
    willFinishLoading: {value: function (app) {
    
        myApp = app;

        app.config = {
            APP_NAME: "myApp"
        };


        //Notification section
        app.isNotificationOn = false;
        app.notificationMessage = "";
        app.notificationType = "Error";
        app.showNotification = function(type, message) {
            app.notificationType = type || "Error";
            app.notificationMessage = message;
            app.isNotificationOn = true;
        };
        app.hideNotification = function() { app.isNotificationOn = false; };
   
        app.isInitsLoaded = false;
        
        app.user = new User();

        //TODO use router after login etc.
        app.loadInits = function() {

            ajaxLib.post('auth/whoami')
                .then(function (res) {

                    app.inits = res.data;

                    if (Object.keys(app.inits.messages).length) {

                        for (var type in app.inits.messages) {

                            //Success or Error, show first
                            //app.showNotification(type, app.inits.messages[type][0]);
                            break;
                        }

                    }

                    app.user.model = res.data.user;
                    app.isInitsLoaded = true;

                })
                .catch(function (e){
                    //app.showNotification(null, e.status + ' ' +e.data);
                    console.log(e.data);
                });
        };

        token = AuthToken.token;
        if (token) {
            ajaxLib.defaults.headers.post['x-access-token'] = token;
        }

        app.loadInits();

    }}
});
