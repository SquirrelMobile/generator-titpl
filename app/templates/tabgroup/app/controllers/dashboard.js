// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var currentController = null;
var menuOpen = false;
var menuC = null;
var menu = null;
var enabledCache = true;

var tabmenu = [
  {
     id : 'home',
     controller : 'home/home',
     currentController : null,
     image : {
       text : '\uf015'
     },
     title : 'Accueil'
  },
  {
     id : 'list',
     controller : 'partials/_detailList',
     currentController : null,
     image : {
       text : '\uf03a'
     },
     title : 'Liste'
  },
  {
     id : 'profil',
     controller : 'profil/profil',
     currentController : null,
     image : {
       text : '\uf007'
     },
     title : 'Profil'
  },
  {
     id : "menu",
     controller : 'menu',
     image : {
       text : '\uf141'
     },
     title : 'Autre',
     last : true
  }
];

var tabsubmenu = [
  {
     id : 'home2',
     controller : 'home/home',
     currentController : null,
     image : {
       text : '\uf015'
     },
     title : 'Accueil'
  },
  {
     id : 'list2',
     controller : 'partials/_detailList',
     currentController : null,
     image : {
       text : '\uf03a'
     },
     title : 'Liste'
  },
  {
     id : 'profil2',
     controller : 'profil/profil',
     currentController : null,
     image : {
       text : '\uf007'
     },
     title : 'Profil'
  },
  {
     id : 'logout',
     controller : 'logout',
     image : {
       text : '\uf2f5'
     },
     title : 'Déconnexion',
     last : true
  }
];

(function constructor(args){

  $.tabgroup.load(tabmenu);

})(args);

function handleContent(o){
  Ti.API.log('--- handleContent '  +JSON.stringify(o));
  var controller = o.controller || null;
  var idController = o.id || null;
  var type = o.type || 'view';
  var submenu = !!o.submenu;

  if(type === "view"){

    cleanMenu();

  }else{

    if(controller === "menu"){

      if(!menuOpen){

        menuC = Alloy.createController('partials/_menu', { currentController : currentController, menu : tabsubmenu });
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

      if(enabledCache){
        Ti.API.log('--- currentController '  + currentController +' idController ' + idController + ' submenu ' + submenu);
        if(currentController !== idController){ // si on appui sur un menu different

          if(idController){

            var currentMenu = _.findWhere(submenu ? tabsubmenu : tabmenu, { id : idController});
            var oldMenu = _.findWhere(tabmenu, { id : currentController});
            if(!oldMenu){
              oldMenu = _.findWhere(tabsubmenu, { id : currentController});
            }
            Ti.API.log('-- -old ' + JSON.stringify(oldMenu));
            if(oldMenu && oldMenu.currentController){
              oldMenu.currentController.getView().hide();
              oldMenu.currentController.getView().zIndex = 1;
            }
            Ti.API.log('--- currentMenu '  + JSON.stringify(currentMenu));
            if(currentMenu){

              if(currentMenu.currentController){ // si le controller n'est pas null

                if(_.isFunction(currentMenu.currentController.load)) {
                  currentMenu.currentController.load();
                }

                currentMenu.currentController.getView().show();
                currentMenu.currentController.getView().zIndex = 10;
                currentController = idController; // home/home

                if(submenu){
                  $.tabgroup.enableLast();
                }

              }else{

                var c = Alloy.createController(controller,{});

                currentController = idController;
                _.findWhere(submenu ? tabsubmenu : tabmenu, { id : idController}).currentController = c;
                $.content.add(c.getView());
                if(submenu){
                  $.tabgroup.enableLast();
                }

              }

            }

          }
        }

      }else{

        if(currentController !== idController){

          //cleanMenu();

          if(submenu){
            $.tabgroup.enableLast();
          }

          currentController = idController;
          $.content.removeAllChildren();
          $.content.add(Alloy.createController(controller).getView());

        }else{

          //cleanMenu();

        }

      }

      cleanMenu();

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
