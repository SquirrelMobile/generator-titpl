/**
 * @class Controller.partials._detail
 * Display detail view
 *
 */

var dispatcher = require('dispatcher');


/**
 * openWindow - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function openWindow(e){

  var obj = {
    controller : 'win',
    data : {
      controller : 'partials/_detail',
      navbar : {
        nav : {
          backgroundColor : 'blue',
        },
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
