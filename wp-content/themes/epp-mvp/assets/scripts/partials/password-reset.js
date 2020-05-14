(function($) {
  "use strict";

  $(function() {

    $('.form--password-reset').on('submit', function(event){
      event.preventDefault();

      var newPass = $('#new-password').val();
      var newPassConfirm = $('#new-password-confirm').val();
      var userID = $('#user-id').val();
      var userLogin = $('#user-login').val();
      var key = $('#activation-key').val();

      if( newPassConfirm != newPass ){
        $('.form--password-reset .alert').addClass('alert-danger').removeClass('alert-success d-none');
        $('.form--password-reset .alert span').empty().text('Your passwords do not match');
      }
      else{
        var data = {
          'new_password' : newPass,
          'user_id' : userID,
          'user_login' : userLogin,
          'activation_key' : key
        };

        $.ajax({
          type: 'POST',
          url: EPP_DATA.site_url+'/wp-json/api/v1/account/password-reset',
          data: data,
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('X-EPP-WP-Key', EPP_DATA.epp_key);
          },
          success: function (result) {
            if( result > 0 ) {
              $('.form-label-group').remove();

              $('.form--password-reset .alert').addClass('alert-success').removeClass('alert-danger d-none');
              $('.form--password-reset .alert span').empty().html('Your password has been successfully reset. <a href="'+EPP_DATA.site_url+'" class="alert-link launch-login">Login</a>.');
            }
          },
          error: function (jqXHR, exception) {
            console.log(jqXHR);
          }
        });
      }
    });

  });// document ready

})(jQuery);