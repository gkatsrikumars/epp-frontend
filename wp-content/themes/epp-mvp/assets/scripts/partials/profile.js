(function($) {
  "use strict";

  $(function() {

    $('.change-password-fields').hide();

    if( $('.profile__photo--thumb img').length > 0 ){
      var profilePhotoWidth = $('.profile__photo--thumb img').width();
      var profilePhotoHeight = $('.profile__photo--thumb img').height();
      if( profilePhotoHeight < profilePhotoWidth ) {
        $('.profile__photo--thumb img').css({
          'height': '100%',
          'width': 'auto'
        });
      }
    }

    $('.form--update-profile').on('submit', function(event){
      event.preventDefault();

      $('.profile__content--user-info .form-feedback').empty().addClass('d-none').removeClass('error');// Clear error message on submit

      var fullname = $('#user-fullname').val();
      fullname = fullname.trim();// strip leading and trailing whitespace
      var firstname = fullname.substr( 0, fullname.indexOf(' ') );// Get firstname
      var lastname = fullname.substr( fullname.indexOf(' ')+1 );// Get lastname

      /* fullname = fullname.split(/(?<=^\S+)\s/);
      var firstname = fullname[0];// Get firstname
      var lastname = fullname[1];// Get lastname */
      
      var genderType = $('input[name="gender"]:checked').val();// Get gender
      if( genderType == 'Custom' ){
        var gender = $('#custom-gender-input').val();
      }
      else{
        var gender = genderType;
      }

      // var dob = $('#dob').val();// Get date of birth
      var month = $('#birth-month').val();// Get date of birth
      var day = $('#birth-day').val();// Get date of birth
      var year = $('#birth-year').val();// Get date of birth

      if( $('#receive-notifications').prop('checked') ) {
        var notifications = 'y';
      }
      if( !$('#receive-notifications').prop('checked') ) {
        var notifications = 'n';
      }

      var data = {
        'firstname': firstname,
        'lastname': lastname,
        'gender': gender,
        'gender_type' : genderType,
        'month': month,
        'day': day,
        'year': year,
        'notifications': notifications
      };

      console.log(data);

      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url+'/wp-json/api/v1/account/update',
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function (result) {
          console.log(result);
          if( result.result_code == 1){// Profile updated successfully
            window.location.href = EPP_DATA.site_url+'/profile/';
          }
          if( result.result_code == 0){
            $('.profile__content--user-info .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
            $('html,body').animate({
              scrollTop: 0},
            200);
          }
        },
        error: function (jqXHR, exception) {
          console.log(jqXHR);
        }
      });
      
    });

    $('#change-password-form').on('submit', function(event){
      event.preventDefault();

      $('.form--change-password .form-feedback').empty().addClass('d-none').removeClass('error');// Clear error message on submit
      
      var oldpass = $('#old-password').val();// Get old passsword
      var newpass = $('#new-password').val();// Get new password

      var data = {
        'oldpass': oldpass,
        'newpass': newpass
      };

      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url+'/wp-json/api/v1/account/update',
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function (result) {
          // console.log(result);
          if( result.result_code == 2){// Password changed successfully
            $('.form--change-password .form-feedback').removeClass('d-none error').addClass('success').append(result.message);

            $('#change-password-form input[type="password"]').val('');
            $('#change-password-form input').blur();
            $('#change-password-form')[0].reset();
          }
          if( result.result_code == 1){// Old password is incorrect
            $('.form--change-password .form-feedback').removeClass('d-none success').addClass('error').append(result.message);
          }
        },
        error: function (jqXHR, exception) {
          console.log(jqXHR);
        }
      });
      
    });

    $('#photofile').mouseover(function(){
      $('.profile__photo--delete').css({
        'opacity': '1',
        'z-index': '999'
      });
    });

    $('#photofile').mouseout(function(){
      $('.profile__photo--delete').css({
        'opacity': '',
        'z-index': ''
      });
    });

    $('.profile__photo--delete').mouseover(function(){
      $('.input--photo').addClass('hover');
    });

    $('.profile__photo--delete').mouseout(function(){
      $('.input--photo').removeClass('hover');
    });

    $('#photofile').change(function(e){
      // console.log( $('.input--photo').val() );
      // $('#photo-upload-form').submit();
      /* $('.profile__photo--thumb img').css('opacity', '0');
      $('.form--photo-upload .loading').css('opacity', '1');
      $('#upload-submit')[0].click(); */
      
      var fileName = e.target.files[0].name;// Get file name
      var ext = fileName.substr( (fileName.lastIndexOf('.') +1) );// Get the extension

      // console.log('ext:', ext);

      if( ext == 'jpg' || ext == 'png' || ext == 'jpeg' || ext == 'gif' ) {
        $('.profile__photo--thumb img').css('opacity', '0');
        $('.form--photo-upload .loading').css('opacity', '1');
        $('#upload-submit')[0].click();
      }
      else{
        alert('Please choose a .jpg, .png, .gif or .jpeg file');
      }
    });

    $(document).on('click', '.change-password-btn', function() {
      $('.change-password-fields').slideToggle(500);
      return false;
    });

    $(document).on('click', '.forgot-password-btn', function() {
      $(this).hide();
      $('.button--send-password-reset').removeClass('d-none');
      return false;
    });

    $(document).on('click', '.profile__photo--delete', function() {
      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url+'/wp-json/api/v1/account/delete-photo',
        // data: data,
        // dataType: 'json',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function (result) {
          console.log(result);
          if( result == 1){// Photo was deleted successfully
            location.reload();
          }
          else{
            console.log('There was an error processing the request.');
          }
        },
        error: function (jqXHR, exception) {
          console.log(jqXHR);
        }
      });

      return false;
    });

    // $(document).on('click', '.avatar-toggle', function(e) {
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
    
  });// document ready

})(jQuery);