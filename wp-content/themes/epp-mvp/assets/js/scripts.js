"use strict";

(function ($) {
  "use strict";

  $(function () {
    if (!$('body').hasClass('page-template-page-pathways')) {
      localStorage.removeItem('epp_mvp_current_path');
    }

    $.validate({
      form: '#signup-form, #login-form, #update-profile-form, #change-password-form, #name-your-pathway-form, #form--initiate-password-reset',
      borderColorOnError: '',
      errorElementClass: 'is-invalid',
      scrollToTopOnError: false // validateOnBlur : false,
      // modules : 'security'

    });
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    $('[data-toggle="tooltip"]').tooltip();
    $('.mobile-menu-btn').click(function () {
      $(this).toggleClass('menu-open');
      $(this).find('span').toggleClass('active'); // $(this).siblings('.mobile-menu-container').toggleClass('active');

      $('body, .content-body, .mobile-menu-bar, .mobile-nav').toggleClass('menu-open'); // if ( $('body').hasClass('menu-open') ) {
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

    $(document).on('click', '.blocking', function () {
      closePopupsEtAl();
      return false;
    });
    $(document).on('click', '.popup__close', function () {
      closeLoginSignup();
      return false;
    });
    $('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], input[type="number"], textarea').focus(function () {
      // $(this).parent().siblings('small').addClass('focused');
      $(this).siblings('label').addClass('focused');
    });
    $('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], input[type="number"], textarea').focusout(function () {
      // $('form small').removeClass('focused');
      if ($(this).val().length != 0) {
        // $(this).parent().siblings('small').addClass('focused');
        // $(this).addClass('focused');
        $(this).siblings('label').addClass('focused');
      }

      if ($(this).val().length === 0) {
        // $(this).parent().siblings('small').removeClass('focused');
        // $(this).removeClass('focused');
        $(this).siblings('label').removeClass('focused');
      } // console.log($(this));

    });
    $(document).on('click', '.radio-label', function () {
      $('.radio-label').removeClass('checked-label');

      if ($(this).find('input').prop('checked', true)) {
        $(this).addClass('checked-label');

        if ($(this).closest('.form-group').hasClass('related-group')) {
          $(this).closest('.form-group').next().find('input[type="text"]').focus();
        }
      } else {
        $(this).removeClass('checked-label');
      }
    }); // $('.related-group input[type="radio"]').change(function(){
    //   console.log('this is true');
    //   /* $('.radio-label').removeClass('checked-label');
    //   if( $(this).is(':checked') ) {
    //     $(this).closest('.form-group').next().find('input[type="text"]').focus();
    //   } */
    // });

    $('.related-input').focus(function () {
      $('.radio-label').removeClass('checked-label');
      $(this).closest('.form-group').prev().find('input[type="radio"]').prop('checked', true);
    });
    $(document).on('click', '.build-pathway-btn', function () {
      $(this).hide();
      $('.input--build-pathway, .pathway-gradient-border').show();
      $('.input--build-pathway').focus();
      return false;
    });
    $('.input--build-pathway').blur(function () {
      $('.input--build-pathway, .pathway-gradient-border').hide();
      $('.build-pathway-btn').show();
      $('.build-pathway-form')[0].reset();
      $('.input--build-pathway').removeClass('has-value');
      return false;
    });
    $(document).on('click', '.search-occupations-btn', function () {
      $('.form--search-occupations')[0].reset();

      if ($(this).hasClass('active')) {
        // $('body').removeClass('search-occupations-active');
        $(this).removeClass('active');
        $('.menu--secondary').css('border', '');
        $('.form--search-occupations, .blocking').removeClass('visible');
        setTimeout(function () {
          $('.form--search-occupations, .blocking').removeClass('active');
          $('body').removeClass('search-occupations-active');
        }, 400);
      } else {
        $('body').addClass('search-occupations-active');
        $(this).addClass('active');
        $('.menu--secondary').css('border', 'none'); // $('.form--search-occupations').addClass('fadeIn animated');

        $('.form--search-occupations, .blocking').addClass('visible');
        setTimeout(function () {
          $('#search-occ-input').focus();
          $('.form--search-occupations, .blocking').addClass('active');
        }, 400);
      }

      return false;
    });
    $(document).on('click', '.launch-login', function () {
      var redirectURL = $(this).attr('href');

      if (redirectURL != '#') {
        $('#redirect-after-login').val(redirectURL);
      } else {
        $('#redirect-after-login').val('');
      }

      launchLoginPopup();
      return false;
    });
    var resizeTimer;
    $(window).on('resize', function (e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if ($(window).width() >= 992) {
          $('#page-wrapper').show();
          $('.mobile-menu-btn span').removeClass('active');
          $('.mobile-menu-btn, body, #page-wrapper, .mobile-menu-bar, .mobile-nav, .content-body').removeClass('menu-open');
          $('#page-wrapper').removeClass('opaque');
          closePopupsEtAl();
        }
      }, 250);
    });
  }); // document ready

  $(window).on('load', function () {
    setTimeout(function () {
      $('body').addClass('loaded');
      $('.site-loading').fadeOut(500);
    }, 500); // if(EPP_DATA.ID == '69' && $('body').hasClass('logged-in') ) {

    if ($('body').hasClass('logged-in')) {
      if (localStorage.getItem('epp_mvp_save_user_path') !== null) {
        // unsaved path exists
        if (localStorage.getItem('epp_mvp_save_user_path') == 1 || localStorage.getItem('epp_mvp_save_user_path') == '1') {
          var postURL = EPP_DATA.site_url + '/wp-json/api/v1/pathways/save';
          var pathwayName = localStorage.getItem('epp_mvp_unsaved_path_name');
          var pathways = JSON.parse(localStorage.getItem('epp_mvp_unsaved_path'));
          var data = {
            'name': pathwayName,
            'pathways': pathways
          };
          $.ajax({
            type: 'POST',
            url: postURL,
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            beforeSend: function beforeSend(xhr) {
              xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
            },
            success: function success(result) {
              if (result > 0) {
                // $('#name-your-pathway').modal('hide');
                // $('.alert-danger').addClass('d-none');
                // $('.alert-success').removeClass('d-none');
                // $('.pathways__name-current-path span').html(pathwayName);
                // $('.pathways__name-current-path .input--save-path-name').attr('data-initial-value', pathwayName);
                localStorage.setItem('epp_mvp_save_user_path', 0);
                localStorage.setItem('epp_mvp_unsaved_path_name', '');
                localStorage.setItem('epp_mvp_unsaved_path', ''); // location.reload();

                var eppRedirectUrl = localStorage.getItem('epp_mvp_redirect_url');
                localStorage.removeItem('epp_mvp_redirect_url');
                window.location.replace(eppRedirectUrl); // if( isMobile() ) {
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
            error: function error(jqXHR, exception) {
              console.log(jqXHR);
            }
          });
        } // if unsaved path has at least 2 occupations

      } // if unsaved path exists


      if (localStorage.getItem('epp_mvp_bookmark_job_id') !== null) {
        // bookmark job exists
        var jobID = localStorage.getItem('epp_mvp_bookmark_job_id');
        var jobTitle = localStorage.getItem('epp_mvp_bookmark_job_title');
        var action = 'add';
        var data = {
          'job_id': jobID,
          'job_title': jobTitle,
          'action': action
        };
        $.ajax({
          type: 'POST',
          url: EPP_DATA.site_url + '/wp-json/api/v1/bookmark',
          data: data,
          dataType: 'json',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
          },
          success: function success(result) {
            console.log(result);
            localStorage.removeItem('epp_mvp_bookmark_job_id');
            localStorage.removeItem('epp_mvp_bookmark_job_title'); // location.reload();

            var eppRedirectUrl = localStorage.getItem('epp_mvp_redirect_url');
            localStorage.removeItem('epp_mvp_redirect_url');
            window.location.replace(eppRedirectUrl);
          },
          error: function error(jqXHR, exception) {
            console.log(jqXHR);
          }
        });
      }
    } // if saved bookmarks page

  });
})(jQuery);
/**
  * @desc Paginate elements
  * @param int num - the number of elements to split each page by
  * @return none
*/


jQuery.fn.simplePaginate = function (num, elemClass) {
  if (num === undefined || isNaN(num)) {
    num = 4;
  }

  var divs = this;
  var itemsClass;

  if (elemClass) {
    itemsClass = elemClass;
  } else {
    itemsClass = 'pagination-elements';
  }

  for (var i = 0; i < divs.length; i += num) {
    divs.slice(i, i + num).wrapAll('<div class="' + itemsClass + '"></div>');
  } // Add links for each page


  var counter = 1,
      liClass = '';
  $('.' + itemsClass).each(function () {
    $(this).addClass('page-' + counter);

    if (counter == 1) {
      liClass = 'active';
    } else {
      liClass = '';
    }

    $('.' + itemsClass).not(':first').hide();
    counter++;
  }); // if(equalHeights && equalHeights == true) {
  //   equalHeights('.'+itemsClass);
  // }
  // equalHeights('.'+itemsClass);
};
/**
  * @desc get HTML of element including self
  * @param none
  * @return HTML
*/


jQuery.fn.outerHTML = function (s) {
  return s ? this.before(s).remove() : jQuery("<p>").append(this.eq(0).clone()).html();
};
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


function goToByScroll(id, speed, topOffset) {
  if (typeof topOffset === "undefined" || topOffset === null) {
    topOffset = 0;
  }

  var scrollAmount = $(id).offset().top;
  scrollAmount = scrollAmount - topOffset;
  $('html,body').animate({
    scrollTop: scrollAmount
  }, speed);
}

function equalHeights(selector) {
  var newHeight;
  var colHeights = [];
  $(selector).css('height', ''); // Clear heights first

  $(selector).each(function () {
    var singleCol = $(this).outerHeight(); // Get the outerHeight of a single column

    colHeights.push(singleCol); // Push the single height into the array

    newHeight = Math.max.apply(Math, colHeights); // Get the tallest column from the array
  });
  $(selector).css('height', newHeight + 'px'); // Apply the tallest height to all columns
  // console.log(selector);
} // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
  * @desc Format thousands using 'K'
  * @param int num - the number to format
  * @return the formatted number
*/


function kFormatter(num) {
  return num > 999 ? Math.round(num / 1000) + 'K' : num;
} // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
  * @desc Format thousands using commas
  * @param int x - the number to format
  * @return the formatted number
*/


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
  * @desc Convert automation to percent
  * @param int automationRisk - the automation number
  * @return an array of the percent and colour CSS class
*/


function automationPercent(automationRisk) {
  var automation = parseFloat(automationRisk);
  automation = Math.round(automation * 100);
  var automationColour = 'text-success'; // if(automation > 15 && automation < 33){
  //   automationColour  = 'text-primary';
  // }

  if (automation > 20 && automation < 50) {
    automationColour = 'text-warning';
  } else if (automation >= 50) {
    automationColour = 'text-danger';
  }

  var automationArray = {
    automation_percent: automation,
    automation_colour: automationColour
  };
  return automationArray;
} // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/**
  * @desc Convert the distance value into a percent
  * @param int x - the distance value
  * @return the distance percent
*/


function percentageDistance(x) {
  // var y = ( 0.940545596123901 / x ) * 100;
  // return Math.round(y);
  return Math.round((1 - x) * 100);
} // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


function validateEmail(id) {
  var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  var emailField = document.getElementById(id).value; // if(!email_regex.test(jQuery("#"+id).val())){

  if (!email_regex.test(emailField)) {
    return false;
  } else {
    return true;
  }
}

var getJSON = function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';

  xhr.onload = function () {
    var status = xhr.status;

    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };

  xhr.send();
};

var occupationsObj,
    occupationTitles = [];
