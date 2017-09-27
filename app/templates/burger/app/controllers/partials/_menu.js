/**
 * @class Controller.partials._menu
 * Create the right view of drawer
 */

 /**
  * @method Controller
  * Create the left menu with item
  * @param  {Object} args Arguments passed to the controller
  */
(function constructor(args){

})($.args);

/**
* Load items on the ListView
* @param  {Array} data ListItem
*/
function load(data, loadFirst){

 $.listview.setSections([]);

 var d = [];

 _.each(data, function(row){

   _.extend(row, {
     menu : 'menu',
     height : 58,
     backgroundColor : Alloy.CFG.COLORS.menuBg,
     selectionStyle : OS_IOS ? Titanium.UI.iPhone.ListViewCellSelectionStyle.NONE : ''
   });

   elem = {
     template : row.templateInactive,
     properties : row,
     title : {
       text : row.title
     } 
   };

   if(row.image){
     elem.image = row.image
   };

   d.push(elem);

 });

 $.listview.setSections([Ti.UI.createListSection({ items : d })]);

 if(loadFirst){
   //load first item of menu
   _.defer(function(){
       $.listview.fireEvent('itemclick', { sectionIndex : 0, itemIndex : 0 });
   });
 }

}

$.load = load;


/**
 * handleClick - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function handleClick(e){

 var prop = $.listview.getSections()[e.sectionIndex].getItemAt(e.itemIndex).properties;

 if(e.data){
   _.extend(prop, { data : e.data });
 }

 $.trigger('click',{
    sectionIndex : e.sectionIndex,
    itemIndex : e.itemIndex,
    data : prop
 });

}
