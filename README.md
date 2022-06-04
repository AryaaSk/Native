# Native
## A small framework which gives you the tools to build websites which look exactly like a Native iOS app.

Just import Native, write your HTML using Native HTML and CSS, and you can create a web application which will look almost identical to a native iOS app.

## Setup
Just import Native's [CSS Stylesheet](Src/native.css) and [JS](Src/native.js)
```html
<script src="native.js"></script> <!-- Import these before your own scripts -->
<link rel="stylesheet" href="native.css">
```

Also make sure to add an ontouchstart to the body, to fix the iOS safari bug where the :active pseudo class doesn't work properly:
```html
<body ontouchstart>
</body>
```

### Page Layout
Once you have import Native, you can create elements using special Native classes, and then just handle all events using JS as usual. This is only meant to be a CSS framework.

A Native view must have a Navigation bar, a Main section, and a Tab bar. So format your HTML body like this:
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
<label>A Label</label> <!-- Basically the same as HTML -->
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