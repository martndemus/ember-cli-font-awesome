# ember-font-awesome
[![npm version](https://badge.fury.io/js/ember-font-awesome.svg)](http://badge.fury.io/js/ember-font-awesome)
[![Build Status](https://travis-ci.org/martndemus/ember-font-awesome.svg?branch=master)](https://travis-ci.org/martndemus/ember-font-awesome)
[![Ember Observer Score](http://emberobserver.com/badges/ember-font-awesome.svg)](http://emberobserver.com/addons/ember-font-awesome)

An [ember-cli](http://www.ember-cli.com) addon for using
[Font Awesome](http://fortawesome.github.io/Font-Awesome/) icons in Ember
applications.

__WARNING__: _Please verify that you are reading the README corresponding with
the version of `ember-font-awesome` you are using._

## Table of Contents

* [Ember Version Compatibility](#ember-version-compatibility)
* [Installing the Add-on](#installing-the-add-on)
* [Using the Add-on](#using-the-add-on)
* [Customize with Sass/Scss or Less](#customize-with-sassscss-or-less)
* [Excluding assets](#excluding-assets)

### Ember Version Compatibility

Please consult the table to check which version of `ember-font-awesome` you
should use:

Addon version         | Ember version | Addon name
----------------------|---------------|-----------------------
`>= 2.0.0`, `< 3.0.0` | `>= 2.3.0`    | `ember-font-awesome`
`>= 1.0.0`, `< 2.0.0` | `>= 1.11.0`   | `ember-cli-font-awesome`
`>= 0.1.0`, `< 1.0.0` | `>= 1.13.0`   | `ember-cli-font-awesome`
`0.0.9`               | `< 1.11.0`    | `ember-cli-font-awesome`

### Installing the Add-on

In your application's directory:
```bash
$ ember install ember-font-awesome
```

If you have manually installed or updated the addon via NPM then you should also
run:
```bash
$ ember generate ember-font-awesome
```

### Using the Add-on

Use the component in your Handlebars templates:

```hbs
{{fa-icon "camera"}}
```

This will render:
```html
<i class="fa fa-camera"></i>
```

To see which icons are available please check the
[complete list of Font Awesome icons](http://fortawesome.github.io/Font-Awesome/icons/)

The [Font Awesome examples](http://fortawesome.github.io/Font-Awesome/examples/)
illustrate the various options and their effects. It should be fairly simple to
map these options to their `{{fa-icon}}` counterparts.

#### Larger Icons

```hbs
{{fa-icon "star" size="lg"}}
{{fa-icon "star" size=2}}
{{fa-icon "star" size=3}}
{{fa-icon "star" size=4}}
{{fa-icon "star" size=5}}
```

#### Fixed Width Icons

```hbs
<div class="list-group">
  <a class="list-group-item" href="#">
    {{fa-icon "home" fixedWidth=true}} Home
  </a>
  <a class="list-group-item" href="#">
    {{fa-icon "book" fixedWidth=true}} Library
  </a>
</div>
```

#### List Icons

```hbs
{{#fa-list as |l|}}
  <li>{{l.fa-icon "check-square"}}List icons</li>
  <li>{{l.fa-icon "check-square"}}can be used</li>
  <li>{{l.fa-icon "spinner" spin=true}}as bullets</li>
  <li>{{l.fa-icon "square"}}in lists</li>
{{/fa-list}}
```

#### Bordered & Pulled Icons

```hbs
<p>
{{fa-icon "quote-left" pull="left" border=true}}
...tomorrow we will run faster, stretch out our arms farther...
And then one fine morning— So we beat on, boats against the
current, borne back ceaselessly into the past.
</p>
```

#### Animated Icons

```hbs
{{fa-icon "spinner" spin=true}}
{{fa-icon "circle-o-notch" spin=true}}
{{fa-icon "refresh" spin=true}}
{{fa-icon "cog" spin=true}}
{{fa-icon "spinner" pulse=true}}
```

#### Rotate & Flipped

```hbs
{{fa-icon "shield"}} normal
{{fa-icon "shield" rotate=90}} rotated 90 degrees
{{fa-icon "shield" rotate=180}} rotated 180 degrees
{{fa-icon "shield" rotate=270}} rotated 270 degrees
{{fa-icon "shield" flip="horizontal"}} flipped horizontal
{{fa-icon "shield" flip="vertical"}} flipped vertical
```

#### Stacked Icons

```hbs
{{#fa-stack size="lg" as |s|}}
  {{s.stack-2x "square-o"}}
  {{s.stack-1x "twitter"}}
{{/fa-stack}}

{{#fa-stack size="lg" as |s|}}
  {{s.stack-2x "circle"}}
  {{s.stack-1x "flag" inverse=true}}
{{/fa-stack}}

{{#fa-stack size="lg" as |s|}}
  {{s.stack-2x "square"}}
  {{s.stack-1x "terminal" inverse=true}}
{{/fa-stack}}

{{#fa-stack size="lg" as |s|}}
  {{s.stack-2x "square"}}
  {{s.stack-1x "terminal" class="text-danger"}}
{{/fa-stack}}
```

#### The `aria-hidden` Attribute

To better support accessibility (i.e. screen readers), the helper adds the
`aria-hidden` attribute by default:

```hbs
{{fa-icon "star"}}
```

Results in:
```html
<i class="fa fa-star" aria-hidden="true"></i>
```

To remove the `aria-hidden` attribute:

```hbs
{{fa-icon "star" ariaHidden=false}}
```

#### Actions

You can respond to actions on the icon by passing on action handlers:

```hbs
{{fa-icon "star" click=(action "myClickHandler")}}
```

#### Tag Name

Use `tagName` to control the generated markup:

```hbs
{{fa-icon "star" tagName="span"}}
```
Results in:

```html
<span class="fa fa-star"></span>
```

#### Custom Class Names

```hbs
{{fa-icon "bicycle" class="my-custom-class"}}
```

Results in:

```html
<i class="fa fa-bicycle my-custom-class"></i>
```

#### Title attribute

```hbs
{{fa-icon "edit" title="Edit the item"}}
```

Results in:

```html
<i class="fa fa-edit" title="Edit the item"></i>
```

### Customize with Sass/Scss or Less

If you are using the ember-cli-sass or ember-cli-less addon, you can opt-in to
the Scss or Less version of font-awesome by adding the following configuration
in `ember-cli-build.js`:

```js
var app = new EmberApp({
  'ember-font-awesome': {
    useScss: true, // for ember-cli-sass
    useLess: true  // for ember-cli-less
  }
});
```

Then in your `app.scss` or `app.less`:

```scss
@import "font-awesome";
```

### Excluding assets

You can configure the addon to _not_ import any assets (CSS or font files) by adding
the following configuration in `ember-cli-build.js`:

```js
var app = new EmberApp({
  'ember-font-awesome': {
    includeFontAwesomeAssets: false
  }
});
```

In addition, you can configure the addon to _just_ exclude the font file assets by adding
the following configuration in `ember-cli-build.js`:

```js
var app = new EmberApp({
  'ember-font-awesome': {
    includeFontFiles: false
  }
});
```

### Output path

You can change the directory where the fonts are copied to using the following configuration:

```js
var app = new EmberApp({
  'ember-font-awesome': {
    fontsOutput: "/some/dir/"
  }
});
```

This is useful when you change the output paths for your ember app. By default, ember-font-awesome copies the font files to `/dist/fonts`. The addon produces a css file to load the fonts that will be included in the vendor css file and expect to find the fonts at `../fonts`. If the css directory is not at the same level as the fonts directory, the site won't load the fonts.

For example, moving the css directory to `/dist/assets/css` would require the fonts directory to be `/dist/assets/fonts` and the configuration would look like this:

```js
var app = new EmberApp({
    outputPaths: {
        app: {
            css: {
                  app: "/assets/css/app-name.css",
            },
            js: "/assets/js/app-name.js",
        },

        vendor: {
            css: "/assets/css/vendor.css",
            js: "/assets/js/vendor.js",
        },
    },
    'ember-font-awesome': {
        fontsOutput: "/assets/fonts"
    }
});
```

## License

[Public Domain](UNLICENSE)
