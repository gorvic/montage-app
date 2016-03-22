
var AbstractForm = require("ui/abstract-form").AbstractForm;
    validator = require("core/validate.min.js");

var constraints = {
    email: {
        presence: true,
        email: true
    },
    password: {
        presence: true
        //,
        //format: {
        //    pattern: /^[a-zA-z][\w#$\-!]{2,20}$/,
        //    flags: "i",
        //    message: "is not strong enough (3 is min length)"
        //}
    },
    confirmPassword: {
        presence: true,              
        equality: "password"
    }
};

/**
 * @class Signup
 * @extends Component
 */
exports.Signup = AbstractForm.specialize(/** @lends Signup# */ {
    _provider: {value: ''},
    
    provider: {
        set: function(provider) {
            this._provider = provider;
            this.needsDraw = true;
        }
    },
    
    constructor: {
        value: function Signup() {
            this.super();
        }
    },
    
    templateDidLoad: {
        value: function() {

            this.templateObjects.formTitle.value = 'SIGN UP';

            //Socials
            this.facebookSignUpLabel.innerHTML= 'Sign up with <b>Facebook</b>';
            this.googleSignUpLabel.innerHTML= 'Sign up with <b>Google</b>';
            this.linkedInSignUpLabel.innerHTML= 'Sign up with <b>LinkedIn</b>';

            //placeholders
            this.templateObjects.emailTextField.placeholder = "Enter your email";
            this.templateObjects.newPasswordTextField.placeholder = "Enter password";
            this.templateObjects.confirmPasswordTextField.placeholder = "Confirm password";

            this.templateObjects.submitSignUpIconButton.label = "Sign Up";
            this.templateObjects.cancelIconButton.label = "Cancel";

            this.templateObjects.haveAccountIconButton.label = "Already have an account? Login.";

            //for AbstractForm
            this.keyInputs = [
                this.templateObjects.emailTextField,
                this.templateObjects.newPasswordTextField,
                this.templateObjects.confirmPasswordTextField
            ];
            
        }
    },

    cleanUpForm: {
        value: function() {

            this.description.innerHTML = this._provider ? 'To finish signing up with <b>' + this._provider.title + '</b> please create a login password' :'';

            this.description.style.display = this._provider ? 'block' : 'none';

            this.templateObjects.emailTextField.value = this._provider ? myApp.user.email : '';
                
            this.templateObjects.newPasswordTextField.value =
                this.templateObjects.confirmPasswordTextField.value = '';

                this.templateObjects.emailTextField.error =
                this.templateObjects.newPasswordTextField.error =
                this.templateObjects.confirmPasswordTextField.error = null;

        }
    },

    //Handlers

    handleSubmitSignUpIconButtonAction: {
        value: function() {
            this.submitForm();
        }
    },

    submitForm: {
        value: function() {

            var valueFieldMap = {
                email: this.templateObjects.emailTextField,
                password: this.templateObjects.newPasswordTextField,
                confirmPassword: this.templateObjects.confirmPasswordTextField
            };

            var invalids = validator({
                email: valueFieldMap['email'].value,
                password: valueFieldMap['password'].value,
                confirmPassword: valueFieldMap['confirmPassword'].value
            }, constraints);

            for (var name in valueFieldMap)
                valueFieldMap[name].error = invalids && invalids[name] ? new Error(invalids[name]) : null;

            if (invalids) {

                var messages = [];

                for (var name in invalids)
                    messages.push("• " + invalids[name].join('<br>'));

                myApp.showNotification(null, messages.join('<br>'));
            }
            else {

                this.templateObjects.submitSignUpIconButton.loading = true;

                var _this = this;
                ajaxLib.post('auth/signup', {
                    role: this.templateObjects.inputIsAdmin.checked,
                    email: this.templateObjects.emailTextField.value ,
                    password: this.templateObjects.newPasswordTextField.value}).
                then(function() {
                    //no tokens
                    _this.cleanUpForm();
                    _this.signUpForm.submit();
                }).
                catch(function(e) {
                    myApp.showNotification(null, e.data.message);
                });  
            }
        }
    },

    handleCancelIconButtonAction: {
        value: function () {
           console.log('cancel');
        }
    },

    handleHaveAccountIconButtonAction: {
        value: function () {
            myApp.authWindow.show('login');
        }
    }

});