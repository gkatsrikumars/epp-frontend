(function($) {
  "use strict";
  
  $(function() {

    if( !$('body').hasClass('page-template-page-pathways') ) {
      localStorage.removeItem('epp_mvp_current_path');
    }


    $.validate({
      form : '#signup-form, #login-form, #update-profile-form, #change-password-form, #name-your-pathway-form, #form--initiate-password-reset',
      borderColorOnError : '',
      errorElementClass : 'is-invalid',
      scrollToTopOnError : false,
      // validateOnBlur : false,
      // modules : 'security'
    });

    var winWidth = $(window).width();
    var winHeight = $(window).height();

    $('[data-toggle="tooltip"]').tooltip();

    $('.mobile-menu-btn').click(function(){
      $(this).toggleClass('menu-open');
      $(this).find('span').toggleClass('active');
      // $(this).siblings('.mobile-menu-container').toggleClass('active');
      $('body, .content-body, .mobile-menu-bar, .mobile-nav').toggleClass('menu-open');

      // if ( $('body').hasClass('menu-open') ) {
      //   setTimeout(function() {
      //     $('body').removeClass('menu-open');
      //   }, 300);
      // }
      // else /* if ( !$('body').hasClass('menu-open') ) */ {
      //   $('body').addClass('menu-open');
      // }

      // $('.mobile-menu-container').toggleClass('active');
      return false;
    });

    /* if( winWidth < 1025 ){
      $('.sf-dropdown > a').click(function(){
        $(this).siblings('.sf-dropdown-menu').slideToggle(500);
        $(this).closest('.sf-dropdown').toggleClass('active-menu');
        return false;
      });
      $('.menu-item-has-children > a').click(function(){
        $(this).siblings('.sub-menu').slideToggle(500);
        $(this).closest('.menu-item-has-children').toggleClass('active-menu');
        return false;
      });
    } */

    $(document).on('click', '.blocking', function() {
      closePopupsEtAl();
      return false;
    });

    $(document).on('click', '.popup__close', function() {
      closeLoginSignup();
      return false;
    });

    $('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], input[type="number"], textarea').focus(function(){
      // $(this).parent().siblings('small').addClass('focused');
      $(this).siblings('label').addClass('focused');
    });
    $('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], input[type="number"], textarea').focusout(function(){
      // $('form small').removeClass('focused');
      if( $(this).val().length != 0){
        // $(this).parent().siblings('small').addClass('focused');
        // $(this).addClass('focused');
        $(this).siblings('label').addClass('focused');
      }
      if( $(this).val().length === 0){
        // $(this).parent().siblings('small').removeClass('focused');
        // $(this).removeClass('focused');
        $(this).siblings('label').removeClass('focused');
      }
      // console.log($(this));
    });

    $(document).on('click', '.radio-label', function(){
      $('.radio-label').removeClass('checked-label');
      if( $(this).find('input').prop('checked', true) ) {
        $(this).addClass('checked-label');
        if( $(this).closest('.form-group').hasClass('related-group') ) {
          $(this).closest('.form-group').next().find('input[type="text"]').focus();
        }
      }
      else{
        $(this).removeClass('checked-label');
      }
    });

    // $('.related-group input[type="radio"]').change(function(){
    //   console.log('this is true');
    //   /* $('.radio-label').removeClass('checked-label');
    //   if( $(this).is(':checked') ) {
    //     $(this).closest('.form-group').next().find('input[type="text"]').focus();
    //   } */
    // });

    $('.related-input').focus(function(){
      $('.radio-label').removeClass('checked-label');
      $(this).closest('.form-group').prev().find('input[type="radio"]').prop('checked', true);
    });

    $(document).on('click', '.build-pathway-btn', function(){
      $(this).hide();
      $('.input--build-pathway, .pathway-gradient-border').show();
      $('.input--build-pathway').focus();
      return false;
    });

    $('.input--build-pathway').blur(function(){
      $('.input--build-pathway, .pathway-gradient-border').hide();
      $('.build-pathway-btn').show();
      $('.build-pathway-form')[0].reset();
      $('.input--build-pathway').removeClass('has-value');
      return false;
    });

    $(document).on('click', '.search-occupations-btn', function(){

      $('.form--search-occupations')[0].reset();

      if( $(this).hasClass('active') ) {

        // $('body').removeClass('search-occupations-active');

        $(this).removeClass('active');

        $('.menu--secondary').css('border', '');

        $('.form--search-occupations, .blocking').removeClass('visible');

        setTimeout(function(){
          $('.form--search-occupations, .blocking').removeClass('active');
          $('body').removeClass('search-occupations-active');
        }, 400);

      }
      else {

        $('body').addClass('search-occupations-active');

        $(this).addClass('active');

        $('.menu--secondary').css('border', 'none');

        // $('.form--search-occupations').addClass('fadeIn animated');
        $('.form--search-occupations, .blocking').addClass('visible');

        setTimeout(function(){
          $('#search-occ-input').focus();
          $('.form--search-occupations, .blocking').addClass('active');
        }, 400);

      }
      return false;
    });

    $(document).on('click', '.launch-login', function(){
      var redirectURL = $(this).attr('href');
      if( redirectURL != '#' ) {
        $('#redirect-after-login').val(redirectURL);
      }
      else {
        $('#redirect-after-login').val('');
      }
      launchLoginPopup();
      return false;
    });

    var resizeTimer;
    $(window).on('resize', function(e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if( $(window).width() >= 992 ) {
          $('#page-wrapper').show();
          $('.mobile-menu-btn span').removeClass('active');
          $('.mobile-menu-btn, body, #page-wrapper, .mobile-menu-bar, .mobile-nav, .content-body').removeClass('menu-open');
          $('#page-wrapper').removeClass('opaque');
          closePopupsEtAl();
        }
      }, 250);
    });

  });// document ready

  $(window).on('load', function() {
    setTimeout(function(){
      $('body').addClass('loaded');
      $('.site-loading').fadeOut(500);
    }, 500);

    // if(EPP_DATA.ID == '69' && $('body').hasClass('logged-in') ) {
    if( $('body').hasClass('logged-in') ) {

      if(localStorage.getItem('epp_mvp_save_user_path') !== null) {// unsaved path exists
        if (localStorage.getItem('epp_mvp_save_user_path') == 1 || localStorage.getItem('epp_mvp_save_user_path') == '1') {

          var postURL = EPP_DATA.site_url+'/wp-json/api/v1/pathways/save';
          var pathwayName = localStorage.getItem('epp_mvp_unsaved_path_name');
          var pathways = JSON.parse( localStorage.getItem('epp_mvp_unsaved_path') );
          
          var data = {'name':pathwayName, 'pathways':pathways };

          $.ajax({
            type: 'POST',
            url: postURL,
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (xhr) {
              xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
            },
            success: function (result) {
              if( result > 0 ) {
                // $('#name-your-pathway').modal('hide');
                // $('.alert-danger').addClass('d-none');
                // $('.alert-success').removeClass('d-none');
                // $('.pathways__name-current-path span').html(pathwayName);
                // $('.pathways__name-current-path .input--save-path-name').attr('data-initial-value', pathwayName);
                
                localStorage.setItem('epp_mvp_save_user_path', 0);
                localStorage.setItem('epp_mvp_unsaved_path_name', '');
                localStorage.setItem('epp_mvp_unsaved_path', '');

                // location.reload();
                var eppRedirectUrl = localStorage.getItem('epp_mvp_redirect_url');
                localStorage.removeItem('epp_mvp_redirect_url');

                window.location.replace(eppRedirectUrl);

                // if( isMobile() ) {
                //   goToByScroll('#pathway__group--start', 500, 200);
                // }
              }
              /* else if( result == 0 ) {// Pathway was not inserted in WP
                // $('.alert-success').addClass('d-none');
                // $('.alert-danger').removeClass('d-none');
              }
              else if( result == -1 ) {// Name already used by user
                // $('#pathway-name-input').addClass('is-invalid');
                // $('.pathway-name-msg').addClass('error').removeClass('d-none');
              } */
            },
            error: function (jqXHR, exception) {
              console.log(jqXHR);
            }
          });
        }// if unsaved path has at least 2 occupations
      }// if unsaved path exists

      if(localStorage.getItem('epp_mvp_bookmark_job_id') !== null) {// bookmark job exists
        var jobID = localStorage.getItem('epp_mvp_bookmark_job_id');
        var jobTitle = localStorage.getItem('epp_mvp_bookmark_job_title');
        var action = 'add';

        var data = {'job_id': jobID, 'job_title': jobTitle, 'action': action};

        $.ajax({
          type: 'POST',
          url: EPP_DATA.site_url+'/wp-json/api/v1/bookmark',
          data: data,
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
          },
          success: function (result) {
            console.log(result);
            localStorage.removeItem('epp_mvp_bookmark_job_id');
            localStorage.removeItem('epp_mvp_bookmark_job_title');

            // location.reload();
            var eppRedirectUrl = localStorage.getItem('epp_mvp_redirect_url');
            localStorage.removeItem('epp_mvp_redirect_url');

            window.location.replace(eppRedirectUrl);
          },
          error: function (jqXHR, exception) {
            console.log(jqXHR);
          }
        });
      }

    }// if saved bookmarks page

  });
  
})(jQuery);

