# Grapher
## A basic application which takes in an equation of a line, and outputs the result onto a graph (canvas). Built to test Native and to learn about PWAs.
*This was originally in a different repo to Native, but I decided to merge them since there was no point in having 2 separate repositaries. However this means they have separate tsconfigs and separate Src folders, so make sure when working on Grapher that you only have that directory open in your editor.*

I built this to test Native, which is a CSS Framework used to make website looks like native apps.\
I can then build the project, and upload it to a hosting service, and then just view it as a PWA or inside a WebView of a native app.

## URL: https://aryaask.github.io/Grapher/dist

## How to convert to PWA:
I also added a manifest.json, to try and convert it to a PWA, it seems to work however I have not added a service worker, as I am still learning about PWAs and how they function.\
Here are the steps I took to make this installable:
- Added a logo in the Assets folder.
- Added [manifest.json](Src/manifest.json) to the root of the Src folder, for the Icon I set the path as if they were in the same directory, because they get placed in the same dist directory after being built.
- Added a rel tag in all the HTML files, like this:
```html
<link rel="manifest" href="/Src/manifest.json">
```
- Added these meta tags before the main meta tag, to allow the app to use all of the available area:
```html
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```
- Finally added this script in the InitTabBar() method of Native, because the safe-areas work a little differently in PWA mode than regular. *You do not need to do this since it is part of Native*:
```javascript
if (window.matchMedia('(display-mode: fullscreen)').matches) {
    document.body.style.setProperty('--tabBarHeight', 'calc(50px + 1.8rem)');
    document.body.style.setProperty('--tabBarPaddingBottom', '1.8rem');
}
```

## Native
I also developed Native while building this, and the biggest challenge was trying to get all the colours synced together, because the colour scheme is drastically different in light mode and dark mode. For instance the systemBackgroundColour and systemGroupedBackground colour are swapped around between the 2 appearances, and this may seem simple to fix, however it breaks a lot of components which uses those colours, and so I had to create a lot more CSS variables for different components.

Colour is one of the most important elements to make it seems like a Native app, and a lot of colours are just slightly different shades of white/grey/black, making it very hard to visually debug them.

## Previews
Anyways here are some previews of the main screen in light and dark mode:

<p float="left"> 
  <img src="Previews/MainLight.png?raw=true" width="350" />
  <img src="Previews/MainDark.png?raw=true" width="350" /> 
</p>

I also made a settings screen with a tableview to switch between the 2 appearances:

<p float="left">
  <img src="Previews/SettingsLight.png?raw=true" width="350" />
  <img src="Previews/SettingsDark.png?raw=true" width="350" /> 
</p>