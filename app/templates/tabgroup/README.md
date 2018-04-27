# Template Application Axway Appcelerator Titanium Mobile SDK with tabgroup navigation

![Template Titanium mobile tabgroup navigation](http://www.squirrel.fr/wp-content/uploads/2017/12/brand.jpg "TitaniumFullApp")

![Template Titanium mobile tabgroup navigation](https://github.com/SquirrelMobile/titanium-template-tabgroup/blob/master/screens/animated.gif?raw=true "Template Titanium mobile tabgroup navigation")

## Handle fonts

1. Place all your font on `app/assets/fonts` folder.
2. For cross-plateform, name your font as the `PostScript` name, more info here : http://docs.appcelerator.com/platform/latest/#!/guide/Custom_Fonts-section-src-29004935_CustomFonts-RenamefontfiletomatchPostScriptname

## Use Awesome / Material fonts
- http://fontawesome.io/icons/
- https://material.io/icons/
- Take the unicode of the icons and add \u before.
Example : `<Label class="fa" text="\uf0c0" />`
"fa" is the class create in app.tss


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