/**
  * @desc Paginate elements
  * @param int num - the number of elements to split each page by
  * @return none
*/
jQuery.fn.simplePaginate = function(num, elemClass) {

  if( num === undefined || isNaN(num) ){
    num = 4;
  }

  var divs = this;
  var itemsClass;

  if(elemClass) {
    itemsClass = elemClass;
  }
  else {
    itemsClass = 'pagination-elements';
  }

  for (var i = 0; i < divs.length; i+=num) {
    divs.slice(i, i+num).wrapAll('<div class="'+itemsClass+'"></div>');
  }
  // Add links for each page
  var counter = 1, liClass = '';
  $('.'+itemsClass).each(function(){
    $(this).addClass('page-'+counter);
    if(counter == 1){
      liClass = 'active';
    }
    else{
      liClass = '';
    }
    $('.'+itemsClass).not(':first').hide();
    counter++;
  });

  // if(equalHeights && equalHeights == true) {
  //   equalHeights('.'+itemsClass);
  // }
  // equalHeights('.'+itemsClass);
}

/**
  * @desc get HTML of element including self
  * @param none
  * @return HTML
*/
jQuery.fn.outerHTML = function(s) {
  return s
    ? this.before(s).remove()
    : jQuery("<p>").append(this.eq(0).clone()).html();
}

