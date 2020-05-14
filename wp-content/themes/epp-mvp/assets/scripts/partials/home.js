(function($) {
  "use strict";

  $(function() {

    /* if( $('body').hasClass('home') ) {
      var url = window.location.search;
      if ( url.indexOf('?section=') !== -1 ) {// Open path (edit pathway) IS present
        var section = url.replace('?section=', '');
        goToByScroll('#'+section, 500, 91);
      }
    }

    $(document).on('click', '.menu__item--articles', function() {
      if( $('body').hasClass('home') ) {
        goToByScroll('#home-section--future-of-work', 500, 91);
        return false;
      }
    });

    $(document).on('click', '.menu__item--about', function() {
      if( $('body').hasClass('home') ) {
        goToByScroll('#home-about-section', 500, 500);
        return false;
      }
    }); */

  });// document ready

  $(window).on('load', function() {

    setTimeout(function(){

      if( $('body').hasClass('home') ) {
        var url = window.location.search;
        if ( url.indexOf('?section=') !== -1 ) {// query string IS present
          var section = url.replace('?section=', '');
          goToByScroll('#'+section, 500, 91);
        }
      }

      $(document).on('click', '.menu__item--articles', function() {
        if( $('body').hasClass('home') ) {
          goToByScroll('#home-section--future-of-work', 500, 91);
          return false;
        }
      });

      $(document).on('click', '.menu__item--about', function() {
        if( $('body').hasClass('home') ) {
          goToByScroll('#home-about-section', 500, 225);
          return false;
        }
      });

    }, 1000);

  });// window load

})(jQuery);