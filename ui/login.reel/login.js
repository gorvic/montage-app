var AbstractForm = require("ui/abstract-form").AbstractForm,
    validator = require("core/validate.min.js"),
    authToken = require("core/auth-token").AuthToken;

var constraints = {
    email: {
        presence: true,
        email: true
    },
    password: {
        presence: true
    }
};


/**
 * @class Login
 * @extends Component
 */
exports.Login = AbstractForm.specialize(/** @lends Login# */ {
    constructor: {
        value: function Login() {
            this.super();
        }
    },

    templateDidLoad: {
        value: function () {

            // Asynchronously initialize Facebook SDK
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '968577683256853',
                    responseType: 'token',
                    version: 'v2.5'
                });

                //FB.getLoginStatus(function (response) {
                //    statusChangeCallback(response);
                //});

            };

            // Load the SDK asynchronously
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            this.templateObjects.formTitle.value = "LOGIN";

            //Socials
            //this.facebookSignInLabel.innerHTML= 'Login with <b>Facebook</b>';
            this.googleSignInLabel.innerHTML = 'Login with <b>Google</b>';
            this.linkedInSignInLabel.innerHTML = 'Login with <b>LinkedIn</b>';

            //placeholders
            this.templateObjects.emailTextField.placeholder = "Email";
            this.templateObjects.passwordTextField.placeholder = "Password";

            //buttons
            this.templateObjects.submitSignInIconButton.label = "Login";
            this.templateObjects.facebookSignInIconButton.label = "Login with Facebook";
            this.templateObjects.createAccountIconButton.label = "Not a member? Sign up.";

            //abs. form
            this.keyInputs = [
                this.templateObjects.emailTextField,
                this.templateObjects.passwordTextField
            ];

        }
    },

    cleanUpForm: {
        value: function () {

            this.templateObjects.emailTextField.value =
                this.templateObjects.passwordTextField.value = '';

            this.templateObjects.emailTextField.error =
                this.templateObjects.passwordTextField.error = null;

        }
    },

    focus: {
        value: function () {
            this.templateObjects.emailTextField.element.focus();
        }
    },

    handleSubmitSignInIconButtonAction: {
        value: function () {
            this.submitForm();
        }
    },

    submitForm: {
        value: function () {
            var email = this.templateObjects.emailTextField.value,
                password = this.templateObjects.passwordTextField.value;

            var valueFieldMap = {
                email: this.templateObjects.emailTextField,
                password: this.templateObjects.passwordTextField
            };

            var invalids = validator({
                email: email,
                password: password
            }, constraints);

            for (var name in valueFieldMap)
                valueFieldMap[name].error = invalids && invalids[name] ? new Error(invalids[name]) : null;

            if (invalids) {

                var messages = [];
                for (var name in invalids) {
                    messages.push("• " + invalids[name].join('<br>'));
                }

                myApp.showNotification(null, messages.join('<br>'));
            }
            else {

                var _this = this;

                var credentials = {
                    email: email,
                    password: password
                };

                ajaxLib.post('auth/login', credentials)
                    .then(function (response) {
                        authToken.token = response.data.token;
                        _this.cleanUpForm();
                        _this.loginForm.submit();  //home
                    }).catch(function (e) {
                    myApp.showNotification(null, e.data.message);
                });

            }
        }
    },


    handleCreateAccountIconButtonAction: {
        value: function () {
            myApp.authWindow.show('signup');
        }
    },

    handleFacebookSignInIconButtonAction: {
        value: function () {

            var _this = this;

            FB.login(function (response) {
                    //http://stackoverflow.com/questions/32584850/facebook-js-sdks-fb-api-me-method-doesnt-return-the-fields-i-expect-in-gra
                    FB.api('/me', 'get', {access_token: token, fields: 'id,name,email'}, function (profile) {
                        var data = {
                            signedRequest: response.authResponse.signedRequest,
                            profile: profile
                        };

                        ajaxLib.post('/auth/facebook', data)
                            .then(function (response) {
                                //var payload = JSON.parse(window.atob(token.split('.')[1]));
                                authToken.token = response.data.token;
                                _this.cleanUpForm();
                                _this.loginForm.submit();  //home
                                //myApp.showNotification(null, 'We have been signed with Facebook');
                                //window.location.path('/');
                            }).catch(function (e) {
                            //myApp.showNotification(null, e.message);
                        });
                    });
                }, {scope: 'public_profile,email'}
            );
        }
    },

    handleFacebookSignInHrefAction: {
        value: function () {
            myApp.showNotification(null, "Href")
        }
    }
})
;
