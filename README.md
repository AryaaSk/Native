# Native
## A small framework which gives you the tools to build websites which look exactly like a Native iOS app.

Just import Native, write your HTML using Native HTML and CSS, and you can create a web application which will look almost identical to a native iOS app.

## Setup
Just import Native's [CSS Stylesheet](Src/native.css) and [JS](Src/native.js)
```html
<script src="native.js"></script> <!-- Import these before your own scripts -->
<link rel="stylesheet" href="native.css">
```

Make sure to add an ontouchstart to the body, to fix the iOS safari bug where the :active pseudo class doesn't work properly:
```html
<body ontouchstart>
</body>
```

You will also want to add this tag into the head of your HTML to prevent the user from double-tapping and zooming in:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### Page Layout
Once you have import Native, you can create elements using special Native classes, and then just handle all events using JS as usual. This is only meant to be a CSS framework.

A Native view must have a Navigation bar, a Main section, and optionally a Tab bar.\
Format your HTML body like this:
```html
<div class="navigation-bar">
    <div class="leftButtons"></div>
    <label>Welcome to Native</label>
    <div class="rightButtons"></div>
</div>

<div class="main">
    <!-- Main content goes here  -->
</div>

<div class="tab-bar">
    <!-- Tab bar is initalized with the use of JS (see below) -->
</div>
```

To initalize the tab bar, first you need to specify the different items:
```javascript
TAB_BAR_CONFIG = [
    { iconSrc: "book.svg", title: "Book", path: "book.html" }, //you will need to have these icons and html files stored locally
    { iconSrc: "pencil.svg", title: "Pencil", path: "pencil.html" },
];
```
Then you can just call the InitTabBar() function:
```javascript
InitTabBar();
```

If you do not want a tab bar, then you can add this tag into your body element:
```html
<body ontouchstart class="noTabBar">
</body>
```

## Elements
After this, you can begin to customize the main section using the elements.

### Button
```html
<button class="button">Click Me</button>
```

### Textfield
```html
<input type="text" class="textfield" placeholder="Textfield">
```

### Label
```html
<label class="label">A Label</label> <!-- Basically the same as HTML -->
```


### Tableview
```html
<div class="tableview">
    <div class="section">
        <header>Section 1 header</header>
        <div class="row">Row 1</div>
        <div class="row">Row 2</div>
        <div class="row">Row 3</div>
        <footer>Section 1 footer</footer>
    </div>

    <div class="section">
        <header>Section 2 header</header>
        <div class="row">Row 1</div>
        <div class="row">Row 2</div>
        <footer>Section 2 footer</footer>
    </div>
</div>
```

### Collectionview
```html
<div class="collectionview">
    <div class="section"> <!-- No headers or footers for collectionviews-->
        <div class="cell">Cell 1</div>
        <div class="cell">Cell 2</div>
    </div>

    <div class="section">
        <div class="cell">Cell 1</div>
        <div class="cell">Cell 2</div>
        <div class="cell">Cell 3</div>
        <div class="cell">Cell 4</div>
        <div class="cell">Cell 5</div>
    </div>
</div>
```

You can also just insert regular HTML into a div, but since it is not being styled by Native, there is a chance that it will not have a consistent style with the rest of the app

There is also an experimental dark mode, the reason it is not fully finished is because there are so many different colour changes when moving to dark mode, and so it can get very confusing. To enable the dark mode you can just call this in your script:
```javascript
LoadDarkMode();
```