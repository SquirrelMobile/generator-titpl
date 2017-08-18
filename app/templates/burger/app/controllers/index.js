/**
 * @class Controller.index
 * Display index view
 *
 */

/**
 * @method Controller
 * Display index view, load dashboard or login
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

    Alloy.createController(Ti.App.Properties.getBool('isConnected') ? 'dashboard' : 'login/login', args).getView().open();

})($.args);
