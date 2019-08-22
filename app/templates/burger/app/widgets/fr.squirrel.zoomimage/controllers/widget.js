var args = arguments[0] || {};
var imageView = null;
_.defaults(args, {
  loaderColor : "red",
  maxZoomScale : 5,
  minZoomScale : 0.5,
  zoomScale : 0.9
});
$.main.applyProperties(_.omit(args,"loaderColor"));



$.loading.color = args.loaderColor;

if (OS_ANDROID) {
  var TiTouchImageView = require('org.iotashan.TiTouchImageView');
  imageView = TiTouchImageView.createView({
    height : "100%" ,
    width : Ti.UI.FILL,
    maxZoom : args.maxZoomScale,
    minZoom : args.minZoomScale,
    zoom : args.zoomScale
  });
  $.image.add(imageView);
}
else if(OS_IOS) {
  imageView = Ti.UI.createImageView({
    width : "100%",
    height : Ti.UI.SIZE
  })
  $.image.add(imageView);
}
if (args.image) {
  setImage(args.image);
}

function setImage(img){
  if (typeof img === 'string' && checkRemoteImage(img)) {
    fetchImage(img,function(e){
      imageView.image = e;
    })
  }
  else {
    imageView.image = img;
  }
}

function checkRemoteImage(image){
  return image.indexOf("http://") >= 0 || image.indexOf("https://") >= 0;
}

function fetchImage(img, callback) {
  $.loading.show();
  var xhr = Ti.Network.createHTTPClient({
    onload : function() {
      $.loading.hide();
      callback(this.responseData);
    }
  });
  xhr.open("GET", img);
  xhr.send();
}

exports.setImage = setImage;
