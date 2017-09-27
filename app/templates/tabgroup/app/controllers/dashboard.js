// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var currentController = null;
var menuOpen = false;
var menuC = null;
var menu = null;

(function constructor(args){

  handleContent({
    controller : 'home/home',
    type : 'menu'
  });

})(args);

function handleContent(o){
  Ti.API.log('--- handleContent '  +JSON.stringify(o));
  var controller = o.controller || null;
  var type = o.type || 'view';

  if(type === "view"){

    cleanMenu();

  }else{

    if(controller === "menu"){

      if(!menuOpen){

        menuC = Alloy.createController('partials/_menu');
        menu = menuC.getView();
        menuC.on('click', handleContent);
        $.win.add(menu);

      }else{

        cleanMenu();

      }

      menuOpen = !menuOpen;

    }else if(controller === "logout"){

      if(OS_IOS){
        $.win.close();
      }
      Ti.App.Properties.setBool('isConnected', false);
      Alloy.createController('login/login', { closeApp : true }).getView().open();

    }else{

      if(currentController !== controller){

        cleanMenu();

        currentController = controller;
        $.content.removeAllChildren();
        $.content.add(Alloy.createController(controller).getView());

      }else{

        cleanMenu();

      }

    }
  }

}

function cleanMenu(){

  if(menuC && menu){
    menuC.off('click', handleContent);
    $.win.remove(menu);
    menu = null;
    menuC = null;
    menuOpen = !menuOpen;
  }

}
