/*!
 * Slider v0.1.0
 * https://github.com/fengyuanchen/slider
 *
 * Copyright (c) 2014-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-05-27T07:05:17.286Z
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define('slider', ['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

  'use strict';

  var NAMESPACE = 'slider';

  function isNumber(n) {
    return typeof n === 'number';
  }

  function isString(n) {
    return typeof n === 'string';
  }

  function isUndefined(n) {
    return typeof n === 'undefined';
  }

  function toArray(obj, offset) {
    var args = [];

    // This is necessary for IE8
    if (isNumber(offset)) {
      args.push(offset);
    }

    return args.slice.apply(obj, args);
  }

  function Slider(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Slider.DEFAULTS, $.isPlainObject(options) ? options : {});
    this.init();
  }

  Slider.prototype = {
    constructor: Slider,

    init: function () {
      var $this = this.$element;
      var options = this.options;
      var styles = {
            overflow: 'hidden'
          };

      this.$content = $this.find('.' + options.contentClass);
      this.$items = this.$content.children();

      this.$nav = $this.find('.' + options.navClass);
      this.$btns = this.$nav.children();

      this.$prev = $this.find('.' + options.prevClass);
      this.$next = $this.find('.' + options.nextClass);

      if ($this.css('position') === 'static') {
        styles.position = 'relative';
      }

      $this.css(styles);

      this.index = 0;
      this.length = 1;

      if (this.$items.length > 1) {
        this.render();
      }
    },

    render: function () {
      var $this = this.$element;
      var options = this.options;
      var firstItem = this.$items.first();

      firstItem.removeAttr('style');
      this.itemHeight = firstItem.height();
      this.itemWidth = firstItem.width();
      this.itemLength = this.$items.length;

      this.width = $this.width();
      this.height = $this.height();

      if (options.effect.toLowerCase() === 'scrollx') {
        this.scrollX();
      } else if (options.effect.toLowerCase() === 'scrolly') {
        this.scrollY();
      } else {
        this.fade();
      }

      this.firstIndexOflastView = this.itemLength - (this.itemLength % this.length || this.length);
      this.enable();

      if (options.autoPlay || options.autoplay) {
        this.start();
      }
    },

    rerender: function () {
      var $this = this.$element;

      if ($this.width() !== this.width || $this.height() !== this.height) {
        this.stop();
        this.render();
      }
    },

    fade: function () {

      if (this.$content.css('position') === 'static') {
        this.$content.css('position', 'relative');
      }

      this.$items.css({
        display: 'none',
        height: this.itemHeight,
        left: 0,
        position: 'absolute',
        top: 0,
        width: this.itemWidth
      }).first().show();

      this.sliding = function () {
        var speed = this.options.speed;
        var easing = this.options.easing;

        this.$items.stop(true).fadeOut(speed, easing).eq(this.index).fadeIn(speed, easing);
      };
    },

    scrollX: function () {
      this.length = Math.floor(this.width / this.itemWidth);

      this.$items.css({
        height: this.itemHeight,
        float: 'left',
        width: this.itemWidth
      });

      this.$content.css({
        height: this.itemHeight,
        left: 0,
        position: 'absolute',
        top: 0,
        width: this.itemWidth * (this.itemLength + 1)
      });

      this.sliding = function () {
        this.$content.stop(true).animate({
          left: -this.itemWidth * this.index
        }, this.options.speed, this.options.easing);
      };
    },

    scrollY: function () {
      this.length = Math.floor(this.height / this.itemHeight);

      this.$items.css({
        height: this.itemHeight,
        width: this.itemWidth
      });

      this.$content.css({
        height: this.itemHeight * (this.itemLength + 1),
        left: 0,
        position: 'absolute',
        top: 0
      });

      this.sliding = function () {
        this.$content.stop(true).animate({
          top: -this.itemHeight * this.index
        }, this.options.speed, this.options.easing);
      };
    },

    enable: function () {
      var that = this;

      if (this.active) {
        return;
      }

      this.active = true;

      this.$element.on({
        mouseover: $.proxy(this.stop, this),
        mouseout: $.proxy(this.start, this)
      });

      this.$btns.on(this.options.trigger, function () {
        that.index = $(this).index();
        that.slide();
      });

      this.$prev.on('click', $.proxy(this.prev, this));
      this.$next.on('click', $.proxy(this.next, this));

      $(window).on('resize', $.proxy(this.resize, this));
    },

    disable: function () {
      if (!this.active) {
        return;
      }

      this.active = false;
      this.stop();

      this.$element.off({
        mouseover: this.stop,
        mouseout: this.start
      });

      this.$btns.off(this.options.trigger);

      this.$prev.off('click', this.prev);
      this.$next.off('click', this.next);

      $(window).off('resize', this.resize);
    },

    resize: function () {
      if (this.resizing) {
        clearTimeout(this.resizing);
        this.resizing = null;
      }

      this.resizing = setTimeout($.proxy(this.rerender, this), 200);
    },

    start: function () {
      if (this.active && !this.autoSlided) {
        this.autoSlided = true;
        this.autoSliding = setInterval($.proxy(this.next, this), this.options.duration);
      }
    },

    stop: function () {
      if (this.autoSlided) {
        this.autoSlided = false;
        clearInterval(this.autoSliding);
      }
    },

    prev: function () {
      var prev = this.index - this.length;
      var index;

      if (prev < 0) {
        if (this.options.effect === 'fade') {
          index = this.firstIndexOflastView;
        } else {
          index = 0;
        }
      } else {
        index = prev;
      }

      this.index = index;
      this.slide();
    },

    next: function () {
      var next = this.index + this.length;
      var index;

      if (next <= this.firstIndexOflastView) {
        index = next;
      } else if (this.autoSlided || this.options.effect === 'fade') {
        index = 0;
      } else {
        index = this.firstIndexOflastView;
      }

      this.index = index;
      this.slide();
    },

    prevable: function () {
      var prevable = this.index > 0;

      this.$prev.toggleClass(this.options.disableClass, !prevable);

      return prevable;
    },

    nextable: function () {
      var nextable = this.index < this.firstIndexOflastView;

      this.$next.toggleClass(this.options.disableClass, !nextable);

      return nextable;
    },

    slide: function () {
      var activeClass = this.options.activeClass;
      var $target = this.$btns.eq(this.index);

      if (!$target.hasClass(activeClass)) {
        $target.addClass(activeClass).siblings().removeClass(activeClass);

        if (this.options.effect !== 'fade') {
          this.prevable();
          this.nextable();
        }

        this.sliding();
      }
    },

    sliding: $.noop,

    destroy: function () {
      this.disable();
      this.$element.removeData(NAMESPACE);
    }
  };

  // Default settings
  Slider.DEFAULTS = {
    activeClass: 'slider-active', // for slide nav
    autoPlay: true,
    contentClass: 'slider-content',
    disableClass: 'slider-disabled', // for slide 'prev btn' and 'next btn'
    duration: 5000,
    effect: 'fade',
    easing: 'swing', // support 'swing' and 'linear', powered by jquery
    navClass: 'slider-nav',
    nextClass: 'slider-next',
    prevClass: 'slider-prev',
    speed: 1000,
    trigger: 'click' // for slide nav
  };

  // Set default settings
  Slider.setDefaults = function (options) {
    $.extend(Slider.DEFAULTS, options);
  };

  // Save the other slider
  Slider.other = $.fn.slider;

  // Register as jQuery plugin
  $.fn.slider = function (options) {
    var args = toArray(arguments, 1);
    var result;

    this.each(function () {
      var $this = $(this);
      var data = $this.data(NAMESPACE);
      var fn;

      if (!data) {
        if (/destroy/.test(options)) {
          return;
        }

        $this.data(NAMESPACE, (data = new Slider(this, options)));
      }

      if (isString(options) && $.isFunction(fn = data[options])) {
        result = fn.apply(data, args);
      }
    });

    return isUndefined(result) ? this : result;
  };

  $.fn.slider.Constructor = Slider;
  $.fn.slider.setDefaults = Slider.setDefaults;

  // No conflict
  $.fn.slider.noConflict = function () {
    $.fn.slider = Slider.other;
    return this;
  };

  $(function () {
    $('[data-toggle="slider"]').slider();
  });
});
