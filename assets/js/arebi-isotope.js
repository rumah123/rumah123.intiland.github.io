// http://isotope.metafizzy.co/beta/isotope.pkgd.js
$('.feedback-toggle').click( function(){
    var right = parseFloat($('.feedback')[0].style.right.match(/[0-9]+/g)) || 49,
    tgl  = '+=280';
    (right > 49)  ? tgl = '-=280' : tgl = '+=280';
    $('.feedback').animate({ right: tgl}, 500);
});
$(document).ready(function() {
    /*!
    * eventie v1.0.6
    * event binding helper
    *   eventie.bind( elem, 'click', myFn )
    *   eventie.unbind( elem, 'click', myFn )
    * MIT license
    */

    /*jshint browser: true, undef: true, unused: true */
    /*global define: false, module: false */

    ( function( window ) {
        'use strict';
        var docElem = document.documentElement;
        var bind = function() {};

        function getIEEvent( obj ) {
            var event = window.event;
            // add event.target
            event.target = event.target || event.srcElement || obj;
            return event;
        }

        if ( docElem.addEventListener ) {
            bind = function( obj, type, fn ) {
                obj.addEventListener( type, fn, false );
            };
        } else if ( docElem.attachEvent ) {
            bind = function( obj, type, fn ) {
                obj[ type + fn ] = fn.handleEvent ?
                function() {
                    var event = getIEEvent( obj );
                    fn.handleEvent.call( fn, event );
                } :
                function() {
                    var event = getIEEvent( obj );
                    fn.call( obj, event );
                };
                obj.attachEvent( "on" + type, obj[ type + fn ] );
            };
        }

        var unbind = function() {};

        if ( docElem.removeEventListener ) {
            unbind = function( obj, type, fn ) {
                obj.removeEventListener( type, fn, false );
            };
        } else if ( docElem.detachEvent ) {
            unbind = function( obj, type, fn ) {
                obj.detachEvent( "on" + type, obj[ type + fn ] );
                try {
                    delete obj[ type + fn ];
                } catch ( err ) {
                    // can't delete window object properties
                    obj[ type + fn ] = undefined;
                }
            };
        }

        var eventie = {
            bind: bind,
            unbind: unbind
        };

        // ----- module definition ----- //

        if ( typeof define === 'function' && define.amd ) {
            // AMD
            define( eventie );
        } else if ( typeof exports === 'object' ) {
            // CommonJS
            module.exports = eventie;
        } else {
            // browser global
            window.eventie = eventie;
        }

    })( window );

  
    /*!
    * classie v1.0.1
    * class helper functions
    * from bonzo https://github.com/ded/bonzo
    * MIT license
    * 
    * classie.has( elem, 'my-class' ) -> true/false
    * classie.add( elem, 'my-new-class' )
    * classie.remove( elem, 'my-unwanted-class' )
    * classie.toggle( elem, 'my-class' )
    */

    /*jshint browser: true, strict: true, undef: true, unused: true */
    /*global define: false, module: false */

    ( function( window ) {
        'use strict';

        // class helper functions from bonzo https://github.com/ded/bonzo

        function classReg( className ) {
            return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
        }

        // classList support for class management
        // altho to be fair, the api sucks because it won't accept multiple classes at once
        var hasClass, addClass, removeClass;

        if ( 'classList' in document.documentElement ) {
            hasClass = function( elem, c ) {
                return elem.classList.contains( c );
            };
            addClass = function( elem, c ) {
                elem.classList.add( c );
            };
            removeClass = function( elem, c ) {
                elem.classList.remove( c );
            };
        }
        else {
            hasClass = function( elem, c ) {
                return classReg( c ).test( elem.className );
            };
            addClass = function( elem, c ) {
                if ( !hasClass( elem, c ) ) {
                    elem.className = elem.className + ' ' + c;
                }
            };
            removeClass = function( elem, c ) {
                elem.className = elem.className.replace( classReg( c ), ' ' );
             };
        }

        function toggleClass( elem, c ) {
            var fn = hasClass( elem, c ) ? removeClass : addClass;
            fn( elem, c );
        }

        var classie = {
            // full names
            hasClass: hasClass,
            addClass: addClass,
            removeClass: removeClass,
            toggleClass: toggleClass,
            // short names
            has: hasClass,
            add: addClass,
            remove: removeClass,
            toggle: toggleClass
        };

        // transport
        if ( typeof define === 'function' && define.amd ) {
            // AMD
            define( classie );
        } else if ( typeof exports === 'object' ) {
            // CommonJS
            module.exports = classie;
        } else {
            // browser global
            window.classie = classie;
        }

    })( window );

    // init Isotope
    var iso = new Isotope( '#container', {
        itemSelector: '.item',
        layoutMode: 'masonry',
    });

    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function( itemElem ) {
            var number = getText( itemElem.querySelector('.number') );
            return parseInt( number, 10 ) > 50;
        },
        // show if name ends with -ium
        ium: function( itemElem ) {
            var name = getText( itemElem.querySelector('.name') );
            return name.match( /ium$/ );
        }
    };
    
    imagesLoaded( container, function() {
        iso.layout();
    });

    // bind filter button click
    var filtersElem = document.querySelector('#filters');
    eventie.bind( filtersElem, 'click', function( event ) {
        // only work with buttons
        if ( !matchesSelector( event.target, 'button' ) ) {
            return;
        }
        var filterValue = event.target.getAttribute('data-filter');
        // use matching filter function
        filterValue = filterFns[ filterValue ] || filterValue;
        iso.arrange({ filter: filterValue });
    });

    // change is-checked class on buttons
    var buttonGroups = document.querySelectorAll('.button-group');
    for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
        var buttonGroup = buttonGroups[i];
        radioButtonGroup( buttonGroup );
    }

    function radioButtonGroup( buttonGroup ) {
        eventie.bind( buttonGroup, 'click', function( event ) {
            // only work with buttons
            if ( !matchesSelector( event.target, 'button' ) ) {
                return;
            }
            classie.remove( buttonGroup.querySelector('.is-checked'), 'is-checked' );
            classie.add( event.target, 'is-checked' );
        });
    }

});