/* jQuery.fn.simplePaginate = function(options) {

  var settings = $.extend({
    itemsPerPage: 4,
    itemsClass: 'pagination-elements',
    equalHeights: true
  }, options );

  var divs = this;
  console.log(divs);

  for (var i = 0; i < divs.length; i+=settings.itemsPerPage) {
    divs.slice(i, i+settings.itemsPerPage).wrapAll('<div class="'+settings.itemsClass+'"></div>');
  }
  // Add links for each page
  var counter = 1, liClass = '';
  $('.'+settings.itemsClass).each(function(){
    $(this).addClass('page-'+counter);
    if(counter == 1){
      liClass = 'active';
    }
    else{
      liClass = '';
    }
    $('.'+settings.itemsClass).not(':first').hide();
    counter++;
  });

  if(settings.equalHeights == true){
    equalHeights('.'+settings.itemsClass);
  }
} */

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
  * @desc create equal height columns
  * @param object - CSS class name of the elements to apply equal heights to
  * @return none
*/
// jQuery.fn.equalHeights = function(selector){
  /* if( this.length > 0 ) {// the selector exists
    // console.log(this[0].classList);
    // console.log(this);
    // console.log(this[0].localName);
    // console.log(this[0].classList.length);
    if( this[0].classList.length > 0 ) {// the selector has a class
      console.info(this[0].classList[0]);
    }
    else {
      console.info(this[0].localName);
    }
  }
  else {// the selector doesn't exist
    console.warn('The selector used for equalHeights() doesn\'t exist on the page.');
  } */
  /* var colSelector = this[0].classList[0];// Get the selector of the object
  var newHeight;
  var colHeights = [];
  $('.'+colSelector).css('height', '');// Clear heights first
  $('.'+colSelector).each(function(){
    var singleCol = $(this).outerHeight();// Get the outerHeight of a single column
    colHeights.push(singleCol);// Push the single height into the array
    newHeight = Math.max.apply(Math,colHeights);// Get the tallest column from the array
  });
  $('.'+colSelector).css('height', newHeight+'px');// Apply the tallest height to all columns */
