/**
 * @class Controller.dashboard
 * Display _listSection view
 *
 */

/**
 * @type {string} backController previous visited controller
 */
Alloy.Globals.backController = null;

if(OS_IOS){
  /**
   * @type {object} nav navigation window
   */
  //Alloy.Globals.nav = $.nav;
}

/**
 * @type {string} currentController current controller
 */
var currentController = null;

/**
 * @type {array} menu menu
 */
var menu = [
  {
    id : 'home',
    controller : 'home/home',
    image : {
       text : '\uf015'
    },
    title : L('home'),
    templateActive : 'activeTemplateWithIcon',
    templateInactive : 'inactiveTemplateWithIcon'
  },
  {
    id : 'list',
    image : {
      text : '\uf03a'
    },
    controller : 'partials/_detailList',
    title : L('list'),
    templateActive : 'activeTemplateWithIcon',
    templateInactive : 'inactiveTemplateWithIcon'
  },
  {
    id : 'profil',
    image : {
      text : '\uf007'
    },
    controller : 'profil/profil',
    title : L('account'),
    templateActive : 'activeTemplateWithIcon',
    templateInactive : 'inactiveTemplateWithIcon'
  },
  {
    id : 'logout',
    image : {
      text : '\uf2f5'
    },
    controller : null,
    title : L('logout'),
    templateActive : 'activeTemplateWithIcon',
    templateInactive : 'inactiveTemplateWithIcon'
  }
];

/**
 * @method Controller
 * Display dashboard view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

  if(OS_ANDROID) {
    $.drawer.window.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_ADJUST_PAN;
  }
  $.drawer.open();
  Alloy.Globals.events.off("findRowMenu");
  Alloy.Globals.events.off("openWindow");

})($.args);


/**
 * actions - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function actions(e){

  var type = e.type;
  if(type === "home")
  {
    findRowMenu({id : 'home'});
  }
  else if(type === 'Left' || type === 'Right'){
    toggle(e);
  }

}

/**
 * @type {Number} currentIndex of menu item
 */
var currentIndex = null;

var currentData = null;

/**
 * @type {Object} rowMenu the row menu active
 */
var rowMenu = null;

var actualMenu = null;
/**
 * Open left/right drawer
 * @param  {Object} e window(iOS)/view(Android) property
 */
function toggle(e) {

  var fn = 'toggle' + e.type + 'Window';
  $.drawer[fn]();

}

Alloy.Globals.events.on('openMenu', toggle);

/**
 * @event windowDidOpen
 * Fired when open the drawer
 * @param {Object} e drawer object property
 */
$.drawer.addEventListener('windowDidOpen', function(e) {

});

function handleClose(e){

}

$.drawer.addEventListener('drawerclose', function(e) {
  handleClose(e);
});
/**
 * @event windowDidClose
 * Fired when close the drawer
 * @param {Object} e drawer object property
 */
$.drawer.addEventListener('windowDidClose', function(e) {
  handleClose(e);
});

var controllerWebview = null;
/**
 * Load view on centerWindow of the drawer
 * @param  {Object} e Object menu item
 */
function loadView(e){
  Ti.API.log('--- loadView ' + JSON.stringify(e) + ' currentWin ' + currentWin);
  if(OS_IOS){
    if(currentWin){
      //$.nav.closeWindow(currentWin);
      $.nav.popToRootWindow();
      currentWin = null;
    }
  }

  if(e.connected){

    e = {
      itemIndex : rowMenu.properties.itemIndex,
      sectionIndex : rowMenu.properties.sectionIndex
    };
    currentIndex = null;

  }

  if(e.data.id == 'logout'){

    logout();
    return false;

  }

  var index = e.itemIndex,
      id = e.id || null,
      titleWindow = e.titleWindow || '',
      sectionIndex = e.sectionIndex,
      data = e.data || {},
      dontOpen = e.dontOpen || false,
      //section = $.menu.listview.getSections()[sectionIndex],
      section = $[data.menu].listview.getSections()[sectionIndex],
      //get the menu item row properties
      currentRow = section.getItems()[index] || {};

  if(actualMenu !== data.menu){
    currentIndex = null;
    if(rowMenu && actualMenu){

      var properties = rowMenu.properties;
      rowMenu.template = properties.templateInactive;
      var sectionOld = $[actualMenu].listview.getSections()[properties.sectionIndex];
      sectionOld.updateItemAt(properties.itemIndex, rowMenu);
      rowMenu = null;

    }
  }
  actualMenu = data.menu;

  //if we click on the active menu item
  if(currentIndex === index){

    $.drawer.closeLeftWindow();
    $.drawer.closeRightWindow();

  }else{

    Alloy.Globals.backController = currentData;
    currentData = data;

    //unselect active menu item
    if(rowMenu){

      var properties = rowMenu.properties;
      rowMenu.template = properties.templateInactive;

      section.updateItemAt(properties.itemIndex, rowMenu);
      rowMenu = null;

    }

    if(index > -1){

      var currentProperties = currentRow.properties;
      currentProperties.itemIndex = index;
      currentProperties.sectionIndex = sectionIndex;
      currentRow.template = currentProperties.templateActive;

      section.updateItemAt(index, currentRow);

      //save the menu item index and row
      currentIndex = index;
      rowMenu = currentRow;
      var controllerName = currentProperties.controller;
      //force menu close
      if(!dontOpen){
        $.drawer.closeLeftWindow();
        $.drawer.closeRightWindow();
      }
      //cleanup centerWindow
      $.contentWrapper.removeAllChildren();

      //$.titleWindow.text = currentProperties.titleWindow;

    //add view to centerWindow
    _.defer(function(){
      if(currentController){
        if(_.isFunction(currentController.clean)){
          currentController.clean();
        }
      }
      currentController = Alloy.createController(controllerName, _.extend(data, rowMenu));
      $.contentWrapper.add(currentController.getView());
    });

    }else{

      $.drawer.closeLeftWindow();
      $.drawer.closeRightWindow();

      //cleanup centerWindow
      $.contentWrapper.removeAllChildren();

      currentIndex = -1;
      //add view to centerWindow
      _.defer(function(){
        if(currentController){
          if(_.isFunction(currentController.clean)){
            currentController.clean();
          }
        }
        currentController = Alloy.createController(controllerName, data);
        $.contentWrapper.add(currentController.getView());

      });

    }

  }

}


