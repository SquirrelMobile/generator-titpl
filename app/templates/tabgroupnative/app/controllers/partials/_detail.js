/**
 * @class Controller.partials._detail
 * Display detail view
 *
 */

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
        btnLeft : {
          visible : true
        },
        logo : {
          visible : true
        }
      }
    }
  };
  Alloy.Globals.events.trigger('openWindow', obj);

}
