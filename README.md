# [Slider](http://fengyuanchen.github.io/slider)

A jQuery slide plugin.

- [Documentation](http://fengyuanchen.github.io/slider)


# Getting started


## Installation

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<script src="/path/to/slider.js"></script>
```


## Usage

Initialize with `$.fn.slider` method

```javascript
$("#target").slider({
    activeClass: "slider-active", // for slide nav
    autoplay: true,
    contentClass: "slider-content",
    disableClass: "slider-disabled", // for slide "prev" and "next" button
    duration: 5000,
    effect: "fade",
    easing: "swing", // support "swing" and "linear", powered by jquery
    navClass: "slider-nav",
    nextClass: "slider-next",
    prevClass: "slider-prev",
    speed: 1000,
    trigger: "click" // for slide nav
});
```


## Options

Setup with `$("#target").slider(options)`, or global setup with `$.fn.slider.setDefaults(options)`.

#### activeClass

* type: string
* default: "slider-active"

A active state class for nav items.


#### autoplay

* type: boolean
* default: true

Auto play the slide after initialized.


#### contentClass

* type: string
* default: "slider-content"

The content container.


#### disableClass

* type: string
* default: "slider-disabled"

A disable state class for prev and next button.


#### duration

* type: number
* default: 5000

The duration milliseconds of each slide item.


#### effect

* type: string
* options: "fade", "scrollx", "scrolly"
* default: "fade"


#### easing

* type: string
* options: "swing", "linear"
* default: "swing"

Powered by jquery.


#### navClass

* type: string
* default: "slider-nav"

The navigation container.


#### prevClass

* type: string
* default: "slider-prev"

The prev button.


#### nextClass

* type: string
* default: "slider-next"

The next button.


#### speed

* type: number
* default: 1000

The speed of the animation.


#### trigger

* type: string
* default: "click"

The event of trigger sliding.


## Methods

* render - Render the slider
* start - Start the slider
* stop - Stop the slider
* enable - Enable the slider
* disable - Disable the slider

Usage example:

```javascript
$("#target").slider({
    autoplay: false
}).slider("start");
```


## Browser Support

- IE 6+
- Chrome 33+
- Firefox 27+
- Safari 5.1+
- Opera 19+

As a jQuery plugin, you can reference to the [jQuery Browser Support](http://jquery.com/browser-support/).


## [License](https://github.com/fengyuanchen/slider/blob/master/LICENSE.md)

Released under the [MIT](http://opensource.org/licenses/mit-license.html) license.
