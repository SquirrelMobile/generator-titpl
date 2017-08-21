/**
 * @class Controller.home
 * Display home view
 *
 */

/**
 * @method Controller
 * Display home view, load home
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

  $.navbar.load({
    logo : {
      visible : true
    }
  });

})($.args);

/**
 * @type {Object} dispatcher of menu item
 */
var dispatcher = require('dispatcher');


/**
 * openWindow - Open new window
 *
 * @param  {Object} e object
 * @param  {Object} e.controller controller name
 * @param  {Object} e.data data to passed to the controller
 */
function openWindow(e){

  var obj = {
    controller : 'win',
    data : {
      controller : 'partials/_detail',
      navbar : {
        back : {
          visible : true
        },
        logo : {
          visible : true
        }
      }
    }
  };
  dispatcher.trigger('openWindow', obj);

}
