(function($) {
  "use strict";

  $(function() {

    $(document).on('click', '.sign-up-btn, .launch-signup', function() {
      launchSignupPopup();
      return false;
    });

    $('#signup-form').on('submit', function(event){
      event.preventDefault();

      $('.popup__form--signup .form-feedback').empty().addClass('d-none').removeClass('error');// Clear error message on submit
      $('#user-email').css('border-color', '');// Clear error highlighting on submit

      // console.log( $( this ).serialize() );
      var fullname = $('#fullname').val();
      var email = $('#user-email').val();
      var password = $('#user-password').val();

      var data = { 'fullname': fullname, 'email': email, 'password': password }

      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url+'/wp-json/api/v1/signup',
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-EPP-WP-Key', EPP_DATA.epp_key);
        },
        success: function(result) {
          // console.log(result);
          if(result.result_code == 1){// Success
            $('.popup__form--signup .form-feedback').removeClass('d-none error').addClass('success').append(result.message);

            $.ajax({
              type: 'POST',
              url: EPP_DATA.site_url+'/wp-json/api/v1/login',
              data: data,
              dataType: 'json',
              beforeSend: function (xhr) {
                xhr.setRequestHeader('X-EPP-WP-Key', EPP_DATA.epp_key);
              },
              success: function (result) {// Log them in
                if( result.result_code == 1){
                  location.reload();
                }
                else{
                  $('.popup__form--signup .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
                  $('#user-email').css('border-color', 'red');
                }
              },
              error: function (jqXHR, exception) {
                console.log(jqXHR);
              }
            });
          }
          if(result.result_code == 0){// User already exists
            $('.popup__form--signup .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
            $('#user-email').css('border-color', 'red');
          }
          if(result.result_code == 2){// All fields are required
            $('.popup__form--signup .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
          }
        }
      });

      return false;
      
    });

    $(window).keyup(function(event) {
      if( $('.popup--signup').hasClass('active') ) {
        if (event.keyCode === 27 || event.which === 27) {// esc key is pressed
          closePopupsEtAl();
        }
      }
    });

  });// document ready

})(jQuery);