/**
 * findRowMenu - description
 *
 * @param  {type} o description
 * @return {type}   description
 */
function findRowMenu(o){

  var id = o.id || 'abcdefgh',
      data = o.data || {};

  var i = 0;
  _.find($.menu.listview.getSections()[0].getItems(), function(row){

    if(row.properties.id == id){

      row.properties.itemIndex = i;
      row.properties.sectionIndex = 0;

      $.menu.listview.fireEvent('itemclick', _.extend(row.properties, { data : data }));
      return true;
    }
    i++;

  });

}
Alloy.Globals.events.on("findRowMenu",findRowMenu);

/**
 * @type {view} save the last opened window
 */
var currentWin = null;

/**
 * handleModelWin - description
 *
 * @param  {type} o description
 * @return {type}   description
 */
function handleModelWin(o){

  _.defaults(o, {
    data : {},
    controller : null,
    dispatcher  : null
  });

  var win = Alloy.createController(o.controller, o.data);
  currentWin = win.getView();

  function close(){

    if(OS_IOS){
      if(currentWin){
          $.nav.closeWindow(currentWin);
          currentWin = null;
      }
    }else{
      currentWin.close();
    }

    win.off('close');
    win = null;
  }

  win.on('close', close);
  win.on('select' , function(e){

    if(o.dispatcher){
      Alloy.Globals.events.trigger(o.dispatcher, e);
    }

    close();

  });

  if(OS_IOS){

    $.nav.openWindow(currentWin, {animated : true});

  }else{

    currentWin.open();

  }

}

Alloy.Globals.events.on('openWindow', handleModelWin);


/**
 * logout - description
 *
 * @return {type}  description
 */
function logout(){

  Ti.App.Properties.setBool('isConnected',false);
  Alloy.Globals.events.off('openWindow');
  Alloy.Globals.events.off('findRowMenu');

  if(OS_IOS){
    $.drawer.close();
  }

  Alloy.createController('index', { closeApp : true }).getView();

}
/**
 * @event Shake
 * Fired when the phone is shake
 * @param {Object} e object shake property
 */
Ti.Gesture.addEventListener('shake', function(e){
  var token = Ti.App.Properties.getString('notificationToken');
  console.log('------- token ' + token);
  if(token){
    Ti.UI.Clipboard.setText(''+token);
  }
});

_.defer(function(){
  $.menu.load(menu, true);
});

if(OS_ANDROID){

  $.drawer.addEventListener('open', onNavDrawerWinOpen);
  function onNavDrawerWinOpen(evt) {
      this.removeEventListener('open', onNavDrawerWinOpen);

      if(this.getActivity()) {
          // need to explicitly use getXYZ methods
          var actionBar = this.getActivity().getActionBar();

          if (actionBar) {
              // Now we can do stuff to the actionbar
              actionBar.hide();
          }
      }
  }

}


/**
 * closeWin - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function closeWin(e){
  if(OS_ANDROID){
    var activity = Titanium.Android.currentActivity;
    activity.finish();
  }
}

if(OS_ANDROID){

  $.drawer.addEventListener('android:back', function(e){

    if(Alloy.Globals.backController){

      findRowMenu({ id : Alloy.Globals.backController.id, data : Alloy.Globals.backController });

      Alloy.Globals.backController = null;
      currentData = null;

    }else{

      var dialog = Ti.UI.createAlertDialog({
        title : L('warning'),
        message : L('leaveApp'),
        buttonNames : [L('yes'), L('cancel')],
        cancel : 1
      });

      dialog.addEventListener('click', function(e){
        if(e.index === 0){
          closeWin();
        }else{
          return false;
        }
      });
      dialog.show();
    }

  });

}
