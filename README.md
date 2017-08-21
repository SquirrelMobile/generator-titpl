# generator-titpl

Create Appcelerator Titanium skeleton

# Installation

**npm install -g generator-titpl**

If you don't have yet the Yeoman tool, you should install it first :

**npm install -g yo**

# Using

**yo titpl**

Then answer all questions. They are used for filling the tiapp.xml and config.json file

#### Questions :

1. Which template do you need ? (burger, tabgroup, required)
2. What is the bundle ID ? (<id> in tiapp.xml, required)
3. What will you call your app ? (<name> in tiapp.xml, required)
4. Publisher name (<publisher> in tiapp.xml, optional)
5. What is the URL for the project webpage (if any) ? (<url> in tiapp.xml, optional)
6. Provide a short description for your app : (<description> in tiapp.xml, optional)
7. Copyright name : (<copyright> in tiapp.xml, optional)
8. Titanium SDK : (<sdk-version> choose in the installed SDK, required)
9. What is the main color for your app ? (background window color, CFG.COLORS.main value on config.json)
10. What is the second color for your app ? (navbar, button color, CFG.COLORS.main2 value on config.json)
11. What is the baseurl of your webservice ? (CFG.baseurl value on config.json)

___


At the end of the process, if you need to register the application :
**appc new --import --no-services**

If you are not logged into Appcelerator platform :
*appc login*

To test your application :
**appc run**

# TODO

1. Add more template
2. Customize config.json file with fonts, colors, pushwoosh, baseurl
3. Add other library/code example like input material, calenda view, in-app purchase, Maps, tutorial, Admob, wysiwyg, charts
4. Enable / disable library on the fly when you create a new app
5. Handle module dependancy with gittio cli
