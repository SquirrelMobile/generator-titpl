# Template Application Axway Appcelerator Titanium Mobile SDK with burger menu

![Template Titanium mobile burger menu](https://github.com/SquirrelMobile/templateAppceleratorBurgerMenu/blob/master/screens/animated.gif?raw=true "Template Titanium mobile burger menu")

## Handle fonts

1. Place all your font on `app/assets/fonts` folder.
2. For cross-plateform, name your font as the `PostScript` name, more info here : http://docs.appcelerator.com/platform/latest/#!/guide/Custom_Fonts-section-src-29004935_CustomFonts-RenamefontfiletomatchPostScriptname

## Handle assets images

1. Install `ticons` package https://www.npmjs.com/package/ticons
`[sudo] npm install -g ticons`
2. Create all images in `app/assets/iphone/images/` (you can create subfolder if you want) at @3x format then run `ticons assets` on your project

## JS-Duck install for documentation

1. [sudo] gem install jsduck
2. Go into folder dossier .npm => /Users/[USERS]/.npm/
then run `npm install git://github.com/jamilhassanspain/titanium-jsduck.git`
3. On the root folder of the project, initialize JSDUCK with `titanium-jsduck install` (that's create folder `docs/` and a file named `alloy.jmk`)
4. Run the documentation with : `titanium-jsduck run`

___

Crédit : Squirrel http://www.squirrel.fr
– Code Strong 🚀
