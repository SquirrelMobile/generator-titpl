/**
 * @class Controller.partials._tabgroup
 * Display tabgroup bottom view
 *
 */

 (function constructor(args){

   var menu = [
     {
        controller : 'home/home',
        image : '/images/common/logo.png',
        title : 'Accueil'
     },
     {
        controller : 'partials/_detailList',
        image : '/images/common/logo.png',
        title : 'Liste'
     },
     {
        controller : 'profil/profil',
        image : '/images/common/logo.png',
        title : 'Profil'
     },
     {
        controller : 'menu',
        //image : '/images/common/logo.png',
        title : 'Autre',
        last : true
     }
   ];

   _.each(menu, function(m){
     $.tabgroup.add(Alloy.createController('/partials/_tab', m).getView());
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