getJSON(EPP_DATA.site_url + '/epp-occupations.json', function (err, data) {
  if (err !== null) {
    console.log('Something went wrong: ' + err);
  } else {
    occupationsObj = data.rows;
    console.log('occupations loaded!');

    for (var i = 0; i < occupationsObj.length; i++) {
      occupationTitles.push({
        label: occupationsObj[i].title,
        value: occupationsObj[i].soc_code
      });
    }

    console.log('occupation titles loaded!');

    if (!document.hasFocus()) {// jQuery(document).focus();
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
  setTimeout(function () {
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
  setTimeout(function () {
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
  setTimeout(function () {
    if (winWidth < 768) {
      $('#page-wrapper').hide();
      $('.mobile-menu-btn span').removeClass('active');
      $('.mobile-menu-btn, body, #page-wrapper, .mobile-menu-bar, .mobile-nav').removeClass('menu-open');
      $('#page-wrapper').removeClass('opaque');
    } else {
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
  setTimeout(function () {
    if (winWidth < 768) {
      $('#page-wrapper').hide();
      $('.mobile-menu-btn span').removeClass('active');
      $('.mobile-menu-btn, body, #page-wrapper, .mobile-menu-bar, .mobile-nav').removeClass('menu-open');
      $('#page-wrapper').removeClass('opaque');
    } else {
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

  if (title.length > limit) {
    excerpt = title.substring(0, limit);
    excerpt += '...';
    return '<span data-toggle="tooltip" data-placement="top" title="' + title + '">' + excerpt + '</span>';
  } else {
    return title;
  }
}

function createOccupationObj(el) {
  var socCode,
      title,
      risk,
      salary,
      occupation,
      skillOverlap = null;

  if (el.hasClass('pathway__occupation--start')) {
    socCode = el.find('.pathway__start-path-btn').attr('data-soc-code');
    title = el.find('.input__start-new-path').val();
    title = title.trim();
  } else {
    socCode = el.find('.pathway__occupation-btn').attr('data-soc-code');
    title = el.find('.pathway__occupation-title').attr('data-full-title');
    title = title.trim();
  }

  risk = el.find('.pathway__occupation-automation .pathway__value').text();
  salary = el.find('.pathway__occupation-salary .pathway__value').text();
  salary = salary.replace('$', ''); // salary = salary.replace(',', '');

  salary = salary.replace(/,/g, '');

  if (el.find('.pathway__occupation-skill-overlap')) {
    skillOverlap = el.find('.pathway__occupation-skill-overlap').text();
  }

  occupation = {
    "soc_code": socCode,
    "title": title,
    "automation": parseFloat(risk),
    "salary": parseFloat(salary),
    "skill_overlap": skillOverlap
  };
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

  if (salaryMin && salaryMax) {
    var salaryMin = parseFloat(salaryMin);
    var salaryMax = parseFloat(salaryMax);
    var salaryMed = Math.round((salaryMin + salaryMax) / 2);
    formattedSalary = numberWithCommas(salaryMed); // formattedSalary = '$' + formattedSalary.toString();
  } else if (salaryMin && !salaryMax) {
    var salaryMin = parseFloat(salaryMin);
    formattedSalary = numberWithCommas(salaryMin); // formattedSalary = '$' + formattedSalary.toString();
  } else if (!salaryMin && salaryMax) {
    var salaryMax = parseFloat(salaryMax);
    formattedSalary = numberWithCommas(salaryMax); // formattedSalary = '$' + formattedSalary.toString();
  } else {
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

  if (jQuery(window).width() > 991) {
    // Desktop
    isMobileDevice = false;
  }

  if (jQuery(window).width() < 992) {
    // Mobilw
    isMobileDevice = true;
  }

  return isMobileDevice;
}

function setCurrentPath() {
  var openPath = localStorage.getItem('epp_mvp_open_path');
  openPath = JSON.parse(openPath);
  var currentPathway = {},
      counter = 2;
  var startOccupation = createOccupationObj(jQuery('.pathway__occupation--start'));
  currentPathway.path_1 = startOccupation;
  var limit = parseFloat(openPath.total_occs) + 1;
  var selectedOccs = jQuery('.pathway__groups .pathway__occupation.expanded, .pathway__groups .pathway__occupation.selected');
  selectedOccs.each(function () {
    if (counter < limit) {
      var occupation = createOccupationObj(jQuery(this));
      currentPathway["path_".concat(counter)] = occupation;
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
  jQuery('.mobile-pathway__groups').empty(); // Remove all pathway groups (columns) from mobile, except starting group (column)

  jQuery('.pathway__group').not('.pathway__group--start').each(function () {
    // Find all groups (columns) on desktop, except starting group (column)
    jQuery('.mobile-pathway__groups').append(jQuery(this).outerHTML()); // Append them to mobile "groups" container
  });
  setCurrentPathView();
}
/**
  * @desc Update desktop occupations after changes made to mobile pathway
  * @param none
  * @return none
*/


function copyMobileOccupations() {
  jQuery('.pathway__groups .pathway__group').not('.pathway__group--start').remove(); // Remove all pathway groups (columns) from desktop, except starting group (column)

  jQuery('.pathway__groups').append(jQuery('.mobile-pathway__groups').html()); // Append them to desktop "groups" container

  setCurrentPathView();
}
/**
  * @desc Populate the current path view on mobile
  * @param none
  * @return none
*/


function setCurrentPathView() {
  var currentPathway = localStorage.getItem('epp_mvp_current_path'); // Get current pathway localstorage item

  var currentPathway = JSON.parse(currentPathway); // Parse it as JSON object
  // console.log(currentPathway);
  // var size = Object.keys(currentPathway).length;
  // size++;

  var pathLength = Object.keys(currentPathway).length;
  var size = parseFloat(pathLength) + 1;
  var counter = 1;

  if (currentPathway.path_1.soc_code != '') {
    $('.current-path-holder .col').removeClass('has-1-occs has-2-occs has-3-occs has-4-occs').addClass('has-' + pathLength + '-occs').empty();
    $('.current-path-holder .col-12').remove();

    for (var i = 1; i < size; i++) {
      // console.log(currentPathway[`path_${i}`]);
      var currentOcc = currentPathway["path_".concat(i)]; // console.log(currentOcc);
      // currentPathway.path_1.soc_code

      var title = truncateTitle(currentOcc.title, 25);
      var salary;

      if (currentOcc.salary !== null) {
        salary = numberWithCommas(currentOcc.salary);
      } else {
        salary = '--';
      }

      $('.current-path-holder .col').append('<div class="pathway__occupation pathway__occupation--' + counter + ' collapsed" data-soc-code="' + currentOcc.soc_code + '">' + '<em class="pathway__occupation-skill-overlap">' + currentOcc.skill_overlap + '</em>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + currentOcc.soc_code + '" target="_blank" class="pathway__occupation-title" data-full-title="' + currentOcc.title + '">' + title + '</a>' + '<div class="pathway__occupation-automation">' + '<span class="pathway__label">Risk of automation</span>' + '<span class="pathway__value">' + currentOcc.automation + '%</span>' + '</div><!-- End .pathway__automation-risk -->' + '<div class="pathway__occupation-salary">' + '<span class="pathway__label">Median salary</span>' + '<span class="pathway__value">$' + salary + '</span>' + '</div><!-- End .pathway__salary -->' + '<div>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + currentOcc.soc_code + '#occ-jobs" class="jobs-link">Jobs &amp; Training</a>' + '</div>' + '</div>' + '<span class="checked-circle checked-circle--' + counter + '"></span>');
      counter++;
    }

    $('[data-toggle="tooltip"]').tooltip();
  } // if current path has at least one occupation

}
/**
  * @desc Update the actions div width
  * @param none
  * @return none
*/


function updateActionsDiv() {
  var actionsDivClasses = 'col-md-3 col-md-6 col-md-9 col-md-12';
  var newActionsDivClass;

  if (!isMobile()) {
    // Desktop:
    if (jQuery('.pathway__groups > .pathway__group:visible').length == 1) {
      newActionsDivClass = 'col-md-3';
    }

    if (jQuery('.pathway__groups > .pathway__group:visible').length == 2) {
      newActionsDivClass = 'col-md-6';
    }

    if (jQuery('.pathway__groups > .pathway__group:visible').length == 3) {
      newActionsDivClass = 'col-md-9';
    }

    if (jQuery('.pathway__groups > .pathway__group:visible').length == 4) {
      newActionsDivClass = 'col-md-12';
    }
  } else {
    // Mobile:
    if (jQuery('.mobile-pathway__groups > .pathway__group:visible').length == 1) {
      newActionsDivClass = 'col-md-6';
    }

    if (jQuery('.mobile-pathway__groups > .pathway__group:visible').length == 2) {
      newActionsDivClass = 'col-md-9';
    }

    if (jQuery('.mobile-pathway__groups > .pathway__group:visible').length == 3) {
      newActionsDivClass = 'col-md-12';
    }
  }

  jQuery('.pathways__actions').removeClass(actionsDivClasses).addClass(newActionsDivClass);
}

function createPathwayID(groupID, socCode) {
  var ID,
      urlEncodedSocCode = socCode;
  urlEncodedSocCode = urlEncodedSocCode.replace(/\./g, '-'); // .pathway__group--2

  if (groupID.indexOf('.pathway__group--2') !== -1) {
    // IS group 2
    // occ-group-2-{soc-code}, btn-group-2-{soc-code}
    ID = 'group-2-' + urlEncodedSocCode;
  } // .pathway__group--3


  if (groupID.indexOf('.pathway__group--3') !== -1) {
    // IS group 3
    ID = 'group-3-' + urlEncodedSocCode;
  } // .pathway__group--4


  if (groupID.indexOf('.pathway__group--4') !== -1) {
    // IS group 4
    ID = 'group-4-' + urlEncodedSocCode;
  }

  return ID;
} // When the user scrolls the page, execute myFunction 


window.onscroll = function () {
  scrollProgress();
};

function scrollProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = winScroll / height * 100;
  document.querySelector('.page-scroll-indicator').style.transform = 'translateX(' + scrolled + '%)';
}

(function ($) {
  "use strict";

  $(function () {
    /* $('.bookmarked-occupation').each(function(){
      var fullText = $(this).find('.full-desc').text();
      var truncatedText = fullText.split(/\s+/).slice(0,18).join(" ");
      var restOfText = fullText.split(/\s+/).slice(18,2000).join(" ");
      $(this).find('.truncated-desc').prepend(truncatedText);
      $(this).find('.rest-of-desc').append(restOfText);
    });
     $(document).on('click', '.expand-occ-desc', function() {
      $(this).closest('.bookmarked-occupation').find('.ellipsis').toggle();
      $(this).closest('.bookmarked-occupation').find('.rest-of-desc').toggle();
      $(this).toggleClass('expanded');
      var text = $(this).text();
      $(this).text(text == 'Read more' ? 'Show less' : 'Read more');
      return false;
    }); */
    $(document).on('click', '.occupation__bookmark-btn', function () {
      var currElem = $(this);

      if (currElem.hasClass('bookmark-not-logged-in')) {
        localStorage.setItem('epp_mvp_bookmark_job_id', currElem.attr('data-job-id'));
        localStorage.setItem('epp_mvp_bookmark_job_title', currElem.attr('data-job-title'));
        var redirectURL = currElem.attr('href');
        /* if( redirectURL != '#' ) {
          $('#redirect-after-login').val(redirectURL);
        }
        else {
          $('#redirect-after-login').val('');
        } */

        localStorage.setItem('epp_mvp_redirect_url', redirectURL);
        launchLoginPopup();
      } else {
        var action = 'delete';

        if (currElem.hasClass('not-bookmarked')) {
          action = 'add';
        } else if (currElem.hasClass('bookmarked')) {
          action = 'delete';
        }

        var jobID = currElem.attr('data-job-id');
        var jobTitle = currElem.attr('data-job-title');
        var data = {
          'job_id': jobID,
          'job_title': jobTitle,
          'action': action
        };
        $.ajax({
          type: 'POST',
          url: EPP_DATA.site_url + '/wp-json/api/v1/bookmark',
          data: data,
          dataType: 'json',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
          },
          success: function success(result) {
            console.log(result);

            if (result == 1) {
              // Job does NOT exist in bookmarks and was added
              currElem.addClass('bookmarked').removeClass('not-bookmarked');
              currElem.text('Bookmarked');
              currElem.attr('title', 'Remove from Bookmarks');
            }

            if (result == 3) {
              // Job DOES exist in bookmarks and was deleted
              currElem.addClass('not-bookmarked').removeClass('bookmarked');
              currElem.text('Bookmark Occupation');
              currElem.attr('title', 'Add to Bookmarks');
            }
          },
          error: function error(jqXHR, exception) {
            console.log(jqXHR);
          }
        });
      }

      return false;
    });
    $(document).on('click', '.bookmarked-occupation__delete-btn', function () {
      var jobID = $(this).attr('data-job-id');
      var jobTitle = $(this).attr('data-job-title');
      $('.button--delete-bookmark').attr('data-job-id', jobID);
      $('.button--delete-bookmark').attr('data-job-title', jobTitle);
      $(this).closest('.bookmarked-occupation').addClass('to-be-removed');
      $('#delete-bookmark-modal').modal('show');
      return false;
    });
    $('#delete-bookmark-modal').on('hidden.bs.modal', function (e) {
      $('.bookmarked-occupation').removeClass('to-be-removed');
      $('.button--delete-bookmark').attr('data-job-id', '');
      $('.button--delete-bookmark').attr('data-job-title', '');
    });
    $(document).on('click', '.button--delete-bookmark', function () {
      var currElem = $(this);
      var jobID = currElem.attr('data-job-id');
      var jobTitle = currElem.attr('data-job-title');
      var action = 'delete';
      var data = {
        'job_id': jobID,
        'job_title': jobTitle,
        'action': action
      };
      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url + '/wp-json/api/v1/bookmark',
        data: data,
        dataType: 'json',
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function success(result) {
          console.log(result); // if(result == 1){// Job does NOT exist in bookmarks and was added
          //   $('#delete-bookmark-modal').modal('hide');
          //   $('.bookmarked-occupation.to-be-removed').remove();
          // }

          if (result == 3) {
            // Job DOES exist in bookmarks and was deleted
            $('#delete-bookmark-modal').modal('hide'); // $('.bookmarked-occupation.to-be-removed').addClass('zoomOut animated');
            // setTimeout(function(){
            //   $('.bookmarked-occupation.zoomOut').remove();
            // }, 1000);

            $('.bookmarked-occupation.to-be-removed').remove();
          }
        },
        error: function error(jqXHR, exception) {
          console.log(jqXHR);
        }
      });
      return false;
    });
  }); // document ready
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
    $(document).on('click', '.delete-account__btn', function () {
      if ($('input[name="reason-for-leaving"]:checked').length > 0) {
        $('.reason-for-leaving-error-msg').addClass('d-none');
        $('#delete-account-modal').modal('show');
      } else {
        $('.reason-for-leaving-error-msg').removeClass('d-none');
      }

      return false;
    });
    $(document).on('click', '.button--confirm-delete', function () {
      var reason = $('input[name="reason-for-leaving"]:checked').val();

      if (reason == 'Other') {
        reason = $('#other-reason-input').val();
      }

      var data = {
        'reason': reason
      };
      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url + '/wp-json/api/v1/account/delete',
        data: data,
        dataType: 'json',
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function success(result) {
          console.log(result);

          if (result == 1) {
            window.location.href = EPP_DATA.site_url + '?action=account_deleted';
          } else {
            $('.deletion-warning').removeClass('d-none');
            $('.deletion-warning strong').text('Error!');
            $('.deletion-warning span').text('An error occured, please try again.');
          }
        },
        error: function error(jqXHR, exception) {
          console.log(jqXHR);
        }
      });
      return false;
    });
  }); // document ready
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
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
    $(document).on('click', '.faq__nav-link', function () {
      var target = $(this).attr('href');
      goToByScroll(target, 500, 125);
      return false;
    });
    $(document).on('click', '.faq__collapse-btn', function () {
      $(this).toggleClass('active');
      $(this).next().slideToggle(500);
      return false;
    });
  }); // document ready
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
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
  }); // document ready

  $(window).on('load', function () {
    setTimeout(function () {
      if ($('body').hasClass('home')) {
        var url = window.location.search;

        if (url.indexOf('?section=') !== -1) {
          // query string IS present
          var section = url.replace('?section=', '');
          goToByScroll('#' + section, 500, 91);
        }
      }

      $(document).on('click', '.menu__item--articles', function () {
        if ($('body').hasClass('home')) {
          goToByScroll('#home-section--future-of-work', 500, 91);
          return false;
        }
      });
      $(document).on('click', '.menu__item--about', function () {
        if ($('body').hasClass('home')) {
          goToByScroll('#home-about-section', 500, 225);
          return false;
        }
      });
    }, 1000);
  }); // window load
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
    if ($('.job__single--recent').length > 0) {
      var totalPages = Math.ceil($('.job__single--recent').length / 5);
      $('.job__single--recent').simplePaginate(5, 'pagination-elements__jobs--recent'); // equalHeights('.pagination-elements__jobs--recent');

      if ($('.pagination__jobs--recent').data("twbs-pagination")) {
        $('.pagination__jobs--recent').twbsPagination('destroy');
      }

      $('.job__holder--recent').twbsPagination({
        totalPages: totalPages,
        visiblePages: 4,
        paginationClass: 'pagination__jobs pagination__jobs--recent',
        onPageClick: function onPageClick(event, page) {
          $('.pagination-elements__jobs--recent').not('.pagination-elements__jobs--recent.page-' + page).hide();
          $('.pagination-elements__jobs--recent.page-' + page).show();
          $('.job__total-jobs--recent em').text(page);
        }
      });
      /* var allJobsHTML = $('.job__holder--recent').html();
      allJobsHTML = allJobsHTML.replace('pagination-elements__jobs--recent', 'pagination-elements__jobs--recent-mobile');
      var totalJobs; */

      $('.job__holder--recent').append('<span class="search-results__info">Results page:</span>');
      /* $('.job__holder--recent-mobile').prepend(allJobsHTML);
      totalJobs = $('.job__holder--recent-mobile .pagination-elements__jobs--recent').length;
      $('.job__holder--recent-mobile .pagination__jobs').remove();
      $('.job__holder--recent-mobile .button').attr('data-total-pages', totalJobs); */

      $('.job__single--recent-mobile').simplePaginate(5, 'pagination-elements__jobs--recent-mobile');
      $('.pagination-elements__jobs--recent-mobile').css('height', 'auto');
      $('.job__holder--recent-mobile .button').attr('data-total-pages', totalPages);
    }

    if ($('.job__single--all').length > 0) {
      var totalPages = Math.ceil($('.job__single--all').length / 5);
      $('.job__single--all').simplePaginate(5, 'pagination-elements__jobs--all'); // equalHeights('.pagination-elements__jobs--all');

      if ($('.pagination__jobs--all').data("twbs-pagination")) {
        $('.pagination__jobs--all').twbsPagination('destroy');
      }

      $('.job__holder--all').twbsPagination({
        totalPages: totalPages,
        visiblePages: 4,
        paginationClass: 'pagination__jobs pagination__jobs--all',
        onPageClick: function onPageClick(event, page) {
          $('.pagination-elements__jobs--all').not('.pagination-elements__jobs--all.page-' + page).hide();
          $('.pagination-elements__jobs--all.page-' + page).show();
          $('.job__total-jobs--all em').text(page);
        }
      });
      /* var allJobsHTML = $('.job__holder--all').html();
      allJobsHTML = allJobsHTML.replace('pagination-elements__jobs--all', 'pagination-elements__jobs--all-mobile');
      var totalJobs; */

      $('.job__holder--all').append('<span class="search-results__info">Results page:</span>');
      /* $('.job__holder--all-mobile').prepend(allJobsHTML);
      totalJobs = $('.job__holder--all-mobile .pagination-elements__jobs--all').length;
      $('.job__holder--all-mobile .pagination__jobs').remove();
      $('.job__holder--all-mobile .button').attr('data-total-pages', totalJobs); */

      $('.job__single--all-mobile').simplePaginate(5, 'pagination-elements__jobs--all-mobile');
      $('.pagination-elements__jobs--all-mobile').css('height', 'auto');
      $('.job__holder--all-mobile .button').attr('data-total-pages', totalPages);
    }

    $(document).on('click', '.job__filter-btn', function () {
      if ($(this).hasClass('job__filter-btn--all')) {
        $('.jobs-wrap--all').show();
        $('.jobs-wrap--recent').hide();
        $('.sort-btn--all').removeClass('button--outlined').addClass('button');
        $('.sort-btn--recent').removeClass('button').addClass('button--outlined');
        equalHeights('.pagination-elements__jobs--all');
      } else {
        $('.jobs-wrap--recent').show();
        $('.jobs-wrap--all').hide();
        $('.sort-btn--recent').removeClass('button--outlined').addClass('button');
        $('.sort-btn--all').removeClass('button').addClass('button--outlined');
        equalHeights('.pagination-elements__jobs--recent');
      }

      return false;
    });
    $(document).on('click', '.sort-btn', function () {
      $('.sort-btn').toggleClass('button--outlined button');

      if ($(this).hasClass('sort-btn--all')) {
        $('.jobs-wrap--all').show();
        $('.jobs-wrap--recent').hide();
        $('.sort-btn--all').removeClass('button--outlined').addClass('button');
        $('.sort-btn--recent').removeClass('button').addClass('button--outlined');
        equalHeights('.pagination-elements__jobs--all');
      } else {
        $('.jobs-wrap--recent').show();
        $('.jobs-wrap--all').hide();
        $('.sort-btn--recent').removeClass('button--outlined').addClass('button');
        $('.sort-btn--all').removeClass('button').addClass('button--outlined');
        equalHeights('.pagination-elements__jobs--recent');
      }

      return false;
    });
    $(document).on('click', '.button--more-jobs', function () {
      var type = $(this).attr('data-jobs-type'); // var currentPage = $(this).attr('data-current-page');

      var totalPages = $(this).attr('data-total-pages');
      var nextPage = $(this).attr('data-next-page');
      var htmlToLoad;

      if (nextPage < totalPages) {
        htmlToLoad = $(this).siblings('.pagination-elements__jobs--' + type + '-mobile.page-' + nextPage).html(); // ES5
        // htmlToLoad = $(this).siblings(`.pagination-elements__jobs--${type}-mobile.page-${nextPage}`).html();// ES6

        $('.pagination-elements__jobs--' + type + '-mobile.page-1').append(htmlToLoad);
        nextPage++;
        $(this).attr('data-next-page', nextPage);

        if (nextPage >= totalPages) {
          $(this).hide();
        }
      } else {
        $(this).hide();
      }

      return false;
    });
  }); // document ready
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
    $(document).on('click', '.login-btn', function () {
      launchLoginPopup();
      return false;
    });
    $('#login-form').on('submit', function (event) {
      event.preventDefault();
      $('.popup__form--login .form-feedback').empty().addClass('d-none').removeClass('error'); // Clear error message on submit

      var email = $('#login-email').val();
      var password = $('#login-password').val();
      var redirect = $('#redirect-after-login').val();
      var data = {
        'email': email,
        'password': password,
        'redirect': redirect
      };
      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url + '/wp-json/api/v1/login',
        data: data,
        dataType: 'json',
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-EPP-WP-Key', EPP_DATA.epp_key);
        },
        success: function success(result) {
          if (result.result_code == 1) {
            // Success with no redirect URL
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'loggedInUser': result.user_id,
              'event': 'userLogin'
            });
            setTimeout(function () {
              location.reload();
            }, 100); // console.log(result);
          }

          if (result.result_code == 2) {
            // Success AND contains redirect URL
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'loggedInUser': result.user_id,
              'event': 'userLogin'
            });
            setTimeout(function () {
              window.location.href = result.redirect_url;
            }, 100); // console.log(result);
          }

          if (result.result_code == 0) {
            // Wrong email and/or password
            $('.popup__form--login .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
          }
        },
        error: function error(jqXHR, exception) {
          console.log(jqXHR);
        }
      });
    });
    $(window).keyup(function (event) {
      if ($('.popup--login').hasClass('active')) {
        if (event.keyCode === 27 || event.which === 27) {
          // esc key is pressed
          closePopupsEtAl();
        }
      }
    });
  }); // document ready
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
    $('.search-results').hide();
    $('.form--search-occupations').on('submit', function (event) {
      // unsavedData = false;
      event.preventDefault();
      var winWidth = $(window).width();
      var searchQuery = $('#search-occ-input').val();
      var searchField = searchQuery.toLowerCase();

      if (searchQuery == '') {
        searchQuery = "''";
      }

      $('.form--search-occupations')[0].reset();
      $('#search-occ-input').blur();
      $.getJSON(EPP_DATA.site_url + '/epp-occupations.json', function (data) {
        // Get all occupations
        var occupations = data.rows; // Get just the occupations from the data
        // var output = '<h2 class="mt-4 mb-4">Results for "'+searchQuery+'"</h2>';
        // var output = '<div class="list-group returned-results">';

        var output = '';
        var counter = 0;
        var searchString = 'search results';

        for (var i = 0; i < occupations.length; i++) {
          // look for the entry with a matching `title` value
          var titleLowercase = occupations[i].title.toLowerCase(); // Highlight the search query string

          var highlightedTtitle = titleLowercase.replace(searchField, '<em>' + searchField + '</em>');

          if (titleLowercase.indexOf(searchField) >= 0) {
            // output += '<a class="list-group-item list-group-item-action epp-occupation-link" href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + occupations[i].soc_code + '" data-id="' + occupations[i].soc_code + '">' + occupations[i].title + '</a>';
            output += '<p class="search-results__item"><a class="search-results__link" href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + occupations[i].soc_code + '" data-id="' + occupations[i].soc_code + '">' + highlightedTtitle + '</a></p>';
            counter++;
          }
        }

        if (counter == 0) {
          output += '<p class="search-results__item">No results found.</p>';
          $('.pagination, .search-results__info').hide();
        }

        if (counter == 1) {
          searchString = 'search result';
        } // output += '</div>';
        // $('#search-results').html(output);

        /* $('.search-results__query').text(searchQuery);
        $('#search-results .modal-body').html(output); */


        $('.search-results__query span').text(searchQuery);
        $('.search-results__query em').text(counter + ' ' + searchString);
        $('.search-results__data').html(output); // $('.search-results').addClass('active');
        // setTimeout(function(){
        //   $('.search-results').toggleClass('open');
        // }, 400);

        $('.search-results').fadeIn(400);

        if (counter > 0) {
          $('.pagination, .search-results__info').show();
          $('.search-results__item').simplePaginate(10); // equalHeights('.pagination-elements');

          if ($('.pagination').data("twbs-pagination")) {
            $('.pagination').twbsPagination('destroy');
          }

          $('.pagination').twbsPagination({
            totalPages: Math.ceil($('.search-results__item').length / 10),
            visiblePages: 4,
            onPageClick: function onPageClick(event, page) {
              $('.pagination-elements').not('.pagination-elements.page-' + page).hide();
              $('.pagination-elements.page-' + page).show();
            }
          });
        }

        $('body').addClass('search-results-visible').css({
          'height': '100vh',
          'overflow-y': 'hidden'
        });

        if (winWidth < 768) {
          $('html,body').animate({
            scrollTop: 0
          }, 'slow');
        } // equalHeights('.pagination-elements');


        closePopupsEtAl(); // $('.search-results').addClass('visible');
        // $('.search-results').modal('show');
      });
    });
    $(document).on('click', '.search-results__close-btn', function () {
      // $('.search-results').removeClass('active');
      $('.search-results').fadeOut(400);
      $('body').removeClass('search-results-visible').css({
        'height': '',
        'overflow-y': ''
      }); // setTimeout(function(){
      //   $('.search-results').toggleClass('open');
      // }, 400);

      return false;
    });
    $('#search-occ-input').autocomplete({
      /* source: function (request, response) {
        var matches = $.map(occupationTitles, function (acItem) {
            if (acItem.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
              return acItem;
            }
        });
        response(matches.slice(0, 5));
      }, */
      source: function source(request, response) {
        var term = $.ui.autocomplete.escapeRegex(request.term),
            startsWithMatcher = new RegExp("^" + term, "i"),
            startsWith = $.grep(occupationTitles, function (value) {
          return startsWithMatcher.test(value.label || value.value || value);
        }),
            containsMatcher = new RegExp(term, "i"),
            contains = $.grep(occupationTitles, function (value) {
          return $.inArray(value, startsWith) < 0 && containsMatcher.test(value.label || value.value || value);
        });
        var matches = startsWith.concat(contains);
        response(matches.slice(0, 5));
      },
      appendTo: '#search-occ-autocomplete-container',
      change: function change(event, ui) {
        if (ui.item != null) {
          // unsavedData = false;
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/occupation/?soc_code=' + ui.item.value;
        }
      },
      select: function select(event, ui) {
        event.preventDefault();
        $('#search-occ-input').val(ui.item.label);

        if (ui.item != null) {
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/occupation/?soc_code=' + ui.item.value;
        }
      },
      focus: function focus(event, ui) {
        event.preventDefault(); // unsavedData = false;

        $('#search-occ-input').val(ui.item.label); // if(ui.item != null) {
        //   selectAutocomplete(ui.item.label, ui.item.value);
        // }
      },
      classes: {
        'ui-autocomplete': 'search-occ-autocomplete'
      }
    });
    $('#search-occ-input').keyup(function (event) {
      if (event.keyCode === 27 || event.which === 27) {
        closePopupsEtAl();
      }
    });
  }); // document ready
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
    $('.form--password-reset').on('submit', function (event) {
      event.preventDefault();
      var newPass = $('#new-password').val();
      var newPassConfirm = $('#new-password-confirm').val();
      var userID = $('#user-id').val();
      var userLogin = $('#user-login').val();
      var key = $('#activation-key').val();

      if (newPassConfirm != newPass) {
        $('.form--password-reset .alert').addClass('alert-danger').removeClass('alert-success d-none');
        $('.form--password-reset .alert span').empty().text('Your passwords do not match');
      } else {
        var data = {
          'new_password': newPass,
          'user_id': userID,
          'user_login': userLogin,
          'activation_key': key
        };
        $.ajax({
          type: 'POST',
          url: EPP_DATA.site_url + '/wp-json/api/v1/account/password-reset',
          data: data,
          dataType: 'json',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('X-EPP-WP-Key', EPP_DATA.epp_key);
          },
          success: function success(result) {
            if (result > 0) {
              $('.form-label-group').remove();
              $('.form--password-reset .alert').addClass('alert-success').removeClass('alert-danger d-none');
              $('.form--password-reset .alert span').empty().html('Your password has been successfully reset. <a href="' + EPP_DATA.site_url + '" class="alert-link launch-login">Login</a>.');
            }
          },
          error: function error(jqXHR, exception) {
            console.log(jqXHR);
          }
        });
      }
    });
  }); // document ready
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
    /*
    1) User clicks 'open pathway' button
    2) A localstorage item gets created (epp_mvp_open_path) with the soc codes in the pathway (except the first)
    3) The user gets redirected to the pathways page with the first soc code populated in the url and a query string '&action=edit'
     When query string is present then different actions take place:
    4) The second soc code will populate the second column, and the third, fourth...
    5) The '.pathway__occupation' with the 'data-soc-code' attribute that matches the second soc code with get a class of 'expanded', and the third, fourth...
    */
    // SAVED PATHWAYS PAGE
    $(document).on('click', '.saved-pathway__open-btn', function () {
      var savedPathways = {};
      var counter = 1;
      var startSoc = $(this).attr('data-start-occ');
      var totalPathOccs = $(this).attr('data-total-occ');
      var colWidth = totalPathOccs * 3;
      var actionsDivClass = 'col-md-' + colWidth.toString();
      var pathwayName = $(this).siblings('.input--edit-path-name').val();
      var rowIndex = $(this).siblings('.input--edit-path-name').attr('data-row-index');
      savedPathways.total_occs = totalPathOccs;
      savedPathways.actions_div_class = actionsDivClass;
      savedPathways.pathway_name = pathwayName;
      savedPathways.row_index = rowIndex;
      $(this).closest('.saved-pathway__actions').next('.saved-pathway').find('.saved-pathway__occupation').each(function () {
        var socCode = $(this).attr('data-soc-code'); // SAVED PATH OBJECT:

        savedPathways['occ_' + counter] = {
          'soc_code': socCode,
          'active_occ_selector': '.pathway__group--' + counter + ' .pathway__occupation[data-soc-code="' + socCode + '"]'
        };
        counter++;
      });
      localStorage.setItem('epp_mvp_open_path', JSON.stringify(savedPathways));
      window.location.href = EPP_DATA.site_url + '/pathways/?soc_code=' + startSoc + '&action=edit';
      return false;
    }); // OPEN PATHWAY ON PATHWAYS PAGE

    if ($('body').hasClass('page-template-page-pathways')) {
      var url = window.location.search;

      if (url.indexOf('action=edit') !== -1) {
        // Open path (edit pathway) IS present
        var openPath = localStorage.getItem('epp_mvp_open_path');
        openPath = JSON.parse(openPath);
        $('.pathways__name-current-path span').text(openPath.pathway_name);
        $('.input--save-path-name').val(openPath.pathway_name).attr('data-initial-value', openPath.pathway_name).attr('data-row-index', openPath.row_index);
        $('.pathways__actions').removeClass('col-md-6 col-md-9 col-md-12').addClass(openPath.actions_div_class);

        if (openPath.total_occs == 2) {
          $('.pathway__progress li.step2').addClass('selected active');
        }

        if (openPath.total_occs == 3) {
          $('.pathway__progress li.step2, .pathway__progress li.step3').addClass('selected active');
        }

        if (openPath.total_occs == 4) {
          $('.pathway__progress li.step2, .pathway__progress li.step3, .pathway__progress li.step4').addClass('selected active');
        }

        $(openPath.occ_2.active_occ_selector + ' .pathway__occupation-btn').removeClass('pathway__occupation-add-btn').addClass('pathway__occupation-matches-btn').text('Show Matches');
        $(openPath.occ_2.active_occ_selector).siblings('.pathway__occupation').addClass('shrink'); // $('.pathway__occupation.selected .pathway__occupation-title').css('font-weight', '700');

        $('.pathway__group--2').find('.pathway__collapse-btn').show();

        if (openPath.total_occs == 2) {
          $('.pathway__group--2').addClass('is-last');
          $(openPath.occ_2.active_occ_selector).removeClass('active').addClass('selected'); // $(openPath.occ_2.active_occ_selector).find('.pathway__occupation-title').css('font-weight', '700');
          // var url = window.location.search;
          // if ( url.indexOf('action=edit') !== -1 ) {// Open path (edit pathway) IS present

          /* setCurrentPath();
          setTimeout(function(){
            copyDesktopOccupations();// Copy desktop occupations to mobile
          }, 100); */
          // }
          // setTimeout(function(){
          //   setCurrentPath();
          // }, 100);
        }

        if (openPath.total_occs == 3) {
          $('.pathway__group--3').addClass('is-last');
          $(openPath.occ_2.active_occ_selector).removeClass('selected').addClass('expanded');
          var startSoc = getParameterByName('soc_code');
          var socExclude = "".concat(startSoc, ",").concat(openPath.occ_2.soc_code); // $('.pathway__group--3').removeClass('d-none').css('opacity', '0');

          $('.pathway__group--3').removeClass('d-none');
          $('.pathway__group--2').addClass('has-active');
          $('.pathway__group--3 .pathway__collapse-btn').show();
          getSavedPathways(openPath.occ_2.soc_code, openPath.occ_3, openPath.total_occs, socExclude);
        }

        if (openPath.total_occs == 4) {
          $(openPath.occ_2.active_occ_selector).removeClass('selected').addClass('expanded');
          var startSoc, socExclude; // $('.pathway__group--3, .pathway__group--4').removeClass('d-none').css('opacity', '0');

          $('.pathway__group--3, .pathway__group--4').removeClass('d-none');
          $('.pathway__group--2, .pathway__group--3').addClass('has-active');
          $('.pathway__group--3 .pathway__collapse-btn, .pathway__group--4 .pathway__collapse-btn').show();
          startSoc = getParameterByName('soc_code');
          socExclude = "".concat(startSoc, ",").concat(openPath.occ_2.soc_code);
          getSavedPathways(openPath.occ_2.soc_code, openPath.occ_3, 3, socExclude); // Get third column

          socExclude = "".concat(startSoc, ",").concat(openPath.occ_2.soc_code, ",").concat(openPath.occ_3.soc_code);
          getSavedPathways(openPath.occ_3.soc_code, openPath.occ_4, openPath.total_occs, socExclude); // Get fourth column
        }

        setCurrentPath(); // setTimeout(function(){
        //   copyDesktopOccupations();// Copy desktop occupations to mobile
        // }, 100);
      }
    } // UPDATE PATHWAY NAME


    $('.input--save-path-name').blur(function () {
      var self = $(this);
      var initialVal = self.attr('data-initial-value'); // 1. Get the initial value

      var newName = self.val(); // 2. Get the actual value

      var rowIndex = self.attr('data-row-index');
      var postURL;
      var data;
      var dataServe;
      var pathways;
      var contentTypePass, contentType;

      if (initialVal != 'name this path') {
        postURL = EPP_DATA.site_url + '/wp-json/api/v1/pathways/edit';
        data = {
          'name': newName,
          'row_index': rowIndex
        };
        dataServe = data;
        contentTypePass = '';
      } else if (newName && initialVal != '') {
        postURL = EPP_DATA.site_url + '/wp-json/api/v1/pathways/save';
        pathways = localStorage.getItem('epp_mvp_current_path');
        pathways = JSON.parse(pathways);
        data = {
          'name': newName,
          'row_index': rowIndex,
          'pathways': pathways
        };
        dataServe = JSON.stringify(data);
        contentTypePass = 1;
        $('.save-pathway-popup').html("Path Saved");
        $('.save-pathway-popup').addClass('disabled');
        $('.pathway__saved-pathway-msg.alert-success').removeClass('d-none');
      } else {
        return false;
      }

      if (initialVal != newName) {
        // 3a. If they are different then update ACF and initial value attribute
        //var data = {'name': newName,'row_index': rowIndex};
        contentType = contentTypePass ? "application/json; charset=utf-8" : undefined;
        $.ajax({
          type: 'POST',
          url: postURL,
          data: dataServe,
          dataType: 'json',
          contentType: contentType,
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
          },
          success: function success(result) {
            console.log(result);

            if (newName != 0) {
              self.siblings('span').text(newName);
              self.siblings('span').show();
              self.hide();
              self.attr('data-initial-value', newName);
            }
          },
          error: function error(jqXHR, exception) {
            console.log(jqXHR);
          }
        });
      } else {
        // 3b. Otherwise revert
        self.siblings('span').show();
        self.hide();
      }
    });
  }); // document ready

  function getSavedPathways(startSoc, pathway, totalOccs, socExclude) {
    // var socCode = pathway.soc_code;
    var destination = '.pathway__groups .pathway__group--' + totalOccs;
    $.ajax({
      type: 'GET',
      url: EPP_DATA.api_url + '/occupation/distance/' + startSoc + '?rows_limit=5&soc_exclude=' + socExclude,
      // data: data,
      // dataType: 'json',
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader('x-api-key', EPP_DATA.api_key);
      },
      success: function success(result) {
        var rows = result.overlap.data.rows; // console.log(rows)

        var counter = 1;
        $(destination + ' .pathway__occupation').remove();

        for (var i = 0; i < rows.length; i++) {
          var title = truncateTitle(rows[i].title, 25);
          var riskPercent = automationPercent(rows[i].risk_end); // console.log(riskPercent);

          var salary;

          if (rows[i].salarymax_end != null) {
            salary = numberWithCommas(rows[i].salarymax_end);
          } else {
            salary = '--';
          }

          var pathwayID = createPathwayID(destination, rows[i].soc_code);
          $(destination).append('<div class="pathway__occupation pathway__occupation--' + counter + '" data-soc-code="' + rows[i].soc_code + '" data-id="occ-' + pathwayID + '">' + '<em class="pathway__occupation-skill-overlap">' + percentageDistance(rows[i].dist_all) + '% skill overlap</em>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + rows[i].soc_code + '" target="_blank" class="pathway__occupation-title" data-full-title="' + rows[i].title + '">' + title + '</a>' + '<div class="pathway__occupation-automation">' + '<span class="pathway__label">Risk of automation</span>' + '<span class="pathway__value">' + riskPercent.automation_percent + '%</span>' + '</div><!-- End .pathway__automation-risk -->' + '<div class="pathway__occupation-salary">' + '<span class="pathway__label">Median salary</span>' + '<span class="pathway__value">$' + salary + '</span>' + '</div><!-- End .pathway__salary -->' + '<div>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + rows[i].soc_code + '" class="jobs-link" target="_blank">Jobs &amp; Training</a>' + '<a href="#" class="pathway__occupation-btn pathway__occupation-add-btn" data-occ-title="' + rows[i].title + '" data-soc-code="' + rows[i].soc_code + '" data-id="btn-' + pathwayID + '">Add to path</a>' + '</div>' + '<span class="pathway__plus-btn"></span>' + '<span class="pathway__divider"></span>' + '<span class="pathway__collapsed-occupations"></span>' + '</div>');
          counter++;
        }

        var currElem = $(pathway.active_occ_selector);
        currElem.removeClass('active').addClass('selected');
        currElem.find('.pathway__occupation-btn').removeClass('pathway__occupation-add-btn').addClass('pathway__occupation-matches-btn').text('Show Matches');
        var openPath = localStorage.getItem('epp_mvp_open_path');
        openPath = JSON.parse(openPath); // $('.pathway__occupation.selected .pathway__occupation-title').css('font-weight', '700');

        setTimeout(function () {
          if (openPath.total_occs == 3 && openPath.totalOccs == 4) {
            $(openPath.occ_3.active_occ_selector).siblings('.pathway__occupation').addClass('shrink');
          }

          if (openPath.total_occs == 4) {
            $(openPath.occ_3.active_occ_selector).removeClass('selected').addClass('expanded');
            $(openPath.occ_3.active_occ_selector).siblings('.pathway__occupation').addClass('shrink');
          }
        }, 100);
        setTimeout(function () {
          var url = window.location.search;

          if (url.indexOf('action=edit') !== -1) {
            // Open path (edit pathway) IS present
            setCurrentPath();
          }

          copyDesktopOccupations(); // Copy desktop occupations to mobile
        }, 200);
        $('[data-toggle="tooltip"]').tooltip();
      },
      error: function error(jqXHR, exception) {
        console.log(jqXHR);
      }
    });
  }
  /* function setCurrentPath() {
    var openPath = localStorage.getItem('epp_mvp_open_path');
    openPath = JSON.parse(openPath);
     var currentPathway = {}, counter = 2;
    var startOccupation = createOccupationObj( $('.pathway__occupation--start') );
          
    currentPathway.path_1 = startOccupation;
          
    var limit = parseFloat(openPath.total_occs) + 1;
    var selectedOccs = $('.pathway__groups .pathway__occupation.expanded, .pathway__groups .pathway__occupation.selected');
     selectedOccs.each(function(){
      if(counter < limit){
        var occupation = createOccupationObj( $(this) );
        currentPathway[`path_${counter}`] = occupation;
        counter++;
      }
    });
    localStorage.setItem('epp_mvp_current_path', JSON.stringify(currentPathway));
  } */

})(jQuery);

