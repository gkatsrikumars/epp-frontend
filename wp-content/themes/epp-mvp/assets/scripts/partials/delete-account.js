(function($) {
  "use strict";

  $(function() {

    $(document).on( 'click', '.delete-account__btn', function() {
      if ( $('input[name="reason-for-leaving"]:checked').length > 0 ) {
        $('.reason-for-leaving-error-msg').addClass('d-none');
        $('#delete-account-modal').modal('show');
      }
      else {
        $('.reason-for-leaving-error-msg').removeClass('d-none');
      }

      return false;
    });

    $(document).on( 'click', '.button--confirm-delete', function() {
      var reason = $('input[name="reason-for-leaving"]:checked').val();
      if( reason == 'Other') {
        reason = $('#other-reason-input').val();
      }
      var data = { 'reason': reason };

      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url+'/wp-json/api/v1/account/delete',
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function (result) {
          console.log(result);
          if( result == 1){
            window.location.href = EPP_DATA.site_url+'?action=account_deleted';
          }
          else{
            $('.deletion-warning').removeClass('d-none');
            $('.deletion-warning strong').text('Error!');
            $('.deletion-warning span').text('An error occured, please try again.');
          }
        },
        error: function (jqXHR, exception) {
          console.log(jqXHR);
        }
      });

      return false;
    });

  });// document ready

})(jQuery);