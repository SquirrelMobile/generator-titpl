# generator-titpl

Create Appcelerator Titanium skeleton

# Installation

**npm install -g generator-titpl**

OR

**npm update -g generator-titpl** if you already have it

If you don't have yet the Yeoman tool, you should install it first :

**npm install -g yo**

# Using

**yo titpl**

Then answer all questions. They are used for filling the tiapp.xml and config.json file

#### Questions :

1. Which template do you need ? (burger, tabgroup, required)
2. What's your application id (example: com.company.myapp) ? (<id> in tiapp.xml, required)
3. What's the project name ? (<name> in tiapp.xml, required)
4. What's the publisher name ? (<publisher> in tiapp.xml, optional)
5. What's the URL for the project webpage (if any) ? (<url> in tiapp.xml, optional)
6. Provide a short description for your app : (<description> in tiapp.xml, optional)
7. What's the copyright name ? (<copyright> in tiapp.xml, optional)
8. Which SDK would you like to use ? (<sdk-version> choose in the installed SDK, required)
9. What's the main color for your app ? (background window color, CFG.COLORS.main value on config.json)
10. What's the second color for your app ? (navbar, button color, CFG.COLORS.main2 value on config.json)
11. What's the baseurl of your webservice ? (CFG.baseurl value on config.json)

---

At the end of the process, if you need to register the application :
**appc new --import --no-services**

If you are not logged into Appcelerator platform :
_appc login_

To test your application :
**appc run**

# More templates ?

If you want contribute and add your own template, you can checkout this repository : https://github.com/SquirrelMobile/template-titpl and follow instructions.

# TODO

1. Add more template
2. Customize config.json file with fonts
3. Add other library/code example like in-app purchase, Maps, Admob, wysiwyg, charts
4. Enable / disable library on the fly when you create a new app
5. Handle module dependancy with gittio cli

# CHANGELOG

1.4.1 : 18-12-2019

- Update DefaultIcon on template
- Update readme to add more template

  1.4.0 : 17-12-2019

- Add prettier rules and package.json file
- Update onesignal module for iOS 13
- Update TiTouchImageView Android
- NEW : Add form generator with multiple options
- NEW : Update RESTE lib to enable request's cache
- NEW : custom alertDialog with options
- NEW : Add Ti.animation with support of Lottie

  1.3.0 : 22-08-2019

- Update FontAwesome
- Remove Template with fake tabgroup
- Add list template with colums
- Add cache HTTP request
- Add lib to enable / disable log from config.json
- Add widget to zoom on image
- Update modules to works with Ti > 8.X

  1.2.2 : 28-01-2019

- Update FontAwesome
- Add new Template with native tabgroup
- Add keytoolbarios controller
- Update OneSignal module
- Remove camalcase npm
- Use spawnSync to ti SDK list

  1.2.1 : 05-09-2018

- Add av.imageview module
- Change media lib to choose / take picture on profil

  1.2.0 : 31-07-2018

- Add refreshControl on ListView
- Add getAttributed function in core.js lib to handle attributed String
- Edit rest.js lib to support PATCH http
- Update input-materialdesign widget ti 2.0 version
- Add NSPhotoLibraryAddUsageDescription in tiapp
- Add android:hardwareAccelerated="true" on tiapp for Android

  1.1.1 : 02-05-2018

- Add translation english / french

  1.1.0 : 27-04-2018

- Add backbone event to Alloy.Globals instead lib
- Add Alloy.Globals.Device in alloy.js
- Add requestLocationPermissions function in core.js lib
- Add OneSignal module and lib for Push Notification

  1.0.6 : 04-01-2018

- Update module for Ti SDK > 7.0

  1.0.5 : 27-09-2017

- Add calendar widget

  1.0.4 - 21-08-2017