(function ($) {
  "use strict";
  /*
  - Add id's to all occupations and buttons
  - always store in localstorage the last occupation you clicked on
  - make it possible to click on the plus and minus buttons to add and re-add to path
  - after user chooses an occupation from the start path input, make the start path button jump or something until they press it
  */

  $(function () {
    // $('.loading--mobile').hide();
    if ($('.pathway__occupation').length > 0) {
      localStorage.setItem('epp_mvp_last_clicked', '.pathway__occupation--start'); // Update localstorage item

      localStorage.setItem('epp_mvp_saved_path', 0);
      var url = window.location.search;

      if (url.indexOf('action=edit') === -1) {
        // Open path (edit pathway) NOT present
        if (localStorage.getItem('epp_mvp_current_path') === null) {
          // localStorage item doesn't exist, create it
          var currentOccupation = createOccupationObj($('.pathway__occupation--start')); // Pass in the starting '.pathway__occupation' div

          var currentPathway = {
            path_1: currentOccupation
          }; // Add the newly created object

          localStorage.setItem('epp_mvp_current_path', JSON.stringify(currentPathway)); // Create localstorage item
        } else {
          // localStorage item exists
          var currentPathway = localStorage.getItem('epp_mvp_current_path'); // Get current pathway localstorage item

          var currentPathway = JSON.parse(currentPathway); // Parse it as JSON object

          var startOccupation = createOccupationObj($('.pathway__occupation--start')); // Pass in the starting '.pathway__occupation' div

          currentPathway.path_1 = startOccupation; // Override the path_1 object with the newly created object
          // Clear the rest of the pathways:

          delete currentPathway.path_2;
          delete currentPathway.path_3;
          delete currentPathway.path_4;
          localStorage.setItem('epp_mvp_current_path', JSON.stringify(currentPathway)); // Update localstorage item
        }
      } // if( !isMobile() ) {// Desktop
      // if( $('.pathway__group--2 .pathway__occupation').length > 0 ) {


      copyDesktopOccupations(); // Copy desktop occupations to mobile
      // }
      // }
      // else {}
    }

    $(document).on('click', '.pathway__occupation-add-btn', function (e) {
      e.preventDefault();
      var self = $(this);
      var occID = self.closest('.pathway__occupation').attr('data-id');
      localStorage.setItem('epp_mvp_last_clicked', occID); // Update localstorage item
      // $('.pathway__occupation.selected .pathway__occupation-title').css('font-weight', '');

      if (!isMobile()) {
        selectPathwayOcc(self); // Select current parent occupation

        updateCurrentPathway(self); // Pass in the current button object

        copyDesktopOccupations(); // Copy desktop occupations to mobile
      } else {
        // $('.mobile-pathway__groups .pathway__group--2').addClass('has-selected');
        // self.closest('.pathway__group').find('.pathway__occupation').removeClass('shrink');
        selectMobilePathwayOcc(self); // Select current parent occupation

        updateCurrentPathway(self); // Pass in the current button object

        copyMobileOccupations(); // Copy mobile occupations to desktop
      } // return false;

    });
    $(document).on('click', '.pathway__occupation-matches-btn', function () {
      var self = $(this);
      var occID = self.closest('.pathway__occupation').attr('data-id');
      localStorage.setItem('epp_mvp_last_clicked', occID); // Update localstorage item

      if (self.closest('.pathway__group').hasClass('pathway__group--2')) {
        // $('.pathway__progress .step2').addClass('active');
        $('.pathway__progress .step3').addClass('selected');
      } else if (self.closest('.pathway__group').hasClass('pathway__group--3')) {
        // $('.pathway__progress .step3').addClass('active');
        $('.pathway__progress .step4').addClass('selected');
      }

      if (!isMobile()) {
        getMatchingOccs($(this));
        updateActionsDiv(); // Update the width of the actions div
      } else {
        self.closest('.pathway__occupation').siblings('.pathway__occupation').addClass('shrink');
        getMatchingMobileOccs($(this));
        updateActionsDiv(); // Update the width of the actions div

        if (self.closest('.pathway__group').hasClass('pathway__group--2')) {
          $('.pathway__occupation--start').addClass('collapsed');
        } else {
          self.closest('.pathway__group').prev('.pathway__group').find('.pathway__occupation.expanded').addClass('collapsed');
        }
      }

      return false;
    });
    $(document).on('click', '.pathway__expand-btn', function () {
      var currOccBtn,
          self = $(this); // var txt = self.text();
      // $(this).text(txt == 'Expand' ? 'Collapse' : 'Expand');

      if (self.closest('.pathway__group').find('.pathway__occupation.active').length > 0) {
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.active .pathway__occupation-btn');
      } else if (self.closest('.pathway__group').find('.pathway__occupation.expanded').length > 0) {
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.expanded .pathway__occupation-btn');
      } else {
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.selected .pathway__occupation-btn');
      }

      toggleOccupations(currOccBtn, 'expand');
      self.hide();
      return false;
    });
    $(document).on('click', '.pathway__collapse-btn', function () {
      var currOccBtn,
          self = $(this);

      if (self.closest('.pathway__group').find('.pathway__occupation.active').length > 0) {
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.active .pathway__occupation-btn');
      } else if (self.closest('.pathway__group').find('.pathway__occupation.expanded').length > 0) {
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.expanded .pathway__occupation-btn');
      } else {
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.selected .pathway__occupation-btn');
      }

      toggleOccupations(currOccBtn, 'collapse');
      self.hide();
      return false;
    });
    $(document).on('click', '.pathway__plus-btn', function () {
      var currentPathway = localStorage.getItem('epp_mvp_current_path'); // Get current pathway localstorage item

      var currentPathway = JSON.parse(currentPathway); // Parse it as JSON object

      if (!$(this).closest('.pathway__occupation').hasClass('selected') && !$(this).closest('.pathway__occupation').hasClass('active') && !$(this).closest('.pathway__occupation').hasClass('expanded') && !$(this).closest('.pathway__occupation').hasClass('collapsed')) {
        $(this).closest('.pathway__occupation').find('.pathway__occupation-btn')[0].click();
      } else if ($(this).closest('.pathway__occupation').hasClass('selected')) {
        // if occupation is selected then do the opposite (deselect it)
        $(this).closest('.pathway__occupation').removeClass('selected'); // deselect occupation

        $(this).closest('.pathway__occupation').find('.pathway__occupation-btn').removeClass('pathway__occupation-matches-btn') // Remove the matches class 
        .addClass('pathway__occupation-add-btn') // Revert to original class
        .text('Add to Path'); // Revert button text
        // Since occupation has been deselected:

        if ($(this).closest('.pathway__group').hasClass('pathway__group--2')) {
          // if group 2
          delete currentPathway.path_2; // remove all next occupations (including current) from current path object

          delete currentPathway.path_3;
          delete currentPathway.path_4;
          $('.pathway__progress .step2, .pathway__progress .step3, .pathway__progress .step4').removeClass('selected active');
          $('.pathway__progress .step2').addClass('selected');
        } else if ($(this).closest('.pathway__group').hasClass('pathway__group--3')) {
          delete currentPathway.path_3;
          delete currentPathway.path_4;
          $('.pathway__progress .step3, .pathway__progress .step4').removeClass('selected active');
          $('.pathway__progress .step3').addClass('selected');
        } else if ($(this).closest('.pathway__group').hasClass('pathway__group--4')) {
          delete currentPathway.path_4;
          $('.pathway__progress .step4').removeClass('active').addClass('selected');
        }

        localStorage.setItem('epp_mvp_current_path', JSON.stringify(currentPathway)); // Finally, copy to desktop:

        setTimeout(function () {
          copyMobileOccupations();
        });
      }

      return false;
    });
    $(document).on('click', '.view-active-pathway', function () {
      $(this).toggleClass('active');
      $('.pathway__groups, .mobile-pathway__groups, .pathway__progress-wrap').toggleClass('d-none');
      $('.current-path-holder').toggleClass('visible');
      $('.pathways__actions > div').toggleClass('viewing-current-path');
      return false;
    });
    /*--------------------------------------------------------------
    ON RESIZE COMPLETE
    --------------------------------------------------------------*/

    /* var resizeTimer;
    $(window).on('resize', function(e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if( isMobile() ) {
          console.log('is mobile!');
        }
      }, 250);
    }); */
  }); // document ready

  if ($('body').hasClass('page-template-page-pathways')) {
    $('.loading--mobile').hide();

    window.onbeforeunload = function () {
      /* if( parseFloat( localStorage.getItem('epp_mvp_saved_path') ) === 1){
        return;
      }
      else{
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'incompletePathway'
        });
        return 'You have unsaved changes. Are you sure you want to leave?';
      } */
      localStorage.setItem('epp_mvp_unsaved_path_name', $('#pathway-name-input').val());
      localStorage.setItem('epp_mvp_unsaved_path', localStorage.getItem('epp_mvp_current_path')); // localStorage.setItem('epp_mvp_save_user_path', 0 );

      localStorage.setItem('epp_mvp_redirect_url', EPP_DATA.site_url + '/saved-pathways/');
    };
  }
  /**
    * @desc Collapse/expand occupations
    * @param obj self - the clicked button
    * @param str action - whether to collapse or expand
    * @return null
  */


  function toggleOccupations(self, action) {
    if (action == 'collapse') {
      self.closest('.pathway__group').find('.pathway__occupation--2').css({
        'top': '-160px',
        'opacity': '0'
      });
      self.closest('.pathway__group').find('.pathway__occupation--3').css({
        'top': '-320px',
        'opacity': '0'
      });
      self.closest('.pathway__group').find('.pathway__occupation--4').css({
        'top': '-480px',
        'opacity': '0'
      });
      self.closest('.pathway__group').find('.pathway__occupation--5').css({
        'top': '-640px',
        'opacity': '0'
      }); // Active occupation:

      self.closest('.pathway__occupation').css({
        'z-index': '10',
        'opacity': '1'
      }); // if( self.closest('.pathway__group').hasClass('pathway__group--4') ) {
      //   self.closest('.pathway__occupation').removeClass('expanded').addClass('selected');
      // }
      // else {

      self.closest('.pathway__occupation').removeClass('expanded').addClass('active'); // }

      setTimeout(function () {
        // self.closest('.pathway__occupation').removeClass('expanded').addClass('active');
        self.closest('.pathway__group').find('.pathway__collapse-btn').hide();
        self.closest('.pathway__group').find('.pathway__expand-btn').show();
        self.closest('.pathway__occupation').siblings('.pathway__occupation').addClass('shrink');
      }, 300);
    } else if (action == 'expand') {
      self.closest('.pathway__group').find('.pathway__occupation').css({
        'top': '0',
        'opacity': '1'
      }); // self.closest('.pathway__group').find('.pathway__occupation').removeClass('collapsed');

      if (self.closest('.pathway__group').hasClass('pathway__group--4')) {
        self.closest('.pathway__group').find('.pathway__occupation.active').removeClass('active').addClass('selected');
      } else {
        self.closest('.pathway__group').find('.pathway__occupation.active').removeClass('active').addClass('expanded');
      }

      setTimeout(function () {
        self.closest('.pathway__group').find('.pathway__expand-btn').hide();
        self.closest('.pathway__group').find('.pathway__collapse-btn').show();
      }, 300);
    }
  }
  /**
    * @desc Select an occupation within current pathway on desktop
    * @param obj self - the clicked button
    * @return null
  */


  function selectPathwayOcc(self) {
    var selfParentGroup = self.closest('.pathway__group').attr('data-id'); // Get the parent group (column)

    $(".".concat(selfParentGroup, " .pathway__occupation")).removeClass('selected expanded'); // De-select all occupations within group (column)
    // For each of the next groups:

    var nextSibs = $(".".concat(selfParentGroup)).nextAll('.pathway__group'); // Get all the next groups (columns)

    if (nextSibs.length > 0) {
      // If there are any "next" groups (columns)
      nextSibs.each(function () {
        // For each of the next groups (columns):
        var siblingID = $(this).attr('data-id'); // Get the ID

        $(".".concat(siblingID, " .pathway__occupation")).remove(); // Remove all the occupations within current group (column)

        $(".".concat(siblingID, " .pathway__expand-btn, .").concat(siblingID, " .pathway__collapse-btn")).hide(); // Hide the collapse/expand buttons within current group (column)

        $(this).addClass('d-none'); // Hide current group (column)
      });
    } // -- End of next groups functionality


    self.closest('.pathway__occupation').addClass('selected'); // Select the current parent occupation

    self.closest('.pathway__occupation').siblings('.pathway__occupation').find('.pathway__occupation-btn').removeClass('pathway__occupation-matches-btn') // Remove the matches class 
    .addClass('pathway__occupation-add-btn') // Revert to original class
    .text('Add to Path'); // Revert button text

    self // Current button
    .removeClass('pathway__occupation-add-btn') // Remove original class
    .addClass('pathway__occupation-matches-btn') // Add matches class
    .text('Show Matches'); // Update button text

    if (selfParentGroup == 'pathway__group--4') {
      toggleOccupations(self, 'collapse'); // Collapse occupations
    }
  }
  /**
    * @desc Select an occupation within current pathway on mobile
    * @param obj self - the clicked button
    * @return null
  */


  function selectMobilePathwayOcc(self) {
    var selfParentGroup = self.closest('.pathway__group').attr('data-id'); // Get the parent group (column)

    $(".mobile-pathway__groups .".concat(selfParentGroup, " .pathway__occupation")).removeClass('selected expanded'); // De-select all occupations within group (column)
    // For each of the next groups:

    var nextSibs = $(".mobile-pathway__groups .".concat(selfParentGroup)).nextAll('.pathway__group'); // Get all the next groups (columns)

    if (nextSibs.length > 0) {
      // If there are any "next" groups (columns)
      nextSibs.each(function () {
        // For each of the next groups (columns):
        var siblingID = $(this).attr('data-id'); // Get the ID

        $(".mobile-pathway__groups .".concat(siblingID)).addClass('d-none').find('.pathway__occupation').remove(); // Remove all the occupations within current group (column)
        // $(`.${siblingID} .pathway__expand-btn, .${siblingID} .pathway__collapse-btn`).hide();// Hide the collapse/expand buttons within current group (column)
        // $(this).addClass('d-none');// Hide current group (column)
      }); // console.log(nextSibs);
    } // -- End of next groups functionality


    self.closest('.pathway__occupation').addClass('selected'); // Select the current parent occupation

    self.closest('.pathway__occupation').siblings('.pathway__occupation').find('.pathway__occupation-btn').removeClass('pathway__occupation-matches-btn') // Remove the matches class 
    .addClass('pathway__occupation-add-btn') // Revert to original class
    .text('Add to Path'); // Revert button text

    self // Current button
    .removeClass('pathway__occupation-add-btn') // Remove original class
    .addClass('pathway__occupation-matches-btn') // Add matches class
    .text('Show Matches'); // Update button text
  }

  function getMatchingOccs(self) {
    var socExclude;
    var startSoc = $('.pathway__start-path-btn').attr('data-soc-code');
    var socCode = self.attr('data-soc-code');
    var selfParentGroup = self.closest('.pathway__group').attr('data-id');
    var nextSib = $(".".concat(selfParentGroup)).next('.pathway__group');
    var nextSibID = nextSib.attr('data-id');
    var destination = ".".concat(nextSibID);

    if (destination == '.pathway__group--3') {
      socExclude = [startSoc, socCode]; // Excluded soc code will be first and second

      localStorage.setItem('epp_mvp_excluded_soc', socExclude); // Update the localstorage item
    } else if (destination == '.pathway__group--4') {
      var secondOcc = $('.pathway__group--2 .pathway__occupation.active, .pathway__group--2 .pathway__occupation.expanded');
      var secondSoc = secondOcc.attr('data-soc-code');
      socExclude = [startSoc, secondSoc, socCode]; // Excluded soc code will be first, second and third

      localStorage.setItem('epp_mvp_excluded_soc', socExclude);
    }

    $('.pathway__group').removeClass('is-last');
    self.closest('.pathway__occupation').removeClass('selected').addClass('expanded');
    $(destination).removeClass('d-none');
    $(".".concat(selfParentGroup)).addClass('has-active');
    setTimeout(function () {
      var excludedSoc = localStorage.getItem('epp_mvp_excluded_soc');
      $(destination).find('.loading').css('opacity', '1');
      getNextPathways(socCode, excludedSoc, destination, self);
    }, 100);
  }

  function getMatchingMobileOccs(self) {
    var socExclude;
    var startSoc = $('.pathway__start-path-btn').attr('data-soc-code');
    var socCode = self.attr('data-soc-code');
    var selfParentGroup = self.closest('.pathway__group').attr('data-id');
    var nextSib = $(".".concat(selfParentGroup)).next('.pathway__group');
    var nextSibID = nextSib.attr('data-id');
    var destination = ".mobile-pathway__groups .".concat(nextSibID); // $('.mobile-pathway__save-path').addClass('d-none');

    if (destination == '.mobile-pathway__groups .pathway__group--3') {
      socExclude = [startSoc, socCode]; // Excluded soc code will be first and second

      localStorage.setItem('epp_mvp_excluded_soc', socExclude); // Update the localstorage item
    } else if (destination == '.mobile-pathway__groups .pathway__group--4') {
      var secondOcc = $('.mobile-pathway__groups .pathway__group--2 .pathway__occupation.active, .mobile-pathway__groups .pathway__group--2 .pathway__occupation.expanded');
      var secondSoc = secondOcc.attr('data-soc-code');
      socExclude = [startSoc, secondSoc, socCode]; // Excluded soc code will be first, second and third

      localStorage.setItem('epp_mvp_excluded_soc', socExclude);
      $('.pathway__group--4').removeClass('d-none');
    }

    $('.pathway__group').removeClass('is-last');
    self.closest('.pathway__occupation').removeClass('selected').addClass('expanded'); // $(destination).removeClass('d-none');

    $(destination).css({
      'opacity': '0',
      'transform': 'translateY(-100px)'
    });
    $(".mobile-pathway__groups .".concat(selfParentGroup)).addClass('has-active');
    setTimeout(function () {
      var excludedSoc = localStorage.getItem('epp_mvp_excluded_soc');
      $('.loading--mobile').show();
      getNextMobilePathways(socCode, excludedSoc, destination, self);
    }, 100);
  }
  /**
    * @desc Update the current path localstorage item
    * @param obj self - the clicked button
    * @return none
  */


  function updateCurrentPathway(self) {
    var startOccupation = createOccupationObj($('.pathway__occupation--start')); // Pass in the '.pathway__occupation' div
    //localStorage.setItem('epp_mvp_current_path');

    if (localStorage.getItem('epp_mvp_current_path') === null) {
      // localStorage item doesn't exist, create it
      var currentOccupation = createOccupationObj($('.pathway__occupation--start')); // Pass in the starting '.pathway__occupation' div

      var currentPathway = {
        path_1: currentOccupation
      }; // Add the newly created object

      localStorage.setItem('epp_mvp_current_path', JSON.stringify(currentPathway)); // Create localstorage item
    } else {
      var currentPathway = localStorage.getItem('epp_mvp_current_path'); // Get current pathway localstorage item

      currentPathway = JSON.parse(currentPathway); // Parse it as JSON object

      var currentOccupation = createOccupationObj(self.closest('.pathway__occupation')); // Create occupation object from closest parent occupation
    }

    var loggedPath;

    if (self.closest('.pathway__group').hasClass('pathway__group--2')) {
      // If the current group is group 2
      currentPathway.path_1 = startOccupation; // Set the starting occupation in current path object

      currentPathway.path_2 = currentOccupation; // Set the current occupation in current path object

      delete currentPathway.path_3;
      delete currentPathway.path_4;
      $('.pathway__progress .step3, .pathway__progress .step4').removeClass('selected active');
      $('.pathway__progress .step2').addClass('active');
      loggedPath = "".concat(currentPathway.path_1.title, " [path 1] --> ").concat(currentPathway.path_2.title, " [path 2]");
    } else if (self.closest('.pathway__group').hasClass('pathway__group--3')) {
      currentPathway.path_3 = currentOccupation;
      delete currentPathway.path_4;
      $('.pathway__progress .step4').removeClass('selected active');
      $('.pathway__progress .step3').addClass('active');
      loggedPath = "".concat(currentPathway.path_1.title, " [path 1] --> ").concat(currentPathway.path_2.title, " [path 2] --> ").concat(currentPathway.path_3.title, " [path 3]");
    } else if (self.closest('.pathway__group').hasClass('pathway__group--4')) {
      currentPathway.path_4 = currentOccupation;
      $('.pathway__progress .step4').addClass('active');
      loggedPath = "".concat(currentPathway.path_1.title, " [path 1] --> ").concat(currentPathway.path_2.title, " [path 2] --> ").concat(currentPathway.path_3.title, " [path 3] --> ").concat(currentPathway.path_4.title, " [path 4]");
    }

    localStorage.setItem('epp_mvp_current_path', JSON.stringify(currentPathway));
    localStorage.setItem('epp_mvp_saved_path', 0);
    $('.pathway__saved-pathway-msg').addClass('d-none');
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'pathwayBuildSequence': loggedPath,
      'event': 'sequenceLogged'
    });
  }
  /**
    * @desc Auto-collapse desktop occupations when screen resize goes from mobile to desktop
    * @param none
    * @return none
  */


  function collapseDesktopOccupations() {
    // $('.pathway__groups').each(function() {
    //   if( !$(this).hasClass('.pathway__group--4') ) {
    //     var childOccs = $(this).find('.pathway__occupation');
    //     childOccs.each(function(){
    //       if( $(this).hasClass('selected') || $(this).hasClass('expanded') ) {
    //         var self = $(this).find('.pathway__occupation-btn');
    //         toggleOccupations(self, 'collapse');
    //       }
    //     });
    //   }
    // });
    $('.pathway__groups .pathway__occupation').each(function () {
      // console.log($(this));
      if ($(this).hasClass('selected') || $(this).hasClass('expanded')) {
        var self = $(this).find('.pathway__occupation-btn');
        toggleOccupations(self, 'collapse'); // console.log('self:', self);
      }
    }); // if( $('.pathway__groups .pathway__group--4 .pathway__occupation.selected').length > 0 ) {
    //   $('.pathway__groups .pathway__group--4 .pathway__expand-btn')[0].click();
    // }
  }
  /**
    * @desc Get and append next group of occupations on desktop
    * @param str socCode - the current soc code
    * @param arr socExclude - the excluded soc codes
    * @param str destination - the destination group (column)
    * @param obj self - the clicked "matches" button
    * @return none
  */


  function getNextPathways(socCode, socExclude, destination, self) {
    $.ajax({
      type: 'GET',
      url: EPP_DATA.api_url + '/occupation/distance/' + socCode + '?rows_limit=5&soc_exclude=' + socExclude,
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader('x-api-key', EPP_DATA.api_key);
      },
      success: function success(result) {
        var rows = result.overlap.data.rows; // console.log(rows);

        if (rows.length > 0) {
          // at least 1 row returned
          var counter = 1;
          $("".concat(destination, " .pathway__occupation, ").concat(destination, " .no-pathway-results")).remove(); // Clear destination before appending occupations

          for (var i = 0; i < rows.length; i++) {
            var title = truncateTitle(rows[i].title, 25); // Set the title (truncated or not)

            var riskPercent = automationPercent(rows[i].risk_end); // Calculate the risk percent

            var salary;

            if (rows[i].salarymax_end != null) {
              salary = numberWithCommas(rows[i].salarymax_end);
            } else {
              salary = '--';
            }

            var pathwayID = createPathwayID(destination, rows[i].soc_code);
            $(destination).find('.loading').css('opacity', '0'); // Remove loading animation before appending occupations

            $(destination).append('<div class="pathway__occupation pathway__occupation--' + counter + '" data-soc-code="' + rows[i].soc_code + '" style="left: -50px; opacity: 0;" data-id="occ-' + pathwayID + '">' + '<em class="pathway__occupation-skill-overlap">' + percentageDistance(rows[i].dist_all) + '% skill overlap</em>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + rows[i].soc_code + '" target="_blank" class="pathway__occupation-title" data-full-title="' + rows[i].title + '">' + title + '</a>' + '<div class="pathway__occupation-automation">' + '<span class="pathway__label">Risk of automation</span>' + '<span class="pathway__value">' + riskPercent.automation_percent + '%</span>' + '</div><!-- End .pathway__automation-risk -->' + '<div class="pathway__occupation-salary">' + '<span class="pathway__label">Median salary</span>' + '<span class="pathway__value">$' + salary + '</span>' + '</div><!-- End .pathway__salary -->' + '<div>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + rows[i].soc_code + '" class="jobs-link" target="_blank">Jobs &amp; Training</a>' + '<a href="#" class="pathway__occupation-btn pathway__occupation-add-btn" data-occ-title="' + rows[i].title + '" data-soc-code="' + rows[i].soc_code + '" data-id="btn-' + pathwayID + '">Add to path</a>' + '</div>' + '<span class="pathway__plus-btn"></span>' + '<span class="pathway__divider"></span>' + '<span class="pathway__collapsed-occupations"></span>' + '</div><!-- End .pathway__occupation -->');
            counter++;
          }

          var timeDelay = 0;
          $(destination + ' .pathway__occupation').each(function () {
            var occupation = $(this);
            setTimeout(function () {
              occupation.css({
                'opacity': '1',
                'left': '0'
              });
            }, timeDelay);
            timeDelay += 150;
          });
          setTimeout(function () {
            $(destination + ' .pathway__occupation').css({
              'opacity': '',
              'left': ''
            });
            copyDesktopOccupations(); // Copy desktop occupations to mobile

            toggleOccupations(self, 'collapse');
          }, 1100);
          $('[data-toggle="tooltip"]').tooltip();
        } // at least 1 row returned
        else {
            $(destination + ' .pathway__occupation').remove();
            $(destination).find('.loading').css('opacity', '0');
            $(destination).append('<p class="no-pathway-results text-danger">No occupations returned.</p>');
          }
      },
      error: function error(jqXHR, exception) {
        console.log(jqXHR);
      }
    });
  }
  /**
    * @desc Get and append next group of occupations on mobile
    * @param str socCode - the current soc code
    * @param arr socExclude - the excluded soc codes
    * @param str destination - the destination group (column)
    * @param obj self - the clicked "matches" button
    * @return none
  */


  function getNextMobilePathways(socCode, socExclude, destination, self) {
    $.ajax({
      type: 'GET',
      url: EPP_DATA.api_url + '/occupation/distance/' + socCode + '?rows_limit=5&soc_exclude=' + socExclude,
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader('x-api-key', EPP_DATA.api_key);
      },
      success: function success(result) {
        var rows = result.overlap.data.rows; // console.log(rows);

        if (rows.length > 0) {
          // at least 1 row returned
          var counter = 1;
          $("".concat(destination, " .pathway__occupation, ").concat(destination, " .no-pathway-results")).remove(); // Clear destination before appending occupations

          for (var i = 0; i < rows.length; i++) {
            var title = truncateTitle(rows[i].title, 25); // Set the title (truncated or not)

            var riskPercent = automationPercent(rows[i].risk_end); // Calculate the risk percent

            var salary;

            if (rows[i].salarymax_end != null) {
              salary = numberWithCommas(rows[i].salarymax_end);
            } else {
              salary = '--';
            }

            var pathwayID = createPathwayID(destination, rows[i].soc_code);
            $(destination).find('.loading').css('opacity', '0'); // Remove loading animation before appending occupations

            $(destination).append('<div class="pathway__occupation pathway__occupation--' + counter + '" data-soc-code="' + rows[i].soc_code + '" data-id="occ-' + pathwayID + '">' + '<em class="pathway__occupation-skill-overlap">' + percentageDistance(rows[i].dist_all) + '% skill overlap</em>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + rows[i].soc_code + '" target="_blank" class="pathway__occupation-title" data-full-title="' + rows[i].title + '">' + title + '</a>' + '<div class="pathway__occupation-automation">' + '<span class="pathway__label">Risk of automation</span>' + '<span class="pathway__value">' + riskPercent.automation_percent + '%</span>' + '</div><!-- End .pathway__automation-risk -->' + '<div class="pathway__occupation-salary">' + '<span class="pathway__label">Median salary</span>' + '<span class="pathway__value">$' + salary + '</span>' + '</div><!-- End .pathway__salary -->' + '<div>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + rows[i].soc_code + '" class="jobs-link" target="_blank">Jobs &amp; Training</a>' + '<a href="#" class="pathway__occupation-btn pathway__occupation-add-btn" data-occ-title="' + rows[i].title + '" data-soc-code="' + rows[i].soc_code + '" data-id="btn-' + pathwayID + '">Add to path</a>' + '</div>' + '<span class="pathway__plus-btn"></span>' + '<span class="pathway__divider"></span>' + '<span class="pathway__collapsed-occupations"></span>' + '</div>');
            counter++;
          }

          setTimeout(function () {
            $('.loading--mobile').hide();
            $(destination).removeClass('d-none');
          }, 300);
          setTimeout(function () {
            // $('.mobile-pathway__groups .pathway__occupation.shrink').hide();
            $(destination).css({
              'opacity': '1',
              'transform': 'translateY(0)'
            });
          }, 600);
          setTimeout(function () {
            // if(destination == '.mobile-pathway__groups .pathway__group--4') {
            //   $('.mobile-pathway__save-path').removeClass('d-none');
            // }
            copyMobileOccupations();
          }, 900); // setTimeout(function(){
          //   collapseDesktopOccupations();
          // }, 1000);

          $('[data-toggle="tooltip"]').tooltip();
        } // at least 1 row returned
        else {
            $(destination + ' .pathway__occupation').remove();
            $(destination).find('.loading').css('opacity', '0');
            $(destination).append('<p class="no-pathway-results text-danger">No occupations returned.</p>');
          }
      },
      error: function error(jqXHR, exception) {
        console.log(jqXHR);
      }
    });
  }
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
    /* -----------------------------
    * SAVING PATHWAYS
    ----------------------------- */
    $(document).on('click', '.save-pathway-popup', function (e) {
      if ($(this).hasClass('disabled')) {
        e.preventDefault();
        location.href = EPP_DATA.site_url + '/saved-pathways/';
      } else {
        var autoSavedOccupations = localStorage.getItem('epp_mvp_current_path'); //console.log(autoSavedOccupations);

        autoSavedOccupations = JSON.parse(autoSavedOccupations);

        if (autoSavedOccupations.path_2 !== undefined) {
          var pathwayName = $('.input--save-path-name').val();

          if (pathwayName != 'name this path' || pathwayName != '') {
            $('#pathway-name-input').val(pathwayName);
            $('label[for="pathway-name-input"]').addClass('focused');
          }

          $('#name-your-pathway').modal('show');
          $('#pathway-name-input').focus();
        } else if (autoSavedOccupations.path_2 === undefined) {
          alert('You must select 2 or more occupations!');
        }

        return false;
      }
    });
    $('#name-your-pathway-form').on('submit', function (event) {
      event.preventDefault();
      $('.pathway-name-msg').removeClass('error').addClass('d-none');
      var pathwayName = $('#pathway-name-input').val();
      var rowIndex = $('.input--save-path-name').attr('data-row-index');
      var pathways = localStorage.getItem('epp_mvp_current_path');
      pathways = JSON.parse(pathways);
      var data = {
        'name': pathwayName,
        'row_index': rowIndex,
        'pathways': pathways
      };
      var postURL; // saveEntirePathway();

      var url = window.location.search;

      if (url.indexOf('action=edit') !== -1) {
        // Open path (edit pathway) IS present
        postURL = EPP_DATA.site_url + '/wp-json/api/v1/pathways/update';
      } else {
        postURL = EPP_DATA.site_url + '/wp-json/api/v1/pathways/save';
      }

      $.ajax({
        type: 'POST',
        url: postURL,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function success(result) {
          // console.log(result);
          if (result > 0) {
            $('#name-your-pathway').modal('hide'); // $('.alert-success').toggleClass('hide show');

            $('.alert-danger').addClass('d-none');
            $('.alert-success').removeClass('d-none');
            $('.pathways__name-current-path span').html(pathwayName);
            $('.pathways__name-current-path .input--save-path-name').attr('data-initial-value', pathwayName);
            localStorage.setItem('epp_mvp_saved_path', 1);
            localStorage.setItem('epp_mvp_unsaved_path_name', '');
            localStorage.setItem('epp_mvp_unsaved_path', '');
            localStorage.setItem('epp_mvp_save_user_path', 0);

            if (isMobile()) {
              goToByScroll('#pathway__group--start', 500, 200);
            }
          } else if (result == 0) {
            // Pathway was not inserted in WP
            $('.alert-success').addClass('d-none');
            $('.alert-danger').removeClass('d-none');
          } else if (result == -1) {
            // Name already used by user
            $('#pathway-name-input').addClass('is-invalid');
            $('.pathway-name-msg').addClass('error').removeClass('d-none');
          }
        },
        error: function error(jqXHR, exception) {
          console.log(jqXHR);
        }
      });
    });
    /* -----------------------------
    * SAVED PATHWAYS
    ----------------------------- */

    if ($('.saved-pathway').length > 0) {
      // Apply the width class to determine the type of gradient
      $('.saved-pathway').each(function () {
        var childrenCount = $(this).find('.col-md-3').length;
        $(this).addClass('saved-pathway-children-' + childrenCount);
        $(this).prev('.saved-pathway__actions').addClass('row-flushed-children-' + childrenCount);
        $(this).prev('.saved-pathway__actions').find('.saved-pathway__open-btn').attr('data-total-occ', childrenCount);
      }); // Apply the starting soc code to the 'open path' button

      $('.saved-pathway').each(function () {
        var self = $(this);
        var startSocCode = $(this).find('.saved-pathway__occupation').first().attr('data-soc-code');
        $(this).prev('.saved-pathway__actions').find('.saved-pathway__open-btn').attr('data-start-occ', startSocCode); // self.nextAll('.saved-pathway__open-btn--mobile').first().find('.saved-pathway__open-btn').attr('data-start-occ', startSocCode);
      });
      $(document).on('click', '.saved-pathway__open-btn--mobile .button', function () {
        $(this).closest('.saved-pathway__open-btn--mobile').prevAll('.saved-pathway__actions').first().find('.saved-pathway__open-btn')[0].click();
        return false;
      });
    }
    /* -----------------------------
    * DELETE SAVED PATHWAYS
    ----------------------------- */


    $(document).on('click', '.saved-pathway__delete-btn', function () {
      var rowIndex = $(this).attr('data-row-index');
      $('.button--delete-saved').attr('data-row-index', rowIndex);
      $(this).closest('.row-flushed').addClass('to-be-removed');
      $(this).closest('.row-flushed').next('.saved-pathway').addClass('to-be-removed');
      $(this).closest('.row-flushed').nextAll('.saved-pathway__open-btn--mobile:first').addClass('to-be-removed');
      $('#delete-saved-modal').modal('show');
      return false;
    });
    $('#delete-saved-modal').on('hidden.bs.modal', function (e) {
      $('.row-flushed, .saved-pathway, .saved-pathway__open-btn--mobile').removeClass('to-be-removed');
      $('.button--delete-saved').attr('data-row-index', '');
    });
    $(document).on('click', '.button--delete-saved', function () {
      var self = $(this);
      var rowIndex = self.attr('data-row-index');
      var data = {
        'row_index': rowIndex
      };
      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url + '/wp-json/api/v1/pathways/delete',
        data: data,
        dataType: 'json',
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function success(result) {
          console.log(result);

          if (result == 1) {
            // Successfully deleted pathway
            $('#delete-saved-modal').modal('hide');
            $('.row-flushed.to-be-removed, .saved-pathway.to-be-removed, .saved-pathway__open-btn--mobile.to-be-removed').remove();
            setTimeout(function () {
              updateRowIndexes();
            }, 100);
          }

          if (result == 0) {
            // There was an error deleting pathway
            $('#delete-saved-modal').modal('hide');
            console.log('There was an error deleting pathway!');
          }
        },
        error: function error(jqXHR, exception) {
          console.log(jqXHR);
        }
      });
      return false;
    });
    /* -----------------------------
    * EDIT SAVED PATHWAYS NAME - ON SAVED PATH PAGE
    ----------------------------- */

    $(document).on('click', '.saved-pathway__name--edit-btn', function () {
      $(this).siblings('span').hide();
      $(this).siblings('.input--edit-path-name').show().focus();
      return false;
    });
    $('.input--edit-path-name').blur(function () {
      var self = $(this);
      var initialVal = self.attr('data-initial-value'); // 1. Get the initial value

      var newName = self.val(); // 2. Get the actual value

      var rowIndex = self.attr('data-row-index'); //$('.input--save-path-name').attr('data-row-index');

      if (initialVal != newName && newName != '') {
        // 3a. If they are different then update ACF and initial value attribute
        var data = {
          'name': newName,
          'row_index': rowIndex
        }; //var data = {'name':pathwayName, 'row_index':rowIndex, 'pathways':pathways};

        $.ajax({
          type: 'POST',
          url: EPP_DATA.site_url + '/wp-json/api/v1/pathways/edit',
          data: data,
          dataType: 'json',
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
          },
          success: function success(result) {
            console.log(result);

            if (newName != 0) {
              self.siblings('span').text(newName);
              self.siblings('span').show();
              self.hide();
              self.attr('data-initial-value', newName);
            }
          },
          error: function error(jqXHR, exception) {
            console.log(jqXHR);
          }
        });
      } else {
        // 3b. Otherwise revert
        self.siblings('span').show();
        self.hide();
      }
    });
    $('.input--edit-path-name').keyup(function (event) {
      var initialVal = $(this).attr('data-initial-value');

      if (event.keyCode === 13 || event.which === 13 || event.keyCode === 9 || event.which === 9) {
        $(this).blur();
      }

      if (event.keyCode === 27 || event.which === 27) {
        $(this).siblings('span').show();
        $(this).hide();
        $(this).val(initialVal);
      }
    });
    $(document).on('click', '.pathways__name--edit-btn', function () {
      $(this).siblings('span').hide();
      $(this).siblings('.input--save-path-name').show().focus();
      return false;
    });
    $('.input--save-path-name').blur(function () {
      var self = $(this);
      var initialVal = self.attr('data-initial-value'); // 1. Get the initial value

      var newName = self.val(); // 2. Get the actual value
      //if( initialVal !== newName && newName !== '' ) {// 3a. If they are different then update value and initial value attribute

      if (newName && newName !== '') {
        // 3a. If they are different then update value and initial value attribute
        self.siblings('span').text(newName);
        self.siblings('span').show();
        self.hide();
        self.attr('data-initial-value', newName);
      } else if (newName === '') {
        // 3b. Revert back to default value
        self.siblings('span').text('name this path');
        self.siblings('span').show();
        self.hide();
        self.attr('data-initial-value', 'name this path');
      } else {
        // 3c. Otherwise revert
        self.siblings('span').show();
        self.hide();
      }
    });
    $('.input--save-path-name').keyup(function (event) {
      var self = $(this);
      var initialVal = self.attr('data-initial-value');

      if (event.keyCode === 13 || event.which === 13 || event.keyCode === 9 || event.which === 9) {
        self.blur();
      }

      if (event.keyCode === 27 || event.which === 27) {
        self.siblings('span').show();
        self.hide();
        self.val('');

        if (initialVal != 'name this path') {
          self.val(initialVal);
        }
      }
    });
    $(document).on('click', '.save-not-logged-in', function () {
      var redirectURL = $(this).attr('href');

      if (redirectURL != '#') {
        $('#redirect-after-login').val(redirectURL);
      } else {
        $('#redirect-after-login').val('');
      }

      $('#name-your-pathway').modal('hide');
      launchLoginPopup();
      localStorage.setItem('epp_mvp_save_user_path', 1);
      return false;
    });
  }); // document ready

  function updateRowIndexes() {
    var newRowIndex = 1;
    $('.saved-pathway__actions').each(function () {
      $(this).find('.saved-pathway__delete-btn').attr('data-row-index', newRowIndex);
      $(this).find('.input--edit-path-name').attr('data-row-index', newRowIndex);
      newRowIndex++;
    });
  }
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
    $('#build-pathway-input').autocomplete({
      source: function source(request, response) {
        /* var matches = $.map(occupationTitles, function (acItem) {
            if (acItem.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
              return acItem;
            }
        });
        response(matches.slice(0, 5)); */
        var term = $.ui.autocomplete.escapeRegex(request.term),
            startsWithMatcher = new RegExp("^" + term, "i"),
            startsWith = $.grep(occupationTitles, function (value) {
          return startsWithMatcher.test(value.label || value.value || value);
        }),
            containsMatcher = new RegExp(term, "i"),
            contains = $.grep(occupationTitles, function (value) {
          return $.inArray(value, startsWith) < 0 && containsMatcher.test(value.label || value.value || value);
        });
        var matches = startsWith.concat(contains);
        response(matches.slice(0, 5));
      },
      appendTo: '#pathway-autocomplete-container',
      open: function open(event, ui) {
        var top = $('.build-pathway-autocomplete').css('top');
        top = parseFloat(top);
        $('.build-pathway-autocomplete').css('top', top - 50 + 'px');
      },
      change: function change(event, ui) {
        if (ui.item != null) {
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/pathways/?soc_code=' + ui.item.value;
        }
      },
      select: function select(event, ui) {
        event.preventDefault();
        $('#build-pathway-input').val(ui.item.label);

        if (ui.item != null) {
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/pathways/?soc_code=' + ui.item.value;
        }
      },
      focus: function focus(event, ui) {
        event.preventDefault();
        $('#build-pathway-input').val(ui.item.label); // if(ui.item != null) {
        //   selectAutocomplete(ui.item.label, ui.item.value);
        // }
      },
      response: function response(event, ui) {
        // ui.content is the array that's about to be sent to the response callback.
        if (ui.content.length === 0) {
          $('#build-pathway-input').removeClass('has-value');
        } else {
          $('#build-pathway-input').addClass('has-value');
        }
      },
      classes: {
        'ui-autocomplete': 'build-pathway-autocomplete'
      },
      close: function close(event, ui) {
        $('#build-pathway-input').removeClass('has-value');
      }
    });
    $('.build-pathway-form').on('submit', function (event) {
      event.preventDefault();
      var searchVal = $('#build-pathway-input').val();
      $('#build-pathway-input').autocomplete('search', searchVal).focus();
    });
    $('#build-pathway-input--mobile').autocomplete({
      source: function source(request, response) {
        /* var matches = $.map(occupationTitles, function (acItem) {
            if (acItem.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
              return acItem;
            }
        });
        response(matches.slice(0, 5)); */
        var term = $.ui.autocomplete.escapeRegex(request.term),
            startsWithMatcher = new RegExp("^" + term, "i"),
            startsWith = $.grep(occupationTitles, function (value) {
          return startsWithMatcher.test(value.label || value.value || value);
        }),
            containsMatcher = new RegExp(term, "i"),
            contains = $.grep(occupationTitles, function (value) {
          return $.inArray(value, startsWith) < 0 && containsMatcher.test(value.label || value.value || value);
        });
        var matches = startsWith.concat(contains);
        response(matches.slice(0, 5));
      },
      appendTo: '#pathway-autocomplete-container--mobile',
      open: function open(event, ui) {
        var top = $('.build-pathway-autocomplete--mobile').css('top');
        top = parseFloat(top);
        $('.build-pathway-autocomplete--mobile').css('top', top - 50 + 'px');
      },
      change: function change(event, ui) {
        if (ui.item != null) {
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/pathways/?soc_code=' + ui.item.value;
        }
      },
      select: function select(event, ui) {
        event.preventDefault();
        $('#build-pathway-input--mobile').val(ui.item.label);

        if (ui.item != null) {
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/pathways/?soc_code=' + ui.item.value;
        }
      },
      focus: function focus(event, ui) {
        event.preventDefault();
        $('#build-pathway-input--mobile').val(ui.item.label); // if(ui.item != null) {
        //   selectAutocomplete(ui.item.label, ui.item.value);
        // }
      },
      response: function response(event, ui) {
        // ui.content is the array that's about to be sent to the response callback.
        if (ui.content.length === 0) {
          $('#build-pathway-input--mobile').removeClass('has-value');
        } else {
          $('#build-pathway-input--mobile').addClass('has-value');
        }
      },
      classes: {
        'ui-autocomplete': 'build-pathway-autocomplete--mobile'
      },
      close: function close(event, ui) {
        $('#build-pathway-input--mobile').removeClass('has-value');
      }
    });
    $('.build-pathway-form--mobile').on('submit', function (event) {
      event.preventDefault();
      var searchVal = $('#build-pathway-input--mobile').val();
      $('#build-pathway-input--mobile').autocomplete('search', searchVal).focus();
    });
    $('.input__start-new-path').autocomplete({
      source: function source(request, response) {
        /* var matches = $.map(occupationTitles, function (acItem) {
            if (acItem.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
              return acItem;
            }
        });
        response(matches.slice(0, 5)); */
        var term = $.ui.autocomplete.escapeRegex(request.term),
            startsWithMatcher = new RegExp("^" + term, "i"),
            startsWith = $.grep(occupationTitles, function (value) {
          return startsWithMatcher.test(value.label || value.value || value);
        }),
            containsMatcher = new RegExp(term, "i"),
            contains = $.grep(occupationTitles, function (value) {
          return $.inArray(value, startsWith) < 0 && containsMatcher.test(value.label || value.value || value);
        });
        var matches = startsWith.concat(contains);
        response(matches.slice(0, 5));
      },
      appendTo: '#start-pathway-autocomplete-container',
      select: function select(event, ui) {
        event.preventDefault(); // $('.input__start-new-path').val(ui.item.label);

        $('.input__pathway-starting-occ').val(ui.item.label);
        $('.pathway__start-path-btn').attr('data-soc-code', ui.item.value);
        var socCode = ui.item.value;
        $.getJSON(EPP_DATA.site_url + '/epp-occupation-details.json', function (result) {
          var risk = parseFloat(result[socCode].auto_risk);
          var automation = Math.round(risk * 100);
          automation = automation.toString() + '%';
          var salary = calculateMedianSalary(result[socCode].salary_min, result[socCode].salary_max);
          $('.pathway__occupation--start .pathway__occupation-automation .pathway__value').text(automation);
          $('.pathway__occupation--start .pathway__occupation-salary .pathway__value').text('$' + salary.toString()); // $('.input__start-new-path').attr('data-prev-title', result[socCode].title);

          $('.input__pathway-starting-occ').attr('data-prev-title', result[socCode].title);
        }); // $('.pathway__start-path-btn').addClass('attention-bounce');

        $('.pathway__start-path-btn')[0].click();
        goToByScroll('#pathway__group--start', 500, 100);
      },
      focus: function focus(event, ui) {
        event.preventDefault(); // $('.input__start-new-path').val(ui.item.label);

        $('.input__pathway-starting-occ').val(ui.item.label);
      },
      classes: {
        'ui-autocomplete': 'start-pathway-autocomplete'
      }
    });
    $(document).on('click', '.pathway__start-path-btn', function () {
      // $(this).removeClass('attention-bounce');
      var socCode = $(this).attr('data-soc-code');

      if (socCode != '') {
        if (!isMobile()) {
          $('.pathway__group--2 .loading').css('opacity', '1');
          $('.pathway__group--2').removeClass('d-none');
          getFirstGroup(socCode, socCode, '.pathway__group--2');
        } else {
          $('.mobile-pathway__groups .pathway__group--2').css({
            'opacity': '0',
            'transform': 'translateY(-100px)'
          });
          $('.loading--mobile').show();
          $('.pathway__group--2').removeClass('d-none');
          $('.mobile-pathway__groups .pathway__group').removeClass('has-active');
          $('.pathway__group--2 .pathway__occupation, .pathway__group--2 .no-pathway-results, .pathway__group--3 .pathway__occupation, .pathway__group--3 .no-pathway-results, .pathway__group--4 .pathway__occupation, .pathway__group--4 .no-pathway-results').remove(); // Clear destination before appending occupations

          getMobileFirstGroup(socCode, socCode, '.mobile-pathway__groups .pathway__group--2');
        }

        $('.input__start-new-path').blur();
        $('.pathway__progress .step3, .pathway__progress .step4').removeClass('selected active');
        $('.pathway__progress .step2').removeClass('active').addClass('selected');
      }

      return false;
    });
    $('.start-new-path-form--desktop').on('submit', function (event) {
      event.preventDefault();
      var searchVal = $('.input__start-new-path').val();
      $('.input__start-new-path').autocomplete('search', searchVal).blur();
    });
    $('.input__start-new-path').blur(function () {
      var prevTitle = $(this).attr('data-prev-title');

      if (!$(this).val()) {
        // $('.input__start-new-path').val(prevTitle);
        $('.input__pathway-starting-occ').val(prevTitle);
        $('.start-new-path__clear').removeClass('focused');
      }
    });
    $('.input__start-new-path').keyup(function (event) {
      if ($('.input__start-new-path').val() != '') {
        $('.start-new-path__clear').addClass('focused');
      } else {
        $('.start-new-path__clear').removeClass('focused');
        $('.pathway__start-path-btn').removeClass('attention-bounce');
      }
    });
    $(document).on('click', '.start-new-path__clear', function () {
      $('.input__start-new-path').val('').focus();
      $('.pathway__start-path-btn').removeClass('attention-bounce');
      return false;
    });
  }); // document ready
})(jQuery);
/**
  * @desc Get and append first group of occupations on desktop
  * @param str socCode - the current soc code
  * @param arr socExclude - the excluded soc codes
  * @param str destination - the destination group (column)
  * @return none
*/


