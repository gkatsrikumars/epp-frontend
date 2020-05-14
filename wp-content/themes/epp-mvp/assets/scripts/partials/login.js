(function($) {
  "use strict";

  $(function() {

    $(document).on('click', '.login-btn', function() {
      launchLoginPopup();
      return false;
    });

    $('#login-form').on('submit', function(event){
      event.preventDefault();

      $('.popup__form--login .form-feedback').empty().addClass('d-none').removeClass('error');// Clear error message on submit

      var email = $('#login-email').val();
      var password = $('#login-password').val();
      var redirect = $('#redirect-after-login').val();
      var data = { 'email': email, 'password': password, 'redirect': redirect };

      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url+'/wp-json/api/v1/login',
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-EPP-WP-Key', EPP_DATA.epp_key);
        },
        success: function (result) {
          if( result.result_code == 1){// Success with no redirect URL
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'loggedInUser': result.user_id,
              'event': 'userLogin'
            });
            setTimeout(function() {
              location.reload();
            }, 100);
            // console.log(result);
          }
          if( result.result_code == 2){// Success AND contains redirect URL
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'loggedInUser': result.user_id,
              'event': 'userLogin'
            });
            setTimeout(function() {
              window.location.href = result.redirect_url;
            }, 100);
            // console.log(result);
          }
          if( result.result_code == 0){// Wrong email and/or password
            $('.popup__form--login .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
          }
        },
        error: function (jqXHR, exception) {
          console.log(jqXHR);
        }
      });
      
    });

    $(window).keyup(function(event) {
      if( $('.popup--login').hasClass('active') ) {
        if (event.keyCode === 27 || event.which === 27) {// esc key is pressed
          closePopupsEtAl();
        }
      }
    });

  });// document ready

})(jQuery);