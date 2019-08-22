/**
 * @class Controller.profil.profil
 * Display profil view
 *
 */

import { User } from "/classes/user";

Alloy.Globals.currentUser = Ti.App.Properties.getObject("user", null)
  ? new User(Ti.App.Properties.getObject("user"))
  : null;
/**
 * @method Controller
 * Display profil view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args) {
  $.paging.setScrollableView($.scrollableView);
  if (Alloy.Globals.currentUser) {
    $.top.photo.image = Alloy.Globals.currentUser.getAvatar();
    $.top.name.text = Alloy.Globals.currentUser.getFullName();
  }
})($.args);

/**
 * openDialogCamera - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function openDialogCamera(e) {
  require("/media").openDialogCamera(function(photo, ext) {
    $.top.photo.image = photo;
    var name = require("/media").saveFile({
      blob: photo,
      ext: ext
    });
    require("dao/variable").set("photo", name);
  });
}
