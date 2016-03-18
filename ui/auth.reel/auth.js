
var Component = require("montage/ui/component").Component;


var SectionWidthMap = {
    login: 600,
    signup: 600,
    forpass: 380,
    resetpass: 250
};

/**
 * @class Auth
 * @extends Component
 */
//https://www.npmjs.com/package/satellizer
exports.Auth = Component.specialize(/** @lends Auth# */ {
    
    _window: { value: null },
    
    _section: { value: '' },
    
    _sections: { value: [] },
    
    section: {
        set: function(section) {
            this._section = section;
            this.needsDraw = true;
        },
        get: function() {
            return this._section;
        }
    },
    
    constructor: {
        value: function Auth() {
            this.super();
        }
    },
    
    templateDidLoad: {
        value: function() {
            //storing templates objects in component vars, like authWindow in main component
            this._window = this.templateObjects.window;
        }
    },
    
    enterDocument: {
        value: function(isFirstTime) {
            
            if (isFirstTime) {
                this._sections = this.element.querySelectorAll('[data-section-name]');


                if (myApp.isInitsLoaded && myApp.inits.signUpProvider) {
                    myApp.authWindow.templateObjects.signup.provider = myApp.inits.signUpProvider;
                    myApp.authWindow.show('signup');
                }
            }
        }
    },
    
    draw: {
        value: function(isFirstTime) {
            
            if (!this._section) {
                return;
            }

            //handling visibility
            for (var i = 0; i < this._sections.length; i++) {
                var section = this._sections[i];
                if (section.dataset.sectionName == this._section) {
                   section.classList.add('isShown');
                }
                else {
                   section.classList.remove('isShown'); 
                }
            }
        }
    },
    
    show: {
        value: function(section) {

            switch(section) {
                case 'login':
                    this.templateObjects.login.cleanUpForm();
                    break;
                case 'signup':
                    this.templateObjects.signup.cleanUpForm();
                    break;
                case 'forpass':
                    this.templateObjects.forgottenPassword.cleanUpForm();
                    break;
            }

            this.section = section;

            this._window.show();

        }
    }
    
});
