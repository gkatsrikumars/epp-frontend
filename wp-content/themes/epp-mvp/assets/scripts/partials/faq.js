(function($) {
  "use strict";
  
  $(function() {

    // if( $('.faq__nav-link').length > 0 ){

    // $(window).scroll();

    // if( $(window).width() < 768 ) {
    //   $('.accordion-wrapper').hide();
    // }
    // else if( $(window).width() >= 768 ) {
    //   $('.accordion-wrapper').show();
    // }

    // // if( $('.faq__nav-link').length > 0 ){
    //   var generalDistance = $('#general').offset().top;
    //   generalDistance = parseFloat(generalDistance - 300);
  
    //   var occupationDistance = $('#occupation').offset().top;
    //   occupationDistance = parseFloat(occupationDistance - 300);
  
    //   // var pathwayDistance = $('#pathway').offset().top;
    //   // pathwayDistance = parseFloat(pathwayDistance - 300);
  
    //   var educationDistance = $('#education').offset().top;
    //   educationDistance = parseFloat(educationDistance - 300);
  
    //   var jobsDistance = $('#jobs').offset().top;
    //   jobsDistance = parseFloat(jobsDistance - 300);
    // // }
  
    // $(window).on('scroll', function() {
    //   // if( $('.faq__nav-link').length > 0 ){
    //     // if( $(window).scrollTop() >= $('#general').offset().top && $(window).scrollTop() < $('#occupation').offset().top ) {
    //     if( $(window).scrollTop() >= generalDistance && $(window).scrollTop() < occupationDistance ) {
    //       $('.faq__nav-item--general').siblings('.faq__nav-item').removeClass('active');
    //       $('.faq__nav-item--general').addClass('active');
    //     }
    //     // if( $(window).scrollTop() >= $('#occupation').offset().top && $(window).scrollTop() < $('#pathway').offset().top ) {
    //     if( $(window).scrollTop() >= occupationDistance && $(window).scrollTop() < educationDistance ) {
    //       $('.faq__nav-item--occupation').siblings('.faq__nav-item').removeClass('active');
    //       $('.faq__nav-item--occupation').addClass('active');
    //     }
    //     // if( $(window).scrollTop() >= $('#pathway').offset().top && $(window).scrollTop() < $('#education').offset().top ) {
    //     /* if( $(window).scrollTop() >= pathwayDistance && $(window).scrollTop() < educationDistance ) {
    //       $('.faq__nav-item--pathway').siblings('.faq__nav-item').removeClass('active');
    //       $('.faq__nav-item--pathway').addClass('active');
    //     } */
    //     // if( $(window).scrollTop() >= $('#education').offset().top && $(window).scrollTop() < $('#jobs').offset().top ) {
    //     if( $(window).scrollTop() >= educationDistance && $(window).scrollTop() < jobsDistance ) {
    //       $('.faq__nav-item--education').siblings('.faq__nav-item').removeClass('active');
    //       $('.faq__nav-item--education').addClass('active');
    //     }
    //     // if( $(window).scrollTop() >= $('#jobs').offset().top || $(window).scrollTop() == $(document).height() ) {
    //     if( $(window).scrollTop() >= jobsDistance ) {
    //       $('.faq__nav-item--jobs').siblings('.faq__nav-item').removeClass('active');
    //       $('.faq__nav-item--jobs').addClass('active');
    //     }
    //   // }
    // });

    // var resizeTimer;
    // $(window).on('resize', function(e) {
    //   clearTimeout(resizeTimer);
    //   resizeTimer = setTimeout(function() {
    //     $('.faq__collapse-btn').removeClass('active');
    //     if( $(window).width() < 768 ) {
    //       // $('.accordion-wrapper').slideUp(500);
    //       $('.accordion-wrapper').hide();
    //     }
    //     else if( $(window).width() >= 768 ) {
    //       // $('.accordion-wrapper').slideDown(500);
    //       $('.accordion-wrapper').show();
    //     }
    //   }, 250);
    // });

    // }

    $(document).on('click', '.faq__nav-link', function() {
      var target = $(this).attr('href');
      goToByScroll(target, 500, 125);
      return false;
    });

    $(document).on('click', '.faq__collapse-btn', function() {
      $(this).toggleClass('active');
      $(this).next().slideToggle(500);
      return false;
    });

    });// document ready
    
  })(jQuery);