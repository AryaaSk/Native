# Native
## A small framework which gives you the tools to build websites which look exactly like a Native iOS app.

## How it works
Basic idea so I'm not sure if this will actually work:
- Developer writes their code in their HTML file, with special elements such as:
```html
<navigation-bar
    data-title="Test Navigation Bar"
></navigation-bar>
```

- At the end of their file, the *native.css* and *native.js* files are called:
```html
<link rel="stylesheet" href="/Src/native.css">
<script src="/_JS/Src/native.js" defer></script>
```

- Native will contain a lot of templates for different objects (navigation bar, tab bar, buttons, etc...), and the JS will go through the developer's HTML, and replace all instances of a special tag such as <navigation-bar>, with the actual template for that object.
    - For example this could be what the Navigation Bar template looks like:
    ```html
    <div id="navigation-bar">
        <label id="navigation-bar-title"></label>
    </div>
    ```

    ```css
    #navigation-bar {
        height: 60px;
        width: 100%;

        display: grid;
        place-content: center;

        font-size: large;
        font-weight: bold;
        background-color: var(--systemBackgroundColour);
        border-bottom: 1px solid var(--systemBorderColour);
    }
    ```

- The JS will modify the template, to inject the data such as title into it, and then just replace the <navigation-bar> tag in the developer's HTML with the modifyed template.



# I think a better solution to this would be to look at Bootstrap, and give each object a specific CSS style. Then the user can just use regular divs, and give them a specific class that they want. It would reduce the complexity drastically.
## Ignore above