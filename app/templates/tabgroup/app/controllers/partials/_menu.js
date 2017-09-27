/**
 * @class Controller.partials._menu
 * Display menu view
 *
 */

(function constructor(args){

  var menu = [
    {
       controller : 'home/home',
       image : {
         text : '\uf015'
       },
       title : 'Menu Accueil'
    },
    {
       controller : 'partials/_detailList',
       image : {
         text : '\uf03a'
       },
       title : 'Menu Liste'
    },
    {
       controller : 'profil/profil',
       image : {
         text : '\uf007'
       },
       title : 'Menu Profil'
    },
    {
       controller : 'logout',
       image : {
         text : '\uf08b'
       },
       title : 'Déconnexion',
       last : true
    }
  ];

  _.each(menu, function(m){
    $.menu.add(Alloy.createController('/partials/_tab', m).getView());
  });

})($.args);

function handleClick(e){

  var s = e.source,
    type = s.type;

  if(type === "menu" || type === "view"){
    $.trigger('click', {
      controller : s.controller,
      type : type
    });
  }

}
