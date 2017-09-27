/**
 * @class Controller.partials._tabgroup
 * Display tabgroup bottom view
 *
 */

 (function constructor(args){

   var menu = [
     {
        controller : 'home/home',
        image : {
          text : '\uf015'
        },
        title : 'Accueil'
     },
     {
        controller : 'partials/_detailList',
        image : {
          text : '\uf03a'
        },
        title : 'Liste'
     },
     {
        controller : 'profil/profil',
        image : {
          text : '\uf007'
        },
        title : 'Profil'
     },
     {
        controller : 'menu',
        title : 'Autre',
        last : true
     }
   ];

   _.each(menu, function(m){
     $.tabgroup.add(Alloy.createController('/partials/_tab', m).getView());
   });

 })($.args);

function handleClick(e){
  Ti.API.log('--- e ' + JSON.stringify(e));
  var s = e.source,
    type = s.type;

  if(type === "menu" || type === "view"){
    $.trigger('click', {
      controller : s.controller,
      type : type
    });
  }

}