// }

/**
  * @desc scroll to the specified anchor section
  * @param int id - the id of the section to scroll to, speed int - the speed at which to scroll by, topOffset int - the offset to scroll to if fixed header, etc. exists
  * @return none
*/
function goToByScroll(id, speed, topOffset){
  if (typeof topOffset === "undefined" || topOffset === null) { 
    topOffset = 0; 
  }
  var scrollAmount = $(id).offset().top;
  scrollAmount = scrollAmount-topOffset;
  $('html,body').animate({
    scrollTop: scrollAmount},
  speed);
}

function equalHeights(selector) {
  var newHeight;
  var colHeights = [];
  $(selector).css('height', '');// Clear heights first
  $(selector).each(function(){
    var singleCol = $(this).outerHeight();// Get the outerHeight of a single column
    colHeights.push(singleCol);// Push the single height into the array
    newHeight = Math.max.apply(Math,colHeights);// Get the tallest column from the array
  });
  $(selector).css('height', newHeight+'px');// Apply the tallest height to all columns
  // console.log(selector);
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
  * @desc Format thousands using 'K'
  * @param int num - the number to format
  * @return the formatted number
*/
function kFormatter(num) {
  return num > 999 ? ( Math.round(num/1000) ) + 'K' : num
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
  * @desc Format thousands using commas
  * @param int x - the number to format
  * @return the formatted number
*/
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
  * @desc Convert automation to percent
  * @param int automationRisk - the automation number
  * @return an array of the percent and colour CSS class
*/
function automationPercent( automationRisk ) {

  var automation = parseFloat(automationRisk);
  automation = Math.round(automation * 100);

  var automationColour = 'text-success';
  // if(automation > 15 && automation < 33){
  //   automationColour  = 'text-primary';
  // }
  if(automation > 20 && automation < 50){
    automationColour  = 'text-warning';
  }
  else if( automation >= 50 ){
    automationColour  = 'text-danger';
  }

  var automationArray = {automation_percent:automation, automation_colour:automationColour};

  return automationArray;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
  * @desc Convert the distance value into a percent
  * @param int x - the distance value
  * @return the distance percent
*/
function percentageDistance( x ) {
  // var y = ( 0.940545596123901 / x ) * 100;
  // return Math.round(y);
  return Math.round( (1 - x) * 100 );
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function validateEmail(id) {
  var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  var emailField = document.getElementById(id).value;
  // if(!email_regex.test(jQuery("#"+id).val())){
  if( !email_regex.test(emailField) ){
    return false;
  }
  else{
    return true;
  }
}

var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

var occupationsObj, occupationTitles = [];
getJSON(EPP_DATA.site_url+'/epp-occupations.json', function(err, data) {
  if (err !== null) {
    console.log('Something went wrong: ' + err);
  } else {
    occupationsObj = data.rows;
    console.log('occupations loaded!');
    for (var i = 0; i < occupationsObj.length; i++) {
      occupationTitles.push({label:occupationsObj[i].title, value:occupationsObj[i].soc_code});
    }
    console.log('occupation titles loaded!');
    if( !document.hasFocus() ){
      // jQuery(document).focus();
      // console.log('document blurred!');
      // window.focus();
      // console.log(jQuery('#page-wrapper'));
      // jQuery('#page-wrapper')[0].click();
      /* setInterval(function(){
        console.log('document blurred!');
        window.focus();
      }, 250); */
    }
  }
});

function closePopupsEtAl() {
  $('.blocking, .popup, .form--search-occupations').removeClass('visible');
  $('.search-occupations-btn').removeClass('active');
  $('.form--search-occupations')[0].reset();
  $('body').removeClass('search-occupations-active');
  $('.menu--secondary').css('border', '');
    
  setTimeout(function(){
    $('.blocking, .popup, .form--search-occupations').removeClass('active');
      
    $('#signup-form input, #login-form input').val('');
    $('#signup-form input, #login-form input').blur();
    $('#signup-form')[0].reset();
    $('#login-form')[0].reset();
  }, 400);
}

function closeLoginSignup() {
  $('body').removeClass('popup-active');
  $('.popup-overlay').fadeOut(500);
  setTimeout(function(){
    $('#signup-form input, #login-form input').val('');
    $('#signup-form input, #login-form input').blur();
    $('#signup-form')[0].reset();
    $('#login-form')[0].reset();
  }, 500);
}

function launchLoginPopup() {
  $('.popup-overlay--signup').fadeOut(500);
  $('.popup-overlay--login').fadeIn(500);

  var winWidth = $(window).width();
  
  setTimeout(function(){
    if( winWidth < 768 ) {
      $('#page-wrapper').hide();
      $('.mobile-menu-btn span').removeClass('active');
      $('.mobile-menu-btn, body, #page-wrapper, .mobile-menu-bar, .mobile-nav').removeClass('menu-open');
      $('#page-wrapper').removeClass('opaque');
    }
    else{
      $('#page-wrapper').show();
    }

    $('body').addClass('popup-active');

    $('#login-form').focus();
  }, 500);
}

function launchSignupPopup() {
  /* $('.blocking, .popup--login').removeClass('visible active');

  var winWidth = $(window).width();
  var winHeight = $(window).height();

  if(winHeight < 751){
    $('html,body').animate({
      scrollTop: 0
    }, 500);
  }

  $('.blocking, .popup--signup').addClass('visible');
  setTimeout(function(){
    $('.blocking, .popup--signup').addClass('active');

    if( winWidth < 768 ) {
      $('#page-wrapper').hide();
      $('.mobile-menu-btn span').removeClass('active');
      $('.mobile-menu-btn, body, #page-wrapper, .mobile-menu-bar, .mobile-nav').removeClass('menu-open');
      $('#page-wrapper').removeClass('opaque');
    }
    else{
      $('#page-wrapper').show();
    }

    $('body').addClass('popup-active');
  }, 400); */
  $('.popup-overlay--login').fadeOut(500);
  $('.popup-overlay--signup').fadeIn(500);

  var winWidth = $(window).width();
  
  setTimeout(function(){
    if( winWidth < 768 ) {
      $('#page-wrapper').hide();
      $('.mobile-menu-btn span').removeClass('active');
      $('.mobile-menu-btn, body, #page-wrapper, .mobile-menu-bar, .mobile-nav').removeClass('menu-open');
      $('#page-wrapper').removeClass('opaque');
    }
    else{
      $('#page-wrapper').show();
    }

    $('body').addClass('popup-active');
  }, 500);
}

/*--------------------------------------------------------------
* Truncate title
--------------------------------------------------------------*/
function truncateTitle(title, limit) {
  var excerpt;

  if(title.length > limit) {
    excerpt = title.substring(0, limit);
    excerpt += '...';
    return '<span data-toggle="tooltip" data-placement="top" title="' + title + '">' + excerpt + '</span>';
  }
  else{
    return title;
  }

}

function createOccupationObj( el ) {

  var socCode,
    title,
    risk,
    salary,
    occupation,
    skillOverlap = null;

  if( el.hasClass('pathway__occupation--start') ) {
    socCode = el.find('.pathway__start-path-btn').attr('data-soc-code');
    title = el.find('.input__start-new-path').val();
    title = title.trim();
  }
  else {
    socCode = el.find('.pathway__occupation-btn').attr('data-soc-code');
    title = el.find('.pathway__occupation-title').attr('data-full-title');
    title = title.trim();
  }

  risk = el.find('.pathway__occupation-automation .pathway__value').text();
  salary = el.find('.pathway__occupation-salary .pathway__value').text();
  salary = salary.replace('$', '');
  // salary = salary.replace(',', '');
  salary = salary.replace(/,/g, '');

  if( el.find('.pathway__occupation-skill-overlap') ) {
    skillOverlap = el.find('.pathway__occupation-skill-overlap').text();
  }

  occupation = {
    "soc_code": socCode,
    "title": title,
    "automation": parseFloat(risk),
    "salary": parseFloat(salary),
    "skill_overlap": skillOverlap
  }

  return occupation;

}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function calculateMedianSalary(salaryMin, salaryMax) {
  var formattedSalary;

  if( salaryMin && salaryMax ) {
    var salaryMin = parseFloat(salaryMin);
    var salaryMax = parseFloat(salaryMax);
    var salaryMed = Math.round( (salaryMin + salaryMax)/2 );
    formattedSalary = numberWithCommas(salaryMed);
    // formattedSalary = '$' + formattedSalary.toString();
  }
  else if( salaryMin && !salaryMax ) {
    var salaryMin = parseFloat(salaryMin);
    formattedSalary = numberWithCommas(salaryMin);
    // formattedSalary = '$' + formattedSalary.toString();
  }
  else if( !salaryMin && salaryMax ) {
    var salaryMax = parseFloat(salaryMax);
    formattedSalary = numberWithCommas(salaryMax);
    // formattedSalary = '$' + formattedSalary.toString();
  }
  else{
    formattedSalary = '--';
  }

  return formattedSalary;
}

/**
  * @desc Check if current device is mobile
  * @param none
  * @return none
*/
function isMobile() {
  var isMobileDevice;
  
  if( jQuery(window).width() > 991 ) {// Desktop
    isMobileDevice = false;
  }
  if( jQuery(window).width() < 992 ) {// Mobilw
    isMobileDevice = true;
  }

  return isMobileDevice;
}

function setCurrentPath() {
  var openPath = localStorage.getItem('epp_mvp_open_path');
  openPath = JSON.parse(openPath);

  var currentPathway = {}, counter = 2;
  var startOccupation = createOccupationObj( jQuery('.pathway__occupation--start') );
        
  currentPathway.path_1 = startOccupation;
        
  var limit = parseFloat(openPath.total_occs) + 1;
  var selectedOccs = jQuery('.pathway__groups .pathway__occupation.expanded, .pathway__groups .pathway__occupation.selected');

  selectedOccs.each(function(){
    if(counter < limit) {
      var occupation = createOccupationObj( jQuery(this) );
      currentPathway[`path_${counter}`] = occupation;
      counter++;
    }
  });
  localStorage.setItem('epp_mvp_current_path', JSON.stringify(currentPathway));
}

/**
  * @desc Update mobile occupations after changes made to desktop pathway
  * @param none
  * @return none
*/
function copyDesktopOccupations() {
  jQuery('.mobile-pathway__groups').empty();// Remove all pathway groups (columns) from mobile, except starting group (column)
  jQuery('.pathway__group').not('.pathway__group--start').each(function(){// Find all groups (columns) on desktop, except starting group (column)
    jQuery('.mobile-pathway__groups').append( jQuery(this).outerHTML() );// Append them to mobile "groups" container
  });
  setCurrentPathView();
}

/**
  * @desc Update desktop occupations after changes made to mobile pathway
  * @param none
  * @return none
*/
function copyMobileOccupations() {
  jQuery('.pathway__groups .pathway__group').not('.pathway__group--start').remove();// Remove all pathway groups (columns) from desktop, except starting group (column)
  jQuery('.pathway__groups').append( jQuery('.mobile-pathway__groups').html() );// Append them to desktop "groups" container
  setCurrentPathView();
}

/**
  * @desc Populate the current path view on mobile
  * @param none
  * @return none
*/
function setCurrentPathView() {
  var currentPathway = localStorage.getItem('epp_mvp_current_path');// Get current pathway localstorage item
  var currentPathway = JSON.parse(currentPathway);// Parse it as JSON object
  // console.log(currentPathway);

  // var size = Object.keys(currentPathway).length;
  // size++;
  var pathLength = Object.keys(currentPathway).length;
  var size = parseFloat(pathLength) + 1;
  var counter = 1;

  if( currentPathway.path_1.soc_code != '' ) {

    $('.current-path-holder .col').removeClass('has-1-occs has-2-occs has-3-occs has-4-occs').addClass('has-'+pathLength+'-occs').empty();
    $('.current-path-holder .col-12').remove();


    for (var i = 1; i < size; i++) {
      // console.log(currentPathway[`path_${i}`]);
      var currentOcc = currentPathway[`path_${i}`];
      // console.log(currentOcc);
      // currentPathway.path_1.soc_code
      var title = truncateTitle(currentOcc.title, 25);
      var salary;

      if(currentOcc.salary !== null) {
        salary = numberWithCommas(currentOcc.salary);
      }
      else{
        salary = '--';
      }

      $('.current-path-holder .col').append(
        '<div class="pathway__occupation pathway__occupation--'+counter+' collapsed" data-soc-code="' + currentOcc.soc_code + '">' +
    
          '<em class="pathway__occupation-skill-overlap">' + currentOcc.skill_overlap + '</em>' +
    
          '<a href="' + EPP_DATA.site_url +'/occupation/?soc_code=' + currentOcc.soc_code + '" target="_blank" class="pathway__occupation-title" data-full-title="' + currentOcc.title + '">' +
          title +
          '</a>' +
    
          '<div class="pathway__occupation-automation">' +
            '<span class="pathway__label">Risk of automation</span>' +
            '<span class="pathway__value">' + currentOcc.automation + '%</span>' +
          '</div><!-- End .pathway__automation-risk -->' +
    
          '<div class="pathway__occupation-salary">' +
            '<span class="pathway__label">Median salary</span>' +
            '<span class="pathway__value">$' + salary + '</span>' +
          '</div><!-- End .pathway__salary -->' +
    
          '<div>'+
            '<a href="' + EPP_DATA.site_url +'/occupation/?soc_code=' + currentOcc.soc_code + '#occ-jobs" class="jobs-link">Jobs &amp; Training</a>' +
          '</div>' +
    
        '</div>' +
        '<span class="checked-circle checked-circle--'+counter+'"></span>'
      );
      
      counter++;

    }

    $('[data-toggle="tooltip"]').tooltip();

  }// if current path has at least one occupation

}

/**
  * @desc Update the actions div width
  * @param none
  * @return none
*/
function updateActionsDiv() {
  var actionsDivClasses = 'col-md-3 col-md-6 col-md-9 col-md-12';
  var newActionsDivClass;

  if( !isMobile() ) {// Desktop:
    if( jQuery('.pathway__groups > .pathway__group:visible').length == 1 ) {
      newActionsDivClass = 'col-md-3';
    }
    if( jQuery('.pathway__groups > .pathway__group:visible').length == 2 ) {
      newActionsDivClass = 'col-md-6';
    }
    if( jQuery('.pathway__groups > .pathway__group:visible').length == 3 ) {
      newActionsDivClass = 'col-md-9';
    }
    if( jQuery('.pathway__groups > .pathway__group:visible').length == 4 ) {
      newActionsDivClass = 'col-md-12';
    }
  }
  else {// Mobile:
    if( jQuery('.mobile-pathway__groups > .pathway__group:visible').length == 1 ) {
      newActionsDivClass = 'col-md-6';
    }
    if( jQuery('.mobile-pathway__groups > .pathway__group:visible').length == 2 ) {
      newActionsDivClass = 'col-md-9';
    }
    if( jQuery('.mobile-pathway__groups > .pathway__group:visible').length == 3 ) {
      newActionsDivClass = 'col-md-12';
    }
  }
  jQuery('.pathways__actions').removeClass(actionsDivClasses).addClass(newActionsDivClass);
}

function createPathwayID(groupID, socCode) {
  var ID, urlEncodedSocCode = socCode;
  urlEncodedSocCode = urlEncodedSocCode.replace(/\./g,'-');

  // .pathway__group--2
  if( groupID.indexOf('.pathway__group--2') !== -1 ) {// IS group 2
    // occ-group-2-{soc-code}, btn-group-2-{soc-code}
    ID = 'group-2-' + urlEncodedSocCode;
  }

  // .pathway__group--3
  if( groupID.indexOf('.pathway__group--3') !== -1 ) {// IS group 3
    ID = 'group-3-' + urlEncodedSocCode;
  }

  // .pathway__group--4
  if( groupID.indexOf('.pathway__group--4') !== -1 ) {// IS group 4
    ID = 'group-4-' + urlEncodedSocCode;
  }

  return ID;

}

// When the user scrolls the page, execute myFunction 
window.onscroll = function() { scrollProgress() };

function scrollProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.querySelector('.page-scroll-indicator').style.transform = 'translateX(' + scrolled + '%)';
}