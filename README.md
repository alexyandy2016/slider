# [Slider](https://github.com/fengyuanchen/slider)

A simple jQuery slide plugin.

- [Demo](https://fengyuanchen.github.io/slider)



## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Options](#options)
- [Methods](#methods)
- [No conflict](#no-conflict)
- [Browser support](#browser-support)
- [Versioning](#versioning)
- [License](#license)



## Main

```
dist/
├── slider.js     (9 KB)
└── slider.min.js (6 KB)
```



## Getting started

### Quick start

Three quick start options are available:

- [Download the latest release](https://github.com/fengyuanchen/slider/archive/master.zip).
- Clone the repository: `git clone https://github.com/fengyuanchen/slider.git`.
- Install with [NPM](http://npmjs.org): `npm install @fengyuanchen/slider`.


### Installation

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<script src="/path/to/slider.js"></script>
```


### Usage

Initialize with `$.fn.slider` method.

```js
$('#slider').slider({
  activeClass: 'slider-active', // for slide nav
  autoPlay: true,
  contentClass: 'slider-content',
  disableClass: 'slider-disabled', // for slide "prev" and "next" button
  duration: 5000,
  effect: 'fade',
  easing: 'swing', // support "swing" and "linear", powered by jQuery
  navClass: 'slider-nav',
  nextClass: 'slider-next',
  prevClass: 'slider-prev',
  speed: 1000,
  trigger: 'click' // for slide nav
});
```

[⬆ back to top](#table-of-contents)



## Options

```js
// Set slider options
$().slider(options);

// Set the global default options
$.fn.slider.setDefaults(options);
```

### activeClass

- Type: `String`
- Default: `'slider-active'`

An active state class for nav items.


### autoPlay

- Type: `Boolean`
- Default: `true`

Auto play the slide after initialized.


### contentClass

- Type: `String`
- Default: `'slider-content'`

The content container.


### disableClass

- Type: `String`
- Default: `'slider-disabled'`

A disable state class for previous and next button.


### duration

- Type: `Number`
- Default: `5000`

The duration milliseconds of each slide item.


### effect

- Type: `String`
- Options: `'fade'`, `'scrollX'`, `'scrollY'`
- Default: `'fade'`


### easing

- Type: `String`
- Options: `'swing'`, `'linear'`
- Default: `'swing'`

Powered by jQuery.


### navClass

- Type: `String`
- Default: `'slider-nav'`

The navigation container.


### prevClass

- Type: `String`
- Default: `'slider-prev'`

The previous button.


### nextClass

- Type: `String`
- Default: `'slider-next'`

The next button.


### speed

- Type: `Number`
- Default: `1000`

The speed of the animation.


### trigger

- Type: `String`
- Default: `'click'`

The event for triggering slide.


[⬆ back to top](#table-of-contents)



## Methods

### render()

Render the slider.


### start()

Start the slider.

```js
$().slider({
  autoPlay: false
}).slider('start');
```


### stop()

stop the slider.


### enable()

Enable the slider.


### disable()

Disable the slider.


### destroy()

Destroy the slider.


[⬆ back to top](#table-of-contents)



## No conflict

If you have to use other plugin with the same namespace, just call the `$.fn.slider.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="slider.js"></script>
<script>
  $.fn.slider.noConflict();
  // Code that uses other plugin's "$().slider" can follow here.
</script>
```



## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 8+

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).



## Versioning

Maintained under the [Semantic Versioning guidelines](http://semver.org/).



## License

[MIT](http://opensource.org/licenses/MIT) © [Fengyuan Chen](http://chenfengyuan.com)


[⬆ back to top](#table-of-contents)
