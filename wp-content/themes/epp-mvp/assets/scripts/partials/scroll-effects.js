(function($) {
  "use strict";

  $(function() {

    /*
    triggerHook: 0 | 'onLeave' // top of viewport
    triggerHook: 0.5 (default) // middle of viewport (or just leave this option out)
    triggerHook: 1 | 'onEnter' // bottom of viewport
    .reverse(false) // doesn't remove animation when you scroll back up
    // MULTIPLE CONTAINERS:
    var controller1 = new ScrollMagic.Controller({container: "#container1"});// normal (vertical scroll)
    var controller2 = new ScrollMagic.Controller({container: "#container2", vertical: false});// horizontal scroll
    */

    var controller = new ScrollMagic.Controller();

    // build scenes
    new ScrollMagic.Scene({triggerElement: ".home-section--slider", triggerHook: 0, offset: 80 })
      .setClassToggle(".site-header", "solid") // add class toggle
      // .addIndicators() // add indicators (requires plugin)
      // .reverse(false)
      .addTo(controller);
      // .duration( $('#page-wrapper').outerHeight() );

    /* new ScrollMagic.Scene({triggerElement: ".home-section--slider", triggerHook: 0, offset: 80})
      .setClassToggle(".propellers", "spin") // add class toggle
      .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
      .duration( 310 ); */

    new ScrollMagic.Scene({triggerElement: ".home-section--slider", triggerHook: 0, offset: 80})
      // .setClassToggle(".site-header", "solid") // add class toggle
      .setTween(".goo-1", {marginRight: "30%", ease: Linear.easeNone})
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
      .duration( $('.slider').outerHeight() );

    new ScrollMagic.Scene({triggerElement: ".home-section--slider", triggerHook: 0})
      // .setClassToggle(".site-header", "solid") // add class toggle
      .setTween(".ball", {marginTop: "-20%", ease: Linear.easeNone})
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
      .duration( $('.slider').outerHeight() );

    new ScrollMagic.Scene({triggerElement: ".home-section--about", triggerHook: 'onEnter'})
      .setClassToggle(".home-section--about", "on-screen") // add class toggle
      // .setTween(".ball, .slider__text", {marginTop: "-40%", ease: Linear.easeNone})
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
      // .reverse(false);
      // .duration( $('.slider').outerHeight() );

    /* new ScrollMagic.Scene({triggerElement: ".home-section--about"})
      // .setClassToggle(".site-header", "solid") // add class toggle
      .setTween(".goo-2", {marginLeft: "10%", ease: Linear.easeNone})
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
      .duration( 1120 ); */

    /* new ScrollMagic.Scene({triggerElement: ".home-section--how-it-works"})
      .setClassToggle(".home-section--how-it-works", "on-screen") // add class toggle
      .addIndicators() // add indicators (requires plugin)
      .addTo(controller); */

    new ScrollMagic.Scene({triggerElement: ".how-it-works__info.first", triggerHook: 'onEnter', offset: 100})
      .setClassToggle(".how-it-works__info.first", "on-screen") // add class toggle
      // .addIndicators() // add indicators (requires plugin)
      .on('enter', function () {
        var oldSrc = EPP_DATA.assets_url+'/illustrations/girl-2_2x.png';
        var newSrc = EPP_DATA.assets_url+'/illustrations/girl-2_loop-1_2x.gif';
        $('.how-it-works__info .girl-2').attr('src', newSrc);
      })
      // .on('leave', function () {
      //   console.log("left!");
      // })
      .addTo(controller);
    new ScrollMagic.Scene({triggerElement: ".how-it-works__info.second", triggerHook: 'onEnter', offset: 100})
      .setClassToggle(".how-it-works__info.second", "on-screen") // add class toggle
      // .addIndicators() // add indicators (requires plugin)
      .on('enter', function () {
        var oldSrc2 = EPP_DATA.assets_url+'/illustrations/guy-1_2x.png';
        var newSrc2 = EPP_DATA.assets_url+'/illustrations/guy-1_loop-1_2x.gif';
        $('.how-it-works__info .guy-1').attr('src', newSrc2);
      })
      .addTo(controller);
    new ScrollMagic.Scene({triggerElement: ".how-it-works__info.third", triggerHook: 'onEnter', offset: 100})
      .setClassToggle(".how-it-works__info.third", "on-screen") // add class toggle
      // .addIndicators() // add indicators (requires plugin)
      .on('enter', function () {
        var oldSrc3 = EPP_DATA.assets_url+'/illustrations/guy-2_2x.png';
        var newSrc3 = EPP_DATA.assets_url+'/illustrations/guy-2_loop-1_2x.gif';
        $('.how-it-works__info .guy-2').attr('src', newSrc3);
      })
      .addTo(controller);

    new ScrollMagic.Scene({triggerElement: ".home-section--video"})
      .setClassToggle(".home-section--video .embed-responsive", "on-screen") // add class toggle
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
      // .duration( 1120 );

    new ScrollMagic.Scene({triggerElement: ".home-section--future-of-work"})
      .setClassToggle(".home-section--future-of-work .report", "on-screen") // add class toggle
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
      // .duration( 1120 );

    new ScrollMagic.Scene({triggerElement: ".home-section--future-of-work", triggerHook: 'onLeave'})
      .setClassToggle(".home__cta", "on-screen") // add class toggle
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
      // .duration( 1120 );

    new ScrollMagic.Scene({triggerElement: "#page-wrapper", triggerHook: 0, offset: 60 })
      .setClassToggle(".mobile-menu-bar, .search-occupations-btn", "solid") // add class toggle
      // .addIndicators() // add indicators (requires plugin)
      // .reverse(false)
      .addTo(controller);

    /* new ScrollMagic.Scene({triggerElement: ".home-section--slider", offset: 489})
      // .setClassToggle(".site-header", "solid") // add class toggle
      .addIndicators() // add indicators (requires plugin)
      .setTween(".goo-1", {marginTop: "-100%", ease: Linear.easeNone})
      .addTo(controller)
      .duration( $('.slider').outerHeight() ); */

    // var tween = new TimelineMax ()
    //   .add([
    //     TweenMax.to(".goo-1", 1, {marginTop: "-100px", ease: Linear.easeNone})
    //     // TweenMax.to("#parallaxContainer .layer2", 1, {backgroundPosition: "-500% 0", ease: Linear.easeNone}),
    //     // TweenMax.to("#parallaxContainer .layer3", 1, {backgroundPosition: "-225% 0", ease: Linear.easeNone})
    //   ]);

    new ScrollMagic.Scene({triggerElement: ".site-footer-wrap", triggerHook: 'onEnter'/* , offset: -70 */})
      .setClassToggle(".home-section--partners", "on-screen") // add class toggle
      // .setTween(".home-section--partners", {marginTop: "-40%", ease: Linear.easeNone})
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
      // .duration( $('#page-wrapper').outerHeight() );

    // new ScrollMagic.Scene({triggerElement: ".home__callout.first", triggerHook: 'onEnter'/* , offset: -70 */})
    //   .setClassToggle(".home-section__heading--about, .home-section__about-copy", "on-screen") // add class toggle
    //   // .setTween(".home-section--partners", {marginTop: "-40%", ease: Linear.easeNone})
    //   // .addIndicators() // add indicators (requires plugin)
    //   .addTo(controller)
    //   .duration( $('#page-wrapper').outerHeight() );

    // new ScrollMagic.Scene({triggerElement: ".home-section--future-of-work"})
    //   .setClassToggle(".report .col--has-img", "on-screen") // add class toggle
    //   // .setTween(".home-section--partners", {marginTop: "-40%", ease: Linear.easeNone})
    //   // .addIndicators() // add indicators (requires plugin)
    //   .addTo(controller)
    //   .duration( $('#page-wrapper').outerHeight() );

    // FAQ PAGE:

    new ScrollMagic.Scene({triggerElement: "#general"/* , triggerHook: 'onLeave', offset: 195 */})
      .setClassToggle(".faq__nav-item--general", "active") // add class toggle
      // .on('enter', function () {
      //   // $('.faq__nav-item--general').siblings('.faq__nav-item').removeClass('active');
      //   console.log('enter');
      // })
      // .on('leave', function () {
      //   console.log('leave');
      // })
      // .addIndicators() // add indicators (requires plugin)
      .duration( parseFloat( $('#accordion--general').outerHeight() ) + 95 )
      .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#occupation"/* , triggerHook: 'onLeave', offset: 195 */})
      .setClassToggle(".faq__nav-item--occupation", "active") // add class toggle
      // .on('enter', function () {
      //   $('.faq__nav-item--occupation').siblings('.faq__nav-item').removeClass('active');
      // })
      .duration( parseFloat( $('#accordion--occupation').outerHeight() ) + 95 )
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#education"/* , triggerHook: 'onLeave', offset: 195 */})
      .setClassToggle(".faq__nav-item--education", "active") // add class toggle
      // .on('enter', function () {
      //   $('.faq__nav-item--education').siblings('.faq__nav-item').removeClass('active');
      // })
      .duration( parseFloat( $('#accordion--education').outerHeight() ) + 95 )
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#jobs"/* , triggerHook: 'onLeave', offset: 195 */})
      .setClassToggle(".faq__nav-item--jobs", "active") // add class toggle
      // .on('enter', function () {
      //   $('.faq__nav-item--jobs').siblings('.faq__nav-item').removeClass('active');
      // })
      // .duration( parseFloat( $('#accordion--jobs').outerHeight() ) + 95 )
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller);

  });// document ready
  
})(jQuery);