function getFirstGroup(socCode, socExclude, destination) {
  // var newSocExclude = [socCode];
  $.ajax({
    type: 'GET',
    url: EPP_DATA.api_url + '/occupation/distance/' + socCode + '?rows_limit=5&soc_exclude=' + socExclude,
    // data: data,
    // dataType: 'json',
    beforeSend: function beforeSend(xhr) {
      xhr.setRequestHeader('x-api-key', EPP_DATA.api_key);
    },
    success: function success(result) {
      var rows = result.overlap.data.rows;

      if (rows.length > 0) {
        var counter = 1;
        $('.pathway__group--3 .pathway__occupation, .pathway__group--4 .pathway__occupation').remove();
        $('.pathway__group--3 .expand-btn, .pathway__group--3 .collapse-btn, .pathway__group--4 .expand-btn, .pathway__group--4 .collapse-btn').hide();
        $('.pathway__group--3, .pathway__group--4').addClass('d-none');
        $("".concat(destination, " .pathway__occupation, ").concat(destination, " .no-pathway-results")).remove();
        $('.pathways__actions-btns').removeClass('empty-occ');
        $('.pathways__name-current-path').removeClass('initial-state');

        for (var i = 0; i < rows.length; i++) {
          var title = truncateTitle(rows[i].title, 25);
          var riskPercent = automationPercent(rows[i].risk_end);
          var salary;

          if (rows[i].salarymax_end != null) {
            salary = numberWithCommas(rows[i].salarymax_end);
          } else {
            salary = '--';
          }

          var pathwayID = createPathwayID(destination, rows[i].soc_code);
          $(destination).find('.loading').css('opacity', '0');
          $(destination).append('<div class="pathway__occupation pathway__occupation--' + counter + '" data-soc-code="' + rows[i].soc_code + '" style="opacity: 0; left: -50px;" data-id="occ-' + pathwayID + '">' + '<em class="pathway__occupation-skill-overlap">' + percentageDistance(rows[i].dist_all) + '% skill overlap</em>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + rows[i].soc_code + '" target="_blank" class="pathway__occupation-title" data-full-title="' + rows[i].title + '">' + title + '</a>' + '<div class="pathway__occupation-automation">' + '<span class="pathway__label">Risk of automation</span>' + '<span class="pathway__value">' + riskPercent.automation_percent + '%</span>' + '</div><!-- End .pathway__automation-risk -->' + '<div class="pathway__occupation-salary">' + '<span class="pathway__label">Median salary</span>' + '<span class="pathway__value">$' + salary + '</span>' + '</div><!-- End .pathway__salary -->' + '<div>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + rows[i].soc_code + '" class="jobs-link" target="_blank">Jobs &amp; Training</a>' + '<a href="#" class="pathway__occupation-btn pathway__occupation-add-btn" data-occ-title="' + rows[i].title + '" data-soc-code="' + rows[i].soc_code + '" data-id="btn-' + pathwayID + '">Add to path</a>' + '</div>' + '<span class="pathway__plus-btn"></span>' + '<span class="pathway__divider"></span>' + '<span class="pathway__collapsed-occupations"></span>' + '</div>');
          counter++;
        }

        var timeDelay = 0;
        $(destination + ' .pathway__occupation').each(function () {
          var self = $(this);
          setTimeout(function () {
            self.css({
              'opacity': '1',
              'left': '0'
            });
          }, timeDelay);
          timeDelay += 150;
        });
        setTimeout(function () {
          $(destination + ' .pathway__occupation').css({
            'opacity': '',
            'left': ''
          });
          copyDesktopOccupations(); // Copy desktop occupations to mobile
        }, 1100);
        $(destination).find('expand-btn').hide();
        $('.pathway__start-path-btn').removeClass('initial-state');
        $('[data-toggle="tooltip"]').tooltip();
      } // at least 1 row returned
      else {
          $(destination + ' .pathway__occupation').remove();
          $(destination).find('.loading').css('opacity', '0');
          $(destination).append('<p class="no-pathway-results text-danger">No occupations returned.</p>');
        }
    },
    error: function error(jqXHR, exception) {
      console.log(jqXHR);
    }
  });
}
/**
  * @desc Get and append first group of occupations on mobile
  * @param str socCode - the current soc code
  * @param arr socExclude - the excluded soc codes
  * @param str destination - the destination group (column)
  * @return none
*/


function getMobileFirstGroup(socCode, socExclude, destination) {
  $.ajax({
    type: 'GET',
    url: EPP_DATA.api_url + '/occupation/distance/' + socCode + '?rows_limit=5&soc_exclude=' + socExclude,
    beforeSend: function beforeSend(xhr) {
      xhr.setRequestHeader('x-api-key', EPP_DATA.api_key);
    },
    success: function success(result) {
      var rows = result.overlap.data.rows; // console.log(rows);

      if (rows.length > 0) {
        // at least 1 row returned
        var counter = 1; // $(`${destination} .pathway__occupation, ${destination} .no-pathway-results`).remove();// Clear destination before appending occupations
        // $('.pathway__group--2 .pathway__occupation, .pathway__group--2 .no-pathway-results, .pathway__group--3 .pathway__occupation, .pathway__group--3 .no-pathway-results, .pathway__group--4 .pathway__occupation, .pathway__group--4 .no-pathway-results').remove();// Clear destination before appending occupations

        $('.pathways__actions-btns').removeClass('empty-occ');
        $('.pathways__name-current-path').removeClass('initial-state');

        for (var i = 0; i < rows.length; i++) {
          var title = truncateTitle(rows[i].title, 25); // Set the title (truncated or not)

          var riskPercent = automationPercent(rows[i].risk_end); // Calculate the risk percent

          var salary;

          if (rows[i].salarymax_end != null) {
            salary = numberWithCommas(rows[i].salarymax_end);
          } else {
            salary = '--';
          }

          var pathwayID = createPathwayID(destination, rows[i].soc_code);
          $(destination).find('.loading').css('opacity', '0'); // Remove loading animation before appending occupations

          $(destination).removeClass('has-active').append('<div class="pathway__occupation pathway__occupation--' + counter + '" data-soc-code="' + rows[i].soc_code + '" data-id="occ-' + pathwayID + '">' + '<em class="pathway__occupation-skill-overlap">' + percentageDistance(rows[i].dist_all) + '% skill overlap</em>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + rows[i].soc_code + '" target="_blank" class="pathway__occupation-title" data-full-title="' + rows[i].title + '">' + title + '</a>' + '<div class="pathway__occupation-automation">' + '<span class="pathway__label">Risk of automation</span>' + '<span class="pathway__value">' + riskPercent.automation_percent + '%</span>' + '</div><!-- End .pathway__automation-risk -->' + '<div class="pathway__occupation-salary">' + '<span class="pathway__label">Median salary</span>' + '<span class="pathway__value">$' + salary + '</span>' + '</div><!-- End .pathway__salary -->' + '<div>' + '<a href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + rows[i].soc_code + '" class="jobs-link" target="_blank">Jobs &amp; Training</a>' + '<a href="#" class="pathway__occupation-btn pathway__occupation-add-btn" data-occ-title="' + rows[i].title + '" data-soc-code="' + rows[i].soc_code + '" data-id="btn-' + pathwayID + '">Add to path</a>' + '</div>' + '<span class="pathway__plus-btn"></span>' + '<span class="pathway__divider"></span>' + '<span class="pathway__collapsed-occupations"></span>' + '</div>');
          counter++;
        }

        setTimeout(function () {
          $('.loading--mobile').hide();
          $(destination).removeClass('d-none');
        }, 300);
        setTimeout(function () {
          // $('.mobile-pathway__groups .pathway__occupation.shrink').hide();
          $(destination).css({
            'opacity': '1',
            'transform': 'translateY(0)'
          });
        }, 600);
        setTimeout(function () {
          copyMobileOccupations();
          $('.mobile-pathway__groups .pathway__occupation.shrink').css('overflow', 'hidden');
        }, 900); // setTimeout(function(){
        //   collapseDesktopOccupations();
        // }, 1000);

        $('.pathway__start-path-btn').removeClass('initial-state');
        $('[data-toggle="tooltip"]').tooltip();
      } // at least 1 row returned
      else {
          $(destination + ' .pathway__occupation').remove();
          $(destination).find('.loading').css('opacity', '0');
          $(destination).append('<p class="no-pathway-results text-danger">No occupations returned.</p>');
        }
    },
    error: function error(jqXHR, exception) {
      console.log(jqXHR);
    }
  });
}

(function ($) {
  "use strict";

  $(function () {
    $('.change-password-fields').hide();

    if ($('.profile__photo--thumb img').length > 0) {
      var profilePhotoWidth = $('.profile__photo--thumb img').width();
      var profilePhotoHeight = $('.profile__photo--thumb img').height();

      if (profilePhotoHeight < profilePhotoWidth) {
        $('.profile__photo--thumb img').css({
          'height': '100%',
          'width': 'auto'
        });
      }
    }

    $('.form--update-profile').on('submit', function (event) {
      event.preventDefault();
      $('.profile__content--user-info .form-feedback').empty().addClass('d-none').removeClass('error'); // Clear error message on submit

      var fullname = $('#user-fullname').val();
      fullname = fullname.trim(); // strip leading and trailing whitespace

      var firstname = fullname.substr(0, fullname.indexOf(' ')); // Get firstname

      var lastname = fullname.substr(fullname.indexOf(' ') + 1); // Get lastname

      /* fullname = fullname.split(/(?<=^\S+)\s/);
      var firstname = fullname[0];// Get firstname
      var lastname = fullname[1];// Get lastname */

      var genderType = $('input[name="gender"]:checked').val(); // Get gender

      if (genderType == 'Custom') {
        var gender = $('#custom-gender-input').val();
      } else {
        var gender = genderType;
      } // var dob = $('#dob').val();// Get date of birth


      var month = $('#birth-month').val(); // Get date of birth

      var day = $('#birth-day').val(); // Get date of birth

      var year = $('#birth-year').val(); // Get date of birth

      if ($('#receive-notifications').prop('checked')) {
        var notifications = 'y';
      }

      if (!$('#receive-notifications').prop('checked')) {
        var notifications = 'n';
      }

      var data = {
        'firstname': firstname,
        'lastname': lastname,
        'gender': gender,
        'gender_type': genderType,
        'month': month,
        'day': day,
        'year': year,
        'notifications': notifications
      };
      console.log(data);
      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url + '/wp-json/api/v1/account/update',
        data: data,
        dataType: 'json',
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function success(result) {
          console.log(result);

          if (result.result_code == 1) {
            // Profile updated successfully
            window.location.href = EPP_DATA.site_url + '/profile/';
          }

          if (result.result_code == 0) {
            $('.profile__content--user-info .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
            $('html,body').animate({
              scrollTop: 0
            }, 200);
          }
        },
        error: function error(jqXHR, exception) {
          console.log(jqXHR);
        }
      });
    });
    $('#change-password-form').on('submit', function (event) {
      event.preventDefault();
      $('.form--change-password .form-feedback').empty().addClass('d-none').removeClass('error'); // Clear error message on submit

      var oldpass = $('#old-password').val(); // Get old passsword

      var newpass = $('#new-password').val(); // Get new password

      var data = {
        'oldpass': oldpass,
        'newpass': newpass
      };
      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url + '/wp-json/api/v1/account/update',
        data: data,
        dataType: 'json',
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function success(result) {
          // console.log(result);
          if (result.result_code == 2) {
            // Password changed successfully
            $('.form--change-password .form-feedback').removeClass('d-none error').addClass('success').append(result.message);
            $('#change-password-form input[type="password"]').val('');
            $('#change-password-form input').blur();
            $('#change-password-form')[0].reset();
          }

          if (result.result_code == 1) {
            // Old password is incorrect
            $('.form--change-password .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
          }
        },
        error: function error(jqXHR, exception) {
          console.log(jqXHR);
        }
      });
    });
    $('#photofile').mouseover(function () {
      $('.profile__photo--delete').css({
        'opacity': '1',
        'z-index': '999'
      });
    });
    $('#photofile').mouseout(function () {
      $('.profile__photo--delete').css({
        'opacity': '',
        'z-index': ''
      });
    });
    $('.profile__photo--delete').mouseover(function () {
      $('.input--photo').addClass('hover');
    });
    $('.profile__photo--delete').mouseout(function () {
      $('.input--photo').removeClass('hover');
    });
    $('#photofile').change(function (e) {
      // console.log( $('.input--photo').val() );
      // $('#photo-upload-form').submit();

      /* $('.profile__photo--thumb img').css('opacity', '0');
      $('.form--photo-upload .loading').css('opacity', '1');
      $('#upload-submit')[0].click(); */
      var fileName = e.target.files[0].name; // Get file name

      var ext = fileName.substr(fileName.lastIndexOf('.') + 1); // Get the extension
      // console.log('ext:', ext);

      if (ext == 'jpg' || ext == 'png' || ext == 'jpeg' || ext == 'gif') {
        $('.profile__photo--thumb img').css('opacity', '0');
        $('.form--photo-upload .loading').css('opacity', '1');
        $('#upload-submit')[0].click();
      } else {
        alert('Please choose a .jpg, .png, .gif or .jpeg file');
      }
    });
    $(document).on('click', '.change-password-btn', function () {
      $('.change-password-fields').slideToggle(500);
      return false;
    });
    $(document).on('click', '.forgot-password-btn', function () {
      $(this).hide();
      $('.button--send-password-reset').removeClass('d-none');
      return false;
    });
    $(document).on('click', '.profile__photo--delete', function () {
      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url + '/wp-json/api/v1/account/delete-photo',
        // data: data,
        // dataType: 'json',
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function success(result) {
          console.log(result);

          if (result == 1) {
            // Photo was deleted successfully
            location.reload();
          } else {
            console.log('There was an error processing the request.');
          }
        },
        error: function error(jqXHR, exception) {
          console.log(jqXHR);
        }
      });
      return false;
    }); // $(document).on('click', '.avatar-toggle', function(e) {
    //   e.preventDefault();
    //   console.log('avatar clicked!');
    //   return false;
    // });

    /* $('.avatar-toggle').mouseover(function(){
      // $('.input--photo').addClass('hover');
      // console.log('avatar-toggle hovered!');
      // console.log( $(this) );
      // $(this)[0].click();
      $(this).siblings('.dropdown-menu').addClass('show');
    });
     $('.avatar-toggle').mouseout(function(){
      // $(this).siblings('.dropdown-menu').removeClass('show');
    }); */
  }); // document ready
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
    /*
    triggerHook: 0 | 'onLeave' // top of viewport
    triggerHook: 0.5 (default) // middle of viewport (or just leave this option out)
    triggerHook: 1 | 'onEnter' // bottom of viewport
    .reverse(false) // doesn't remove animation when you scroll back up
    // MULTIPLE CONTAINERS:
    var controller1 = new ScrollMagic.Controller({container: "#container1"});// normal (vertical scroll)
    var controller2 = new ScrollMagic.Controller({container: "#container2", vertical: false});// horizontal scroll
    */
    var controller = new ScrollMagic.Controller(); // build scenes

    new ScrollMagic.Scene({
      triggerElement: ".home-section--slider",
      triggerHook: 0,
      offset: 80
    }).setClassToggle(".site-header", "solid") // add class toggle
    // .addIndicators() // add indicators (requires plugin)
    // .reverse(false)
    .addTo(controller); // .duration( $('#page-wrapper').outerHeight() );

    /* new ScrollMagic.Scene({triggerElement: ".home-section--slider", triggerHook: 0, offset: 80})
      .setClassToggle(".propellers", "spin") // add class toggle
      .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
      .duration( 310 ); */

    new ScrollMagic.Scene({
      triggerElement: ".home-section--slider",
      triggerHook: 0,
      offset: 80
    }) // .setClassToggle(".site-header", "solid") // add class toggle
    .setTween(".goo-1", {
      marginRight: "30%",
      ease: Linear.easeNone
    }) // .addIndicators() // add indicators (requires plugin)
    .addTo(controller).duration($('.slider').outerHeight());
    new ScrollMagic.Scene({
      triggerElement: ".home-section--slider",
      triggerHook: 0
    }) // .setClassToggle(".site-header", "solid") // add class toggle
    .setTween(".ball", {
      marginTop: "-20%",
      ease: Linear.easeNone
    }) // .addIndicators() // add indicators (requires plugin)
    .addTo(controller).duration($('.slider').outerHeight());
    new ScrollMagic.Scene({
      triggerElement: ".home-section--about",
      triggerHook: 'onEnter'
    }).setClassToggle(".home-section--about", "on-screen") // add class toggle
    // .setTween(".ball, .slider__text", {marginTop: "-40%", ease: Linear.easeNone})
    // .addIndicators() // add indicators (requires plugin)
    .addTo(controller); // .reverse(false);
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

    new ScrollMagic.Scene({
      triggerElement: ".how-it-works__info.first",
      triggerHook: 'onEnter',
      offset: 100
    }).setClassToggle(".how-it-works__info.first", "on-screen") // add class toggle
    // .addIndicators() // add indicators (requires plugin)
    .on('enter', function () {
      var oldSrc = EPP_DATA.assets_url + '/illustrations/girl-2_2x.png';
      var newSrc = EPP_DATA.assets_url + '/illustrations/girl-2_loop-1_2x.gif';
      $('.how-it-works__info .girl-2').attr('src', newSrc);
    }) // .on('leave', function () {
    //   console.log("left!");
    // })
    .addTo(controller);
    new ScrollMagic.Scene({
      triggerElement: ".how-it-works__info.second",
      triggerHook: 'onEnter',
      offset: 100
    }).setClassToggle(".how-it-works__info.second", "on-screen") // add class toggle
    // .addIndicators() // add indicators (requires plugin)
    .on('enter', function () {
      var oldSrc2 = EPP_DATA.assets_url + '/illustrations/guy-1_2x.png';
      var newSrc2 = EPP_DATA.assets_url + '/illustrations/guy-1_loop-1_2x.gif';
      $('.how-it-works__info .guy-1').attr('src', newSrc2);
    }).addTo(controller);
    new ScrollMagic.Scene({
      triggerElement: ".how-it-works__info.third",
      triggerHook: 'onEnter',
      offset: 100
    }).setClassToggle(".how-it-works__info.third", "on-screen") // add class toggle
    // .addIndicators() // add indicators (requires plugin)
    .on('enter', function () {
      var oldSrc3 = EPP_DATA.assets_url + '/illustrations/guy-2_2x.png';
      var newSrc3 = EPP_DATA.assets_url + '/illustrations/guy-2_loop-1_2x.gif';
      $('.how-it-works__info .guy-2').attr('src', newSrc3);
    }).addTo(controller);
    new ScrollMagic.Scene({
      triggerElement: ".home-section--video"
    }).setClassToggle(".home-section--video .embed-responsive", "on-screen") // add class toggle
    // .addIndicators() // add indicators (requires plugin)
    .addTo(controller); // .duration( 1120 );

    new ScrollMagic.Scene({
      triggerElement: ".home-section--future-of-work"
    }).setClassToggle(".home-section--future-of-work .report", "on-screen") // add class toggle
    // .addIndicators() // add indicators (requires plugin)
    .addTo(controller); // .duration( 1120 );

    new ScrollMagic.Scene({
      triggerElement: ".home-section--future-of-work",
      triggerHook: 'onLeave'
    }).setClassToggle(".home__cta", "on-screen") // add class toggle
    // .addIndicators() // add indicators (requires plugin)
    .addTo(controller); // .duration( 1120 );

    new ScrollMagic.Scene({
      triggerElement: "#page-wrapper",
      triggerHook: 0,
      offset: 60
    }).setClassToggle(".mobile-menu-bar, .search-occupations-btn", "solid") // add class toggle
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

    new ScrollMagic.Scene({
      triggerElement: ".site-footer-wrap",
      triggerHook: 'onEnter'
      /* , offset: -70 */

    }).setClassToggle(".home-section--partners", "on-screen") // add class toggle
    // .setTween(".home-section--partners", {marginTop: "-40%", ease: Linear.easeNone})
    // .addIndicators() // add indicators (requires plugin)
    .addTo(controller); // .duration( $('#page-wrapper').outerHeight() );
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

    new ScrollMagic.Scene({
      triggerElement: "#general"
      /* , triggerHook: 'onLeave', offset: 195 */

    }).setClassToggle(".faq__nav-item--general", "active") // add class toggle
    // .on('enter', function () {
    //   // $('.faq__nav-item--general').siblings('.faq__nav-item').removeClass('active');
    //   console.log('enter');
    // })
    // .on('leave', function () {
    //   console.log('leave');
    // })
    // .addIndicators() // add indicators (requires plugin)
    .duration(parseFloat($('#accordion--general').outerHeight()) + 95).addTo(controller);
    new ScrollMagic.Scene({
      triggerElement: "#occupation"
      /* , triggerHook: 'onLeave', offset: 195 */

    }).setClassToggle(".faq__nav-item--occupation", "active") // add class toggle
    // .on('enter', function () {
    //   $('.faq__nav-item--occupation').siblings('.faq__nav-item').removeClass('active');
    // })
    .duration(parseFloat($('#accordion--occupation').outerHeight()) + 95) // .addIndicators() // add indicators (requires plugin)
    .addTo(controller);
    new ScrollMagic.Scene({
      triggerElement: "#education"
      /* , triggerHook: 'onLeave', offset: 195 */

    }).setClassToggle(".faq__nav-item--education", "active") // add class toggle
    // .on('enter', function () {
    //   $('.faq__nav-item--education').siblings('.faq__nav-item').removeClass('active');
    // })
    .duration(parseFloat($('#accordion--education').outerHeight()) + 95) // .addIndicators() // add indicators (requires plugin)
    .addTo(controller);
    new ScrollMagic.Scene({
      triggerElement: "#jobs"
      /* , triggerHook: 'onLeave', offset: 195 */

    }).setClassToggle(".faq__nav-item--jobs", "active") // add class toggle
    // .on('enter', function () {
    //   $('.faq__nav-item--jobs').siblings('.faq__nav-item').removeClass('active');
    // })
    // .duration( parseFloat( $('#accordion--jobs').outerHeight() ) + 95 )
    // .addIndicators() // add indicators (requires plugin)
    .addTo(controller);
  }); // document ready
})(jQuery);

