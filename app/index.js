'use strict';
var util = require('util');
var path = require('path');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var exec = require('child_process').exec;
var chalk = require('chalk');
const camelCase = require('camelcase');

var store = memFs.create();
var fs = editor.create(store);
var generators = require('yeoman-generator');

var bundleIdFromName = "";
var asks = {};
var ti = [];
var defaultSDK = '7.2.0.GA';
ti.push({ name : defaultSDK, value : defaultSDK});
var templateList = [
  {
    name : 'Burger menu',
    value : 'burger'
  },
  {
    name : 'Tabgroup navigation',
    value : 'tabgroup'
  }
];



function generateGUID() {
    /* jshint bitwise:false */
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function notBlank(val) {
    return val && val !== "";
}

function notSpecifiedFilter(val) {
    return val === "" ? "not specified" : val;
}

function lower(val) {
    return val.toLowerCase();
}

module.exports = generators.Base.extend({

    method: function () {
        this.sdks = [];
        var self = this;

        exec('appc ti sdk list -o json', function(error, stdout, stderr) {

            if(error){
              console.log(chalk.underline.red('\nError : '+ error));
              console.log(chalk.underline.green('\nPlease run : npm install -g appcelerator (if not installed)'));
              console.log(chalk.underline.green('\nPlease run : npm install -g titanium (if not installed)'));
              return;
            }else{
              var sdkList = JSON.parse(stdout);
              ti = [];
              for (var sdk in sdkList.installed) {
                  ti.push({ name : sdk, value : sdk});
              };
            }
        });

        //https://github.com/SBoudrias/Inquirer.js
        var prompts = [
            {
                type:     'list',
                name:     'template',
                message:  'Which template do you need ?',
                choices : templateList,
                default : 0
            },
            {
                type:     'input',
                name:     'bundle_id',
                message:  'What\'s your application id (example: com.company.myapp) ? :',
                validate: notBlank,
                filter : lower
            },
            {
                type:     'input',
                name:     'appname',
                message:  'What\'s the project name ? :',
                default:  this.appname,
                validate: notBlank
            },
            {
                type:     'input',
                name:     'publisher',
                message:  'What\'s the publisher name ? :',
                default : 'Squirrel',
                validate: notBlank
            },
            {
                type:    'input',
                name:    'url',
                message: 'What\'s the URL for the project webpage (if any) ? :',
                default : 'http://www.squirrel.fr'
            },
            /*{
                type:     'input',
                name:     'version',
                message:  'What version would you like to start with?',
                default:  '0.0.0',
                validate: notBlank
            },*/
            {
                type:    'input',
                name:    'description',
                message: 'Provide a short description for your app : ',
                filter:  notSpecifiedFilter
            },
            {
                type:    'input',
                name:    'copyright',
                message: 'What\'s the copyright name ? :',
                filter:  notSpecifiedFilter
            },
            {
                type:    'list',
                name:    'sdk',
                message: 'Which SDK would you like to use ? :',
                choices: ti,
                default : 0
            },
            {
                type:    'input',
                name:    'maincolor',
                message: 'What\'s the main color for your app ? (background window color)',
                default : '#f89a3c'
            },
            {
                type:    'input',
                name:    'maincolor2',
                message: 'What\'s the second color for your app ? (navbar, button color)',
                default : '#f15b2a'
            },
            {
                type:    'input',
                name:    'baseurl',
                message: 'What\'s the baseurl of your webservice ? :',
                default : 'http://www.squirrel.fr'
            },
            /*, {
                type:    'checkbox',
                name:    'options',
                message: 'Extras:',
                choices: [{
                        name:    'Include Alloy',
                        value:   'use_alloy',
                        checked: true
                        }, {
                        name:    'Include a testing framework (mocha, chai, sinon, mockti)',
                        value:   'use_tests',
                        checked: true
                        }, {
                        name:    'Use an express server for local (offline) development',
                        value:   'use_server',
                        checked: false
                        }]
                }*/];

                return this.prompt(prompts, function (props) {
                    this.template   = props.template;
                    this.bundle_id   = props.bundle_id;
                    this.appname     = props.appname;
                    this.publisher   = props.publisher;
                    this.url         = props.url;
                    this.description = props.description;
                    this.sdk         = props.sdk;
                    this.maincolor   = props.maincolor;
                    this.maincolor2  = props.maincolor2;
                    this.baseurl     = props.baseurl;
                    //this.version     = props.version;
                    //this.use_alloy   = props.options.indexOf('use_alloy') !== -1;
                    //this.use_tests   = props.options.indexOf('use_tests') !== -1;
                    //this.use_server  = props.options.indexOf('use_server') !== -1;
                    //this.guid        = generateGUID();
                    this.copyright   = props.copyright;
                  }).then(function(answers) {
                    if(answers.copyright === "not specified"){
                      answers.copyright = new Date().getFullYear() + (answers.publisher ? " " + answers.publisher : "");
                    }
                    asks = answers;
                  });
        },
        method2: function() {
            console.log(chalk.underline.bgBlue('Copying templates '+asks.template+'...'));

            var folderName = camelCase(asks.appname);
            var template = asks.template;
            this.fs.copy(
                this.templatePath(template),
                this.destinationPath(folderName)
            );
            this.fs.copy(
              this.templatePath(template+'/_gitignore'),
              this.destinationPath(folderName+'/.gitignore')
            );
            this.fs.delete(this.destinationPath(folderName+'/_gitignore'));
            this.fs.copyTpl(
                this.templatePath(template+'/tiapp.xml'),
                this.destinationPath(folderName+'/tiapp.xml'),
                {
                    //GUID: generateGUID(),
                    ID: asks.bundle_id,
                    IDMANIFEST: asks.bundle_id,
                    APPNAME:asks.appname,
                    PUBLISHER:asks.publisher,
                    URL: asks.url,
                    //VERSION:asks.version,
                    DESCRIPTION:asks.description,
                    COPYRIGHT:asks.copyright,
                    SDK:asks.sdk
                }
            );
            this.fs.copyTpl(
                this.templatePath(template+'/app/config.json'),
                this.destinationPath(folderName+'/app/config.json'),
                {
                    MAINCOLOR:asks.maincolor,
                    MAINCOLOR2:asks.maincolor2,
                    BASEURL:asks.baseurl
                }
            );
        },
        end: function() {
            console.log('');
            console.log('If you need to register the application: '+chalk.green('appc new --import --no-services'));
            console.log('');
            console.log('For running the application: '+chalk.green('appc run')+ ' or use '+chalk.green('TiNy CLI : https://www.npmjs.com/package/tn'));
        }

});
