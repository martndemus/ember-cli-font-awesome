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
`>= 4.0.0`, `< 5.0.0` | `>= 2.10.0`   | `ember-font-awesome`
`>= 2.0.0`, `< 4.0.0` | `>= 2.3.0`    | `ember-font-awesome`
`>= 1.0.0`, `< 2.0.0` | `>= 1.11.0`   | `ember-cli-font-awesome`
`>= 0.1.0`, `< 1.0.0` | `>= 1.13.0`   | `ember-cli-font-awesome`
`0.0.9`               | `< 1.11.0`    | `ember-cli-font-awesome`

### V4.0.0-alpha, important notes

The version 4.0.0 of this addon introduces an entirely new approach in which the addon contains no components and has 0 runtime overhead. Instead, all usages of `{{fa-icon}}`,
`{{fa-list}}` and `{{fa-stack}}` are transformed into the right markup in compile-time.

To achieve this we had to make the component a bit more constrained so it can be compiled
statically. There is a few (edge) cases that we had to drop to achieve that:

- `{{fa-icon tagName=boundValue}}`. You cannot pass a bound value to the tag name (you still can pass a fixed value like `{{fa-icon tagName="span"}}`)
- Previously both `{{fa-icon "credit-card"}}` and `{{fa-icon "fa-credit-card"}}` were valid invocations. Now only the first one is. You should not include the `fa-` prefix on the icon names.
- Previously both `{{fa-icon size="2"}}` and `{{fa-icon size="2x"}}` were valid sizes. Now only the first one is, you cannot pass a string ending in `x`.
- It requires a Glimmer2 version of Ember (2.10 or bigger)
- **It requires node >= 6** (working on making it 4.5+ soon)
- If you use this addon from within another addon, you have to move it from `devDependencies` to `dependencies` in your `package.json`.
- If you want to ensure the AST transforms of this addon are not being cached, you can pass a `EMBER_CLI_FONT_AWESOME_DISABLE_CACHE=true`
  environment variable to `ember build`

In return you get a an addon with 0 runtime overhead, that ships 0 bytes of javascript code
and (optionally) removes the CSS of unused icons in production, yielding to even more saved bytes.

**NOTE**: If your addon is using `ember-try` to test against versions of ember lower than 2.10, you will need to make some adjustments.
- Specify `ember-font-awesome` as a `peerDependency` in your addon's `ember-try`, using the correct version number according to the table above.
- Specify `null` as the value for `ember-font-awesome` in the `dependencies` key for that older version of ember under test, otherwise the test build will not use the version specified as a `peerDependency`

```node
// config/ember-try.js
module.exports = {
  scenarios: [
    {
      name: 'ember-lts-2.8',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-8'
        },
        resolutions: {
          'ember': 'lts-2-8'
        }
      },
      npm: {
        dependencies: {
          'ember-font-awesome': null // <---
        },
        peerDependencies: {
          'ember-font-awesome': '^3.0.0' // <---
        },
        devDependencies: {
          'ember-source': null
        }
      }
    },
    ... // other scenarios
  ]
};
```

### Installing the Add-on

In your application's directory:
```bash
$ ember install ember-font-awesome
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

## :sos: Looking for Help?

- :warning: **Bug reports**: If your bug hasn't been reported yet, please [**open an issue**][new-issue]. Try to pick a short but descriptive title. Make sure you're using the latest version of *ember-font-awesome*. In the issue body, try to provide exact steps for reproduction, ideally with example code. If you can't, please include any and all error messages, as many details as possible and exact information on which Ember.js / ember-cli version and browser / OS you're using.
- ![Slack Icon](https://i.imgur.com/Bjckhpc.png) **Slack**: We're happy to help you in our [**#e-font-awesome**][slack] Slack channel! You can [create an Ember Community Slack account][slackin] here for free.


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

#### The `aria-label` Attribute

To better support accessibility (i.e. screen readers), the helper adds an
optional `aria-label` attribute:

```hbs
{{fa-icon "star" ariaLabel="Click Me"}}
```

Results in:
```html
<i class="fa fa-star" aria-label="Click Me"></i>
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

You can also configure the addon to _only_ import specific font formats by adding
the following configuration in `ember-cli-build.js`:

**Default:** `['eot', 'svg', 'ttf', 'woff', 'woff2', 'otf']`

```js
var app = new EmberApp({
  'ember-font-awesome': {
    fontFormats: ['woff', 'woff2']
  }
});
```

In addition, you can configure the addon to exclude the font file assets entirely by adding
the following configuration in `ember-cli-build.js`:

```js
var app = new EmberApp({
  'ember-font-awesome': {
    includeFontFiles: false
  }
});
```

### Remove unused icons

This addon includes an experimental functionality to detect the used icons and remove the ones you don't use.
By default this feature is disabled, but you enabled when `environment` is `'production'` by doing:

```js
var app = new EmberApp({
  'ember-font-awesome': {
    removeUnusedIcons: EmberApp.env() === 'production' // The addon will remove unused icons in production
  }
});
```

### Including specific icons

By default this addon detects which icons are used based on the invocation parameters of `{{fa-icon}}`,
and removes the rest, but you can whitelist in `ember-cli-build.js` some specific icons to be always
included regardless of if they are used or not:

```js
var app = new EmberApp({
  'ember-font-awesome': {
    includeStaticIcons: ['sort'],
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

[slack]: https://embercommunity.slack.com/messages/C6UMSLS74/
[slackin]: https://ember-community-slackin.herokuapp.com/
[new-issue]: https://github.com/martndemus/ember-font-awesome/issues/new
