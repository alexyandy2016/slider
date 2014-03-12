(function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function($) {
   
    "use strict";

    var $window = $(window),
        Slider = function(element, options) {
            options = $.isPlainObject(options) ? options : {};
            this.$element = $(element);
            this.defaults = $.extend({}, Slider.defaults, options);
            this.init();
            // console.log(this);
        };
    
    Slider.prototype = {
        constructor: Slider,

        init: function() {
            var $element = this.$element,
                defaults = this.defaults,
                styles = {
                    overflow: "hidden"
                };

            this.$content = $element.find("." + defaults.contentClass);
            this.$items = this.$content.children();

            this.$nav = $element.find("." + defaults.navClass);
            this.$btns = this.$nav.children();
            
            this.$prev = $element.find("." + defaults.prevClass);
            this.$next = $element.find("." + defaults.nextClass);

            if ($element.css("position") === "static") {
                styles.position = "relative";
            }

            $element.css(styles);

            this.index = 0;
            this.length = 1;

            if (this.$items.length > 1) {
                this.render();
            }
        },

        render: function() {
            var $element = this.$element,
                defaults = this.defaults,
                firstItem = this.$items.first();

            this.itemHeight = firstItem.height();
            this.itemWidth = firstItem.width();
            this.itemLength = this.$items.length;

            this.width = $element.width();
            this.height = $element.height();
            
            if (defaults.effect === "scrollx") {
                this.scrollX();
            } else if (defaults.effect === "scrolly") {
                this.scrollY();
            } else {
                this.fade();
            }

            this.firstIndexOflastView = this.itemLength - (this.itemLength % this.length || this.length);
            this.enable();

            if (defaults.autoplay) {
                this.start();
            }
        },

        fade: function() {
            
            if (this.$content.css("position") === "static") {
                this.$content.css("position", "relative");
            }

            this.$items.css({
                display: "none",
                height: this.itemHeight,
                left: 0,
                position: "absolute",
                top: 0,
                width: this.itemWidth
            }).first().show();

            this.sliding = function() {
                var speed = this.defaults.speed,
                    easing = this.defaults.easing;

                this.$items.stop(true).fadeOut(speed, easing).eq(this.index).fadeIn(speed, easing);
            };
        },

        scrollX: function() {
            this.length = Math.floor(this.width / this.itemWidth);

            this.$items.css({
                height: this.itemHeight,
                float: "left",
                width: this.itemWidth
            });

            this.$content.css({
                height: this.itemHeight,
                left: 0,
                position: "absolute",
                top: 0,
                width: this.itemWidth * (this.itemLength + 1)
            });

            this.sliding = function() {
                this.$content.stop(true).animate({
                    left: - this.itemWidth * this.index
                }, this.defaults.speed, this.defaults.easing);
            };
        },

        scrollY: function() {
            this.length = Math.floor(this.height / this.itemHeight);

            this.$items.css({
                height: this.itemHeight,
                width: this.itemWidth
            });

            this.$content.css({
                height: this.itemHeight * (this.itemLength + 1),
                left: 0,
                position: "absolute",
                top: 0
            });

            this.sliding = function() {
                this.$content.stop(true).animate({
                    top: - this.itemHeight * this.index
                }, this.defaults.speed, this.defaults.easing);
            };
        },

        enable: function() {
            var that = this;

            if (this.active) {
                return;
            }

            this.active = true;

            this.$nav.add(this.$prev).add(this.$next).on({
                mouseover: $.proxy(this.stop, this),
                mouseout: $.proxy(this.start, this)
            });

            this.$btns.on(this.defaults.trigger, function() {
                that.index = $(this).index();
                that.slide();
            });

            this.$prev.on("click", $.proxy(this.prev, this));
            this.$next.on("click", $.proxy(this.next, this));

            $window.on("resize", $.proxy(this.resize, this));
        },

        disable: function() {
            if (!this.active) {
                return;
            }

            this.active = false;
            this.stop();

            this.$nav.add(this.$prev).add(this.$next).off({
                mouseover: this.stop,
                mouseout: this.start
            });

            this.$btns.off(this.defaults.trigger);

            this.$prev.off("click", this.prev);
            this.$next.off("click", this.next);

            $window.off("resize", this.resize);
        },

        reRender: function() {
            var height = this.$element.height(),
                width = this.$element.width();

            if (height !== this.height || width !== this.width) {
                this.height = height;
                this.width = width;
                this.render();
            }
        },

        resize: function() {
            if (this.resizing) {
                clearTimeout(this.resizing);
                this.resizing = null;
            }

            this.resizing = setTimeout($.proxy(this.reRender, this), 200);
        },

        start: function() {
            if (this.active && !this.autoSlided) {
                this.autoSlided = true;
                this.autoSliding = setInterval($.proxy(this.next, this), this.defaults.duration);
            }
        },

        stop: function() {
            if (this.autoSlided) {
                this.autoSlided = false;
                clearInterval(this.autoSliding);
            }
        },

        prev: function() {
            var prev = this.index - this.length;

            this.index = prev < 0 ? 0 : prev;
            this.slide();
        },

        next: function() {
            var next = this.index + this.length;

            this.index = next <= this.firstIndexOflastView ? next : this.autoSlided ? 0 : this.firstIndexOflastView;
            this.slide();
        },

        prevable: function() {
            var prevable = this.index > 0;

            this.$prev.toggleClass(this.defaults.disableClass, !prevable);
            
            return prevable;
        },

        nextable: function() {
            var nextable = this.index < this.firstIndexOflastView;

            this.$next.toggleClass(this.defaults.disableClass, !nextable);
            
            return nextable;
        },

        slide: function() {
            var activeClass = this.defaults.activeClass,
                $target = this.$btns.eq(this.index);

            if (!$target.hasClass(activeClass)) {
                $target.addClass(activeClass).siblings().removeClass(activeClass);
                this.prevable();
                this.nextable();
                this.sliding();
            }
        },

        sliding: $.noop
    };

    // Default settings
    Slider.defaults = {
        activeClass: "slider-active", // for slide nav
        autoplay: true,
        contentClass: "slider-content",
        disableClass: "slider-disabled", // for slide "prev btn" and "next btn"
        duration: 5000,
        effect: "fade",
        easing: "swing", // support "swing" and "linear", powered by jquery
        navClass: "slider-nav",
        nextClass: "slider-next",
        prevClass: "slider-prev",
        speed: 1000,
        trigger: "click" // for slide nav
    };

    // Set default settings
    Slider.setDefaults = function(options) {
        $.extend(Slider.defaults, options);
    };

    // Register as jQuery plugin
    $.fn.slider = function(options) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("slider");
            
            if (!data) {
                data = new Slider(this, options);
                $this.data("slider", data);
            }
            
            if (typeof options === "string" && $.isFunction(data[options])) {
                data[options]();
            }
        });
    };

    $.fn.slider.Constructor = Slider;
    $.fn.slider.setDefaults = Slider.setDefaults;

    // Initialize on DOM ready
    $(function() {
        $("[slider]").slider();
    });
    
}));