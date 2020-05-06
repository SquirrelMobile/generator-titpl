# Template Application Axway Appcelerator Titanium Mobile SDK with burger menu

![Template Titanium mobile burger menu](https://github.com/SquirrelMobile/titanium-template-burger/blob/master/screens/animated.gif?raw=true "Template Titanium mobile burger menu")

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

## Form generator

Form generator contains 15 types of fields, you can create a form with only the form in xml and object in tss like this :

login.xml

```
<Alloy>
	<Window id="win">
		<ScrollView class="container">
			<Require src="/component/form" class="defaultForm" id="form"/>
		</ScrollView>
	</Window>
</Alloy>

```

login.tss

```
'#form': {
  champs : [
  {
    id: "email",
    title : {
      text : "Email",
    },
    textField : {
      hintText : "type your email",
    },
    type : "textFieldEmail",
    required : true,
  },
  {
    id: "password",
    title : {
      text : "Password",
    },
    textField : {
      hintText : "type your password",
    },
    type : "textFieldPassword",
    required : true,
  },
  {
    id: "valid",
    button : {
      top: 10,
      backgroundColor: Alloy.CFG.COLORS.main2,
      width: 185,
      bottom: 10
    },
    label : {
      text : L('connect'),
      color: "white",
    },
    type : "valid",
  }
  ]
}
```

in js you can get handle field with :

```
var champs = $.form.getChamps();
champs.textFieldGenericPopup.callback = function(e) {
  champs.textFieldGenericPopup.setValue(e.title);
};
```

Result :

![result](./screens/example_form.png?raw=true "result")

### Globals

#### By default the form use property in app.tss ".defaultForm", so don't forget to add class in xml component :

```
<Require src="/component/form" class="defaultForm" id="form" />
```

Properties for each fields :

![TitleButtons](./screens/title_button.png?raw=true "TitleButtons")

- parent : set view properties of view parent (white border in the screen)(Ti.UI.View),
  example :

```
parent: {
	top: 10;
}
```

- title : set label properties to the title above textfield (red border in the screen) (Ti.UI.Label), example :

```
title: {
  bottom: 5,
  left: 0,
  color: "white",
}
```

- container : set view properties to container view of the field (light red border in the screen)(Ti.UI.View), example :

```
container: {
  height: 50,
  backgroundColor: "white",
  borderColor: "red",
  touchFeedback: true,
  width: Ti.UI.FILL,
}
```

- buttonIcons : set view default properties to the buttons left/right (blue border in the screen) of the field (Ti.UI.Button), example :

```
buttonIcons: {
  font: { fontFamily: "FontAwesome5Pro-Solid", fontSize: 16 },
  color: Alloy.CFG.COLORS.black,
  width: 40,
  borderColor: 'blue',
  height: Ti.UI.FILL,
  backgroundColor: null,
}
```

- fieldView : set view properties to the view container of the field type (between buttonIcons) (Ti.UI.View), example :

```
fieldView: {
  font: { fontFamily: "FontAwesome5Pro-Solid", fontSize: 16 },
  color: Alloy.CFG.COLORS.black,
  width: 40,
  borderColor: 'blue',
  height: Ti.UI.FILL,
  backgroundColor: null,
}
```

- required : set the field required so if you valid the form it check if the field is not empty

### Differents types field

Properties for all "textField" type :

#### textField

![textField](./screens/textField.png?raw=true "textField")

Get a simple textfield

Properties :

```
- textfield : access to textField view (Ti.UI.TextField)
```

Exemple usage :

```
{
  id: "example",
  title : {
    text : "example",
  },
  type : "textField",
}
```

#### textFieldDate

![date](./screens/date.png?raw=true "date")

Get a field with a fake textfield, when you click it opens a popup allowing to set a date

Properties :

```
- textField : access to Label view (Ti.UI.Label)
```

Exemple usage :

```
{
  id: "birthday",
  title : {
    text : "Birthday",
  },
  textField : {
    hintText : "type your birthday",
  },
  type : "textFieldDate"
},
```

#### textFieldEmail

![email](./screens/email.png?raw=true "email")

Get a simple textfield with icon mail and keyboardType mail
Properties :

```
- textfield : access to textField view (Ti.UI.TextField)
```

Exemple usage :

```
{
  id: "email",
  title : {
    text : "Email",
  },
  textField : {
    hintText : "type your email",
  },
  type : "textFieldEmail",
  required : true,
}
```

#### textFieldGenericPopup

![generic](./screens/textFieldGeneric.png?raw=true "textFieldGeneric")

Get a field with a fake textfield, when you click it opens a popup with a controller in params
Properties :

```
- dialog : set the dialog properties (Dialog object)
- callback : set a callback get data in controller (callback function)
```

Dialog object :

```
- title : set the title navbar (Ti.UI.Label)
- content : set the path controller (String)
- modal : set the modal property for dialog (Boolean)
```

Exemple usage :

```
{
  id: "example",
  title : {
    text : "textfield",
  },
  dialog : {
    title : {
      text : "example"
    },
    content : "partials/listExample"
  },
  type : "textFieldGenericPopup",
}
```

#### textFieldList

![textFieldList](./screens/textfieldList.png?raw=true "textFieldList")

Get a field with a picker

```
- textfield : access to textField view (Ti.UI.TextField)
- list : set a list
```

Exemple usage :

```
{
  id: "textFieldList",
  title : {
    text : "Type",
  },
  list : [
    {text : "list"},{text : "column"}
  ],
  required : true,
  type : "textFieldList",
}
```

#### textFieldNumber

Get a simple textfield with keyboardType number

```
- textfield : access to textField view (Ti.UI.TextField)
```

Exemple usage :

```
{
  id: "number",
  title : {
    text : "Number",
  },
  textField : {
    hintText : "type your number",
  },
  required : true,
  type : "textFieldNumber",
}
```

#### textFieldOptionDialog

![optionDialog](./screens/optionDialog.png?raw=true "optionDialog")

Get a field with a fake textfield, when you click it opens a optionDialog

```
- textfield : access to textField view (Ti.UI.TextField)
- optionDialog : access to optionDialog component (Ti.UI.OptionDialog)
```

Exemple usage :

```
{
  id: "option",
  title : {
    text : "Option",
  },
  optionDialog : {
    title: 'Titanium rocks!',
    options: [ 'Option A', 'Option B' ],
    cancelable: true
  },
  textField : {
      hintText : "Choose a option",
  },
  type : "textFieldOptionDialog",
}
```

#### textFieldPassword

![password](./screens/password.png?raw=true "password")

Get a simple textfield with passwordMask and icon on right for disable/enable the passwordMask

```
- minLength : set the minimum length for password
- textfield : access to textField view (Ti.UI.TextField)
```

Exemple usage :

```
{
  id: "password",
  minLength : 6,
  title : {
    text : "Password",
  },
  textField : {
      hintText : "Type your password",
  },
  type : "textFieldPassword",
}
```

#### textFieldPhone

![phone](./screens/phone.png?raw=true "phone")

get a simple textfield with keyboardType phone and a prefix for check if the field has a valid phone number

```
- textfield : access to textField view (Ti.UI.TextField)
- hasPrefix : show the prefix area phone, click event show a popup with different prefix (Boolean)
- prefix : access to Label prefix view (TI.UI.Label)
```

Exemple usage :

```
{
  id: "phone",
  title : {
    text : "Phone",
  },
  textField : {
    hintText : "type your phone",
  },
  type : "textFieldPhone",
}
```

#### textArea

![comment](./screens/comment.png?raw=true "comment")

get a simple textArea

```
- textArea : access to textArea view (Ti.UI.TextArea)
```

Exemple usage :

```
{
  id: "comment",
  title : {
    text : "Comment",
  },
  textArea : {
      hintText : "type your comment",
  },
  type : "textArea",
}
```

#### photoSelector

![optionDialog](./screens/photoSelector.png?raw=true "photoSelector")

get a component for set a photo in a field

```
- containerPhoto : access to view container of image/button (Ti.UI.View)
- image : access to imageView (Ti.UI.ImageView)
- button : access to button (Button Object)
```

Button object :

```
- parent : access the parent view Button (Ti.UI.View)
- icon : access the label icon  (Ti.UI.Label)
- label : access the label (Ti.UI.Label)
```

Exemple usage :

```
{
  container : {
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  image : {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "white",
  },
  button : {
    label : {
      text: L("choosePicture")
    }
  },
  type : "photoSelector",
}
```

#### map

![map](./screens/map.png?raw=true "map")

get a component for set longitude/latitude/address with maps

```
- label : access to Label view (Ti.UI.Label)
```

Exemple usage :

```
{
  id: "map",
  title : {
    text : "Map",
  },
  container : {
    height : 100
  }
  label : {
    text : "select"
  },
  type : "map",
},
```

#### fakeTextField

![fakeTextField](./screens/textField.png?raw=true "fakeTextField")

Get a fake textField, it's a label use for simple click event

```

- faketextField : access to Label view (Ti.UI.Label)

```

Exemple usage :

```

{
id: "textfield",
title : {
  text : "textfield",
},
textField : {
  hintText : "test",
},
required : true,
  type : "fakeTextField",
}

```

#### checkbox

![checkbox](./screens/checkbox.png?raw=true "checkbox")

Get a simple checkBox with text

```

- containerCheckBox : access to view container of checkbox/label (Ti.UI.View)
- checkBox : access to animationView checkBox (Ti.animation module View)
- label : access to label (Ti.UI.Label)

```

Exemple usage :

```

{
id: "checkqsdfqsd",
label :{
text: "Salut"
},
type : "checkbox",
}

```

#### buttonMultiple

![multipleButton](./screens/multipleButton.png?raw=true "multipleButton")

get a component with buttons multiple choice

```
- activeColor : the color when item is enabled (String)
- disabledColor : the color when item is disabled(String)
- data ([Data Object])
```

Data object :

```
- active : set if this button is active (Boolean)
- view : set the parent of the button (Ti.UI.View)
- viewPadding : set the container of label/icon (Ti.UI.View)
- label : set the label property (Ti.UI.Label)
- icon : set the icon property (Ti.UI.Label)
```

Exemple usage :

```

{
  id: "example",
  activeColor : "black",
  disabledColor: "white",
  title : {
    text : "example",
  },
  data : [
   {
     active : true,
     id : 1,
     label : {
       text : "test"
     },
     icon :{
       text : "\uf00d"
     }
   },{
     id : 2,
     label : {
       text : "test"
     },
     icon :{
       text : "\uf00d"
     }
   },{
     id : 3,
     label : {
       text : "test"
     },
     icon :{
       text : "\uf00d"
     }
   }
  ],
  type : "buttonsMultiple",
}

```

---

Crédit : Squirrel http://www.squirrel.fr
– Code Strong 🚀
