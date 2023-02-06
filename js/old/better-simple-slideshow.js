var makeBSS = function (el, options) {
    var $slideshows = document.querySelectorAll(el), // a collection of all of the slideshow
        $slideshow = {},
        Slideshow = {
            init: function (el, options) {
                this.counter = 0; // to keep track of current slide
                this.el = el; // current slideshow container
                this.$items = el.querySelectorAll('figure'); // a collection of all of the slides, caching for performance
                this.numItems = this.$items.length; // total number of slides
                options = options || {}; // if options object not passed in, then set to empty object
                options.auto = options.auto || false; // if options.auto object not passed in, then set to false
                this.opts = {
                    auto: (typeof options.auto === "undefined") ? false : options.auto,
                    speed: (typeof options.auto.speed === "undefined") ? 1500 : options.auto.speed,
                    pauseOnHover: (typeof options.auto.pauseOnHover === "undefined") ? false : options.auto.pauseOnHover,
                    fullScreen: (typeof options.fullScreen === "undefined") ? false : options.fullScreen,
                    swipe: (typeof options.swipe === "undefined") ? false : options.swipe
                };
                this.bullet_inactive = "&#9675;"; //"&#9676;"
                this.bullet_active = "&#9679;"; //"&#9673;";

                this.$items[0].classList.add('bss-show'); // add show class to first figure
                this.injectControls(el);
                this.addEventListeners(el);
                if (this.opts.auto) {
                    this.autoCycle(this.el, this.opts.speed, this.opts.pauseOnHover);
                }
                if (this.opts.fullScreen) {
                    this.addFullScreen(this.el);
                }
                if (this.opts.swipe) {
                    this.addSwipe(this.el);
                }
            },
            incrCounter: function (i) {
                // increment or decrement this.counter depending on whether i === 1 or i === -1
                if (i > 0) {
                    this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
                } else {
                    this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
                }
                this.showCurrent();
            },
            setCounter: function (i) {
                // increment or decrement this.counter depending on whether i === 1 or i === -1
                if (i >= 0 && i < this.numItems) {
                    this.counter = i;
                } else {
                    this.counter = 0;
                }
                this.showCurrent();
            },
            showCurrent: function () {
                // remove .show from whichever element currently has it
                // http://stackoverflow.com/a/16053538/2006057
                [].forEach.call(this.$items, function (el) {
                    el.classList.remove('bss-show');
                });
                // add .show to the one item that's supposed to have it
                this.$items[this.counter].classList.add('bss-show');
                // set status of bullets to (in)active
                for (i = 0; i < this.numItems; i++ ) {
                    if (i == this.counter) {
                        this.bullets[i].innerHTML = this.bullet_active;
                    } else {
                        this.bullets[i].innerHTML = this.bullet_inactive;
                    }
                }

            },
            injectControls: function (el) {
            // build and inject prev/next controls
                if (this.numItems > 1) {
                    // first create all the new elements
                    var spanPrev = document.createElement("span"),
                        spanNext = document.createElement("span"),
                        spanBullets = document.createElement("span"),
                        docFrag = document.createDocumentFragment();

                    // add classes
                    spanPrev.classList.add('bss-prev');
                    spanNext.classList.add('bss-next');
                    spanBullets.classList.add('bss-bullets');

                    // add contents
                    spanPrev.innerHTML = "&#10216;"; //"&#12296;"; //'&laquo;';
                    spanNext.innerHTML = "&#10217;"; //"&#12297;"; //'&raquo;';
                    // add bullet list
                    for (i = 0; i < this.numItems; i++) {
                        var tmp = document.createElement("span");
                        tmp.classList.add('bss-bullets-el');
                        tmp.id = i;
                        if (i == 0) {
                          tmp.innerHTML = this.bullet_active;
                        } else {
                          tmp.innerHTML = this.bullet_inactive;
                        }
                        spanBullets.appendChild(tmp);
                    }

                    // append elements to fragment, then append fragment to DOM
                    docFrag.appendChild(spanPrev);
                    docFrag.appendChild(spanNext);
                    docFrag.appendChild(spanBullets);
                    el.appendChild(docFrag);

                    this.bullets = el.getElementsByClassName('bss-bullets-el');
                }
            },
            addEventListeners: function (el) {
                var that = this;
                if (this.numItems > 1) {
                    el.querySelector('.bss-next').addEventListener('click', function () {
                        that.incrCounter(1); // increment & show
                    }, false);

                    el.querySelector('.bss-prev').addEventListener('click', function () {
                        that.incrCounter(-1); // decrement & show
                    }, false);

                    for (i = 0; i < this.numItems; i++) {
                        this.bullets[i].addEventListener('click', function () {
                            that.setCounter(parseInt(this.id));
                        }, false);
                    }

                    el.onkeydown = function caction(e) {
                        e = e || window.event;
                        if (e.keyCode === 37) {
                            that.incrCounter(-1); // decrement & show
                        } else if (e.keyCode === 39) {
                            that.incrCounter(1); // increment & show
                        }
                    };
                }
            },
            autoCycle: function (el, speed, pauseOnHover) {
                var that = this,
                    interval = window.setInterval(function () {
                        that.incrCounter(1); // increment & show
                    }, speed);

                if (pauseOnHover) {
                    el.addEventListener('mouseover', function () {
                        interval = clearInterval(interval);
                    }, false);
                    el.addEventListener('mouseout', function () {
                        interval = window.setInterval(function () {
                            that.incrCounter(1); // increment & show
                        }, speed);
                    }, false);
                } // end pauseonhover

            },
            addFullScreen: function(el){
                var that = this,
                fsControl = document.createElement("span");

                fsControl.classList.add('bss-fullscreen');
                el.appendChild(fsControl);
                el.querySelector('.bss-fullscreen').addEventListener('click', function () {
                    that.toggleFullScreen(el);
                }, false);
            },
            addSwipe: function(el){
                var that = this,
                    ht = new Hammer(el);
                ht.on('swiperight', function(e) {
                    that.incrCounter(-1); // decrement & show
                });
                ht.on('swipeleft', function(e) {
                    that.incrCounter(1); // increment & show
                });
            },
            toggleFullScreen: function(el){
                // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
                if (!document.fullscreenElement &&    // alternative standard method
                    !document.mozFullScreenElement && !document.webkitFullscreenElement &&
                    !document.msFullscreenElement ) {  // current working methods
                    if (document.documentElement.requestFullscreen) {
                      el.requestFullscreen();
                    } else if (document.documentElement.msRequestFullscreen) {
                      el.msRequestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                      el.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                      el.webkitRequestFullscreen(el.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.exitFullscreen) {
                      document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                      document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                      document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                      document.webkitExitFullscreen();
                    }
                }
            } // end toggleFullScreen

        }; // end Slideshow object .....

    // make instances of Slideshow as needed
    [].forEach.call($slideshows, function (el) {
        $slideshow = Object.create(Slideshow);
        $slideshow.init(el, options);
    });
};
