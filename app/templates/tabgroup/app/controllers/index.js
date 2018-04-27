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

 var currentWin = null;
 var ui = require("xp.ui");
 var $nav = null;

 (function constructor(args){

   if(Ti.App.Properties.getBool('isConnected')){

     $nav = ui.createNavigationWindow({
       id : 'nav',
       window : Alloy.createController('dashboard').getView()
     });
     $nav.open();
     Alloy.Globals.events.off('openWindow');
     Alloy.Globals.events.on('openWindow', handleOpenWin);

   }else{
     Alloy.createController('login/login', args).getView().open();
   }

 })($.args);

 function handleOpenWin(o){

   _.defaults(o, {
     data : {},
     controller : null,
     dispatcher  : null
   });

   var win = Alloy.createController(o.controller, o.data);
   currentWin = win.getView();

   function close(){

     if(currentWin){
         $nav.closeWindow(currentWin);
         currentWin = null;
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

   $nav.openWindow(currentWin, {animated : true});

 }
