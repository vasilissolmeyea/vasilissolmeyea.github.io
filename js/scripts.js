/*!
    * Start Bootstrap - Agency v6.0.0 (https://startbootstrap.com/template-overviews/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-agency/blob/master/LICENSE)
    */
    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

    class InfiniteSlider {
    constructor(animTime = '10000', selector = '.slider', container = '#slider-container') {
        this.slider = document.querySelector(selector)
        this.container = document.querySelector(container)
        this.width = 0
        this.oldWidth = 0
        this.duration = parseInt(animTime)
        this.start = 0
        this.refresh = 0 //0, 1, or 2, as in steps of the animation
        this._prevStop = false
        this._stop = false
        this._oldTimestamp = 0
    }
    
    animate() {
        /* fix for browsers who like to run JS before images are loaded */
        const imgs = Array.prototype.slice.call(this.slider.querySelectorAll('img'))
                        .filter(img => {
                            return img.naturalWidth === 0
                        })
        if (imgs.length > 0) {
            window.requestAnimationFrame(this.animate.bind(this));
            return
        }team
        
        /* Add another copy of the slideshow to the end, keep track of original width */
        this.oldWidth = this.slider.offsetWidth
        const sliderText = '<span class="slider-extra">' + this.slider.innerHTML + '</span>'
        this.slider.innerHTML += sliderText

        /* can have content still when we move past original slider */
        this.width = this.slider.offsetWidth
        const minWidth = 2 * screen.width

        /* Add more slideshows if needed to keep a continuous stream of content */
        while (this.width < minWidth) {
            this.slider.innerHTML += sliderText
            this.width = this.slider.width
        }
        this.slider.querySelector('.slider-extra:last-child').classList.add('slider-last')
        
        /* loop animation endlesssly (this is pretty cool) */
        window.requestAnimationFrame(this.controlAnimation.bind(this))
    }
    
    halt() {
        this._stop = true
        this._prevStop = false
    }
    
    go() {
        this._stop = false
        this._prevStop = true
    }
    
    stagnate() {
        this.container.style.overflowX = "scroll"
    }
    
    controlAnimation(timestamp) {
        //console.log('this.stop: ' + this._stop + '\nthis.prevStop: ' + this._prevStop)
        if (this._stop === true) {
            if (this._prevStop === false) {
                this.slider.style.marginLeft = getComputedStyle(this.slider).marginLeft
                this._prevStop = true
                this._oldTimestamp = timestamp
            }
        } else if (this._stop === false && this._prevStop === true) {
            this._prevStop = false
            this.start = this.start + (timestamp - this._oldTimestamp)
        } else {
            //reset animation
            if (this.refresh >= 1) {
                this.start = timestamp
                this.slider.style.marginLeft = 0
                this.refresh = 0
                window.requestAnimationFrame(this.controlAnimation.bind(this))
                return
            }
            if (timestamp - this.start >= this.duration) {
                this.refresh = 1
            }
            
            const perc = ((timestamp - (this.start)) / this.duration) * this.oldWidth
            this.slider.style.marginLeft = (-perc) + 'px'
        }
        window.requestAnimationFrame(this.controlAnimation.bind(this))
        return
    }
    
    getIeWidth() {
        this.slider.style.marginLeft = '-99999px';
    }
    
    ie11Fix() {
        this.slider.querySelector('.slider-last').style.position = 'absolute';
    }
}

function detectIE() {
    var ua = window.navigator.userAgent
    var msie = ua.indexOf('MSIE ')

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
    }
    
    var trident = ua.indexOf('Trident/')
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:')
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
    }

    // other browser
    return false
}


document.addEventListener('DOMContentLoaded', function() {
    const slider = new InfiniteSlider(20000)
    const ie = detectIE()
    
    //Dont animate under IE10, just place the images
    if (ie !== false && ie < 10) {
        slider.stagnate()
        return
    }
    //IE 11 and lower, fix for width *increasing* as more of the slider is shown
    if (ie !== false && ie < 12) { slider.getIeWidth() }
    
    slider.animate()
    document.querySelector('#slider-container')
        .addEventListener('mouseenter', slider.halt.bind(slider))
    document.querySelector('#slider-container')
        .addEventListener('mouseleave', slider.go.bind(slider))
    
    if (ie === 11) {
        setTimeout(slider.ie11Fix.bind(slider), 1000)
    }
});

    class InfiniteSlider2 {
    constructor(animTime = '10000', selector = '.slider2', container = '#slider-container-2') {
        this.slider2 = document.querySelector(selector)
        this.container = document.querySelector(container)
        this.width = 0
        this.oldWidth = 0
        this.duration = parseInt(animTime)
        this.start = 0
        this.refresh = 0 //0, 1, or 2, as in steps of the animation
        this._prevStop = false
        this._stop = false
        this._oldTimestamp = 0
    }
    
    animate() {
        /* fix for browsers who like to run JS before images are loaded */
        const imgs = Array.prototype.slice.call(this.slider2.querySelectorAll('img'))
                        .filter(img => {
                            return img.naturalWidth === 0
                        })
        if (imgs.length > 0) {
            window.requestAnimationFrame(this.animate.bind(this));
            return
        }
        
        /* Add another copy of the slideshow to the end, keep track of original width */
        this.oldWidth = this.slider2.offsetWidth
        const slider2Text = '<span class="slider2-extra">' + this.slider2.innerHTML + '</span>'
        this.slider2.innerHTML += slider2Text

        /* can have content still when we move past original slider */
        this.width = this.slider2.offsetWidth
        const minWidth = 2 * screen.width

        /* Add more slideshows if needed to keep a continuous stream of content */
        while (this.width < minWidth) {
            this.slider2.innerHTML += slider2Text
            this.width = this.slider2.width
        }
        this.slider2.querySelector('.slider2-extra:last-child').classList.add('slider2-last')
        
        /* loop animation endlesssly (this is pretty cool) */
        window.requestAnimationFrame(this.controlAnimation.bind(this))
    }
    
    halt() {
        this._stop = true
        this._prevStop = false
    }
    
    go() {
        this._stop = false
        this._prevStop = true
    }
    
    stagnate() {
        this.container.style.overflowX = "scroll"
    }
    
    controlAnimation(timestamp) {
        //console.log('this.stop: ' + this._stop + '\nthis.prevStop: ' + this._prevStop)
        if (this._stop === true) {
            if (this._prevStop === false) {
                this.slider2.style.marginLeft = getComputedStyle(this.slider2).marginLeft
                this._prevStop = true
                this._oldTimestamp = timestamp
            }
        } else if (this._stop === false && this._prevStop === true) {
            this._prevStop = false
            this.start = this.start + (timestamp - this._oldTimestamp)
        } else {
            //reset animation
            if (this.refresh >= 1) {
                this.start = timestamp
                this.slider2.style.marginLeft = 0
                this.refresh = 0
                window.requestAnimationFrame(this.controlAnimation.bind(this))
                return
            }
            if (timestamp - this.start >= this.duration) {
                this.refresh = 1
            }
            
            const perc = ((timestamp - (this.start)) / this.duration) * this.oldWidth
            this.slider2.style.marginLeft = (-perc) + 'px'
        }
        window.requestAnimationFrame(this.controlAnimation.bind(this))
        return
    }
    
    getIeWidth() {
        this.slider2.style.marginLeft = '+99999px';
    }
    
    ie11Fix() {
        this.slider2.querySelector('.slider2-last').style.position = 'absolute';
    }
}

function detectIE() {
    var ua = window.navigator.userAgent
    var msie = ua.indexOf('MSIE ')

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
    }
    
    var trident = ua.indexOf('Trident/')
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:')
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
    }

    // other browser
    return false
}