(function ($) {
  "use strict";

  $(function () {
    $(document).on('click', '.sign-up-btn, .launch-signup', function () {
      launchSignupPopup();
      return false;
    });
    $('#signup-form').on('submit', function (event) {
      event.preventDefault();
      $('.popup__form--signup .form-feedback').empty().addClass('d-none').removeClass('error'); // Clear error message on submit

      $('#user-email').css('border-color', ''); // Clear error highlighting on submit
      // console.log( $( this ).serialize() );

      var fullname = $('#fullname').val();
      var email = $('#user-email').val();
      var password = $('#user-password').val();
      var data = {
        'fullname': fullname,
        'email': email,
        'password': password
      };
      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url + '/wp-json/api/v1/signup',
        data: data,
        dataType: 'json',
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-EPP-WP-Key', EPP_DATA.epp_key);
        },
        success: function success(result) {
          // console.log(result);
          if (result.result_code == 1) {
            // Success
            $('.popup__form--signup .form-feedback').removeClass('d-none error').addClass('success').append(result.message);
            $.ajax({
              type: 'POST',
              url: EPP_DATA.site_url + '/wp-json/api/v1/login',
              data: data,
              dataType: 'json',
              beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader('X-EPP-WP-Key', EPP_DATA.epp_key);
              },
              success: function success(result) {
                // Log them in
                if (result.result_code == 1) {
                  location.reload();
                } else {
                  $('.popup__form--signup .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
                  $('#user-email').css('border-color', 'red');
                }
              },
              error: function error(jqXHR, exception) {
                console.log(jqXHR);
              }
            });
          }

          if (result.result_code == 0) {
            // User already exists
            $('.popup__form--signup .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
            $('#user-email').css('border-color', 'red');
          }

          if (result.result_code == 2) {
            // All fields are required
            $('.popup__form--signup .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
          }
        }
      });
      return false;
    });
    $(window).keyup(function (event) {
      if ($('.popup--signup').hasClass('active')) {
        if (event.keyCode === 27 || event.which === 27) {
          // esc key is pressed
          closePopupsEtAl();
        }
      }
    });
  }); // document ready
})(jQuery);