document.addEventListener('DOMContentLoaded', function() {
    const slider2 = new InfiniteSlider2(8500)
    const ie = detectIE()
    
    //Dont animate under IE10, just place the images
    if (ie !== false && ie < 10) {
        slider2.stagnate()
        return
    }
    //IE 11 and lower, fix for width *increasing* as more of the slider is shown
    if (ie !== false && ie < 12) { slider2.getIeWidth() }
    
    slider2.animate()
    document.querySelector('#slider2-container')
        .addEventListener('mouseenter', slider2.halt.bind(slider2))
    document.querySelector('#slider2-container')
        .addEventListener('mouseleave', slider2.go.bind(slider2))
    
    if (ie === 11) {
        setTimeout(slider2.ie11Fix.bind(slider2), 1000)
    }
});


    class InfiniteSlider3 {
    constructor(animTime = '10000', selector = '.slider3', container = '#slider-container-3') {
        this.slider3 = document.querySelector(selector)
        this.container = document.querySelector(container)
        this.width = 0
        this.oldWidth = 0
        this.duration = parseInt(animTime)
        this.start = 0
        this.refresh = 0 //0, 1, or 2, as in steps of the animation
        this._prevStop = false
        this._stop = false
        this._oldTimestamp = 0
    }
    
    animate() {
        /* fix for browsers who like to run JS before images are loaded */
        const imgs = Array.prototype.slice.call(this.slider3.querySelectorAll('img'))
                        .filter(img => {
                            return img.naturalWidth === 0
                        })
        if (imgs.length > 0) {
            window.requestAnimationFrame(this.animate.bind(this));
            return
        }
        
        /* Add another copy of the slideshow to the end, keep track of original width */
        this.oldWidth = this.slider3.offsetWidth
        const slider3Text = '<span class="slider3-extra">' + this.slider3.innerHTML + '</span>'
        this.slider3.innerHTML += slider3Text

        /* can have content still when we move past original slider */
        this.width = this.slider3.offsetWidth
        const minWidth = 2 * screen.width

        /* Add more slideshows if needed to keep a continuous stream of content */
        while (this.width < minWidth) {
            this.slider3.innerHTML += slider3Text
            this.width = this.slider3.width
        }
        this.slider3.querySelector('.slider3-extra:last-child').classList.add('slider3-last')
        
        /* loop animation endlesssly (this is pretty cool) */
        window.requestAnimationFrame(this.controlAnimation.bind(this))
    }
    
    halt() {
        this._stop = true
        this._prevStop = false
    }
    
    go() {
        this._stop = false
        this._prevStop = true
    }
    
    stagnate() {
        this.container.style.overflowX = "scroll"
    }
    
    controlAnimation(timestamp) {
        //console.log('this.stop: ' + this._stop + '\nthis.prevStop: ' + this._prevStop)
        if (this._stop === true) {
            if (this._prevStop === false) {
                this.slider3.style.marginLeft = getComputedStyle(this.slider3).marginLeft
                this._prevStop = true
                this._oldTimestamp = timestamp
            }
        } else if (this._stop === false && this._prevStop === true) {
            this._prevStop = false
            this.start = this.start + (timestamp - this._oldTimestamp)
        } else {
            //reset animation
            if (this.refresh >= 1) {
                this.start = timestamp
                this.slider3.style.marginLeft = 0
                this.refresh = 0
                window.requestAnimationFrame(this.controlAnimation.bind(this))
                return
            }
            if (timestamp - this.start >= this.duration) {
                this.refresh = 1
            }
            
            const perc = ((timestamp - (this.start)) / this.duration) * this.oldWidth
            this.slider3.style.marginLeft = (-perc) + 'px'
        }
        window.requestAnimationFrame(this.controlAnimation.bind(this))
        return
    }
    
    getIeWidth() {
        this.slider3.style.marginLeft = '-99999px';
    }
    
    ie11Fix() {
        this.slider3.querySelector('.slider3-last').style.position = 'absolute';
    }
}

function detectIE() {
    var ua = window.navigator.userAgent
    var msie = ua.indexOf('MSIE ')

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
    }
    
    var trident = ua.indexOf('Trident/')
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:')
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
    }

    // other browser
    return false
}


document.addEventListener('DOMContentLoaded', function() {
    const slider3 = new InfiniteSlider3(20000)
    const ie = detectIE()
    
    //Dont animate under IE10, just place the images
    if (ie !== false && ie < 10) {
        slider3.stagnate()
        return
    }
    //IE 11 and lower, fix for width *increasing* as more of the slider is shown
    if (ie !== false && ie < 12) { slider3.getIeWidth() }
    
    slider3.animate()
    document.querySelector('#slider3-container')
        .addEventListener('mouseenter', slider3.halt.bind(slider3))
    document.querySelector('#slider3-container')
        .addEventListener('mouseleave', slider3.go.bind(slider3))
    
    if (ie === 11) {
        setTimeout(slider3.ie11Fix.bind(slider3), 1000)
    }
});

window.addEventListener("scroll", stickMenu);

function stickMenu(){
  var scrollY = window.pageYOffset;
 
  if(scrollY>0){
      document.getElementById("sticky").classList.add('shrink');
  }
  if(scrollY<=0 && document.getElementById("sticky").classList.contains('shrink')){
    document.getElementById("sticky").classList.toggle('shrink');
  }
} 

jQuery(function($) {
  
  // Function which adds the 'animated' class to any '.animatable' in view
  var doAnimations = function() {
    
    // Calc current offset and get all animatables
    var offset = $(window).scrollTop() + $(window).height(),
        $animatables = $('.animatable');
    
    // Unbind scroll handler if we have no animatables
    if ($animatables.length == 0) {
      $(window).off('scroll', doAnimations);
    }
    
    // Check all animatables and animate them if necessary
        $animatables.each(function(i) {
       var $animatable = $(this);
            if (($animatable.offset().top + $animatable.height() - 20) < offset) {
        $animatable.removeClass('animatable').addClass('animated');
            }
    });

    };
  
  // Hook doAnimations on scroll, and trigger a scroll
    $(window).on('scroll', doAnimations);
  $(window).trigger('scroll');

});

$(document).ready(function() {
    
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.fade').each( function(i){
            
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},900);
                    
            }
            
        }); 
    
    });
    
});

var loader;

function loadNow(opacity) {
    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        window.setTimeout(function() {
            loadNow(opacity - 0.05);
        }, 50);
    }
}

function displayContent() {
    loader.style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
    loader = document.getElementById('loader');
    loadNow(6.5);
});
