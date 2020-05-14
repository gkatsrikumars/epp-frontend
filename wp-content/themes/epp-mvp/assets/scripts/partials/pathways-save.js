(function($) {
  "use strict";

  $(function() {

    /* -----------------------------
    * SAVING PATHWAYS
    ----------------------------- */
    $(document).on('click', '.save-pathway-popup', function(e) {
      if ($(this).hasClass('disabled')) {
        e.preventDefault();
        location.href = EPP_DATA.site_url + '/saved-pathways/';
      } else {

        var autoSavedOccupations = localStorage.getItem('epp_mvp_current_path');
        //console.log(autoSavedOccupations);
        autoSavedOccupations = JSON.parse(autoSavedOccupations);

        if (autoSavedOccupations.path_2 !== undefined) {
          var pathwayName = $('.input--save-path-name').val();
          if (pathwayName != 'name this path' || pathwayName != '') {
            $('#pathway-name-input').val(pathwayName);
            $('label[for="pathway-name-input"]').addClass('focused');
          }
          $('#name-your-pathway').modal('show');
          $('#pathway-name-input').focus();
        }
        else if (autoSavedOccupations.path_2 === undefined) {
          alert('You must select 2 or more occupations!');
        }
        return false;
      }
    });

    $('#name-your-pathway-form').on('submit', function(event){
      event.preventDefault();

      $('.pathway-name-msg').removeClass('error').addClass('d-none');

      var pathwayName = $('#pathway-name-input').val();

      var rowIndex = $('.input--save-path-name').attr('data-row-index');

      var pathways = localStorage.getItem('epp_mvp_current_path');
          pathways = JSON.parse(pathways);
      var data = {'name':pathwayName, 'row_index':rowIndex, 'pathways':pathways};
      var postURL;

      // saveEntirePathway();

      var url = window.location.search;
      if ( url.indexOf('action=edit') !== -1 ) {// Open path (edit pathway) IS present
        postURL = EPP_DATA.site_url+'/wp-json/api/v1/pathways/update';
      }
      else {
        postURL = EPP_DATA.site_url+'/wp-json/api/v1/pathways/save';
      }

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
          // console.log(result);
          if( result > 0 ) {
            $('#name-your-pathway').modal('hide');
            // $('.alert-success').toggleClass('hide show');
            $('.alert-danger').addClass('d-none');
            $('.alert-success').removeClass('d-none');
            $('.pathways__name-current-path span').html(pathwayName);
            $('.pathways__name-current-path .input--save-path-name').attr('data-initial-value', pathwayName);
            localStorage.setItem('epp_mvp_saved_path', 1);
            
            localStorage.setItem('epp_mvp_unsaved_path_name', '');
            localStorage.setItem('epp_mvp_unsaved_path', '');
            localStorage.setItem('epp_mvp_save_user_path', 0 );
            
            if( isMobile() ) {
              goToByScroll('#pathway__group--start', 500, 200);
            }
          }
          else if( result == 0 ) {// Pathway was not inserted in WP
            $('.alert-success').addClass('d-none');
            $('.alert-danger').removeClass('d-none');
          }
          else if( result == -1 ) {// Name already used by user
            $('#pathway-name-input').addClass('is-invalid');
            $('.pathway-name-msg').addClass('error').removeClass('d-none');
          }
        },
        error: function (jqXHR, exception) {
          console.log(jqXHR);
        }
      });

    });

    /* -----------------------------
    * SAVED PATHWAYS
    ----------------------------- */

    if( $('.saved-pathway').length > 0 ) {
      // Apply the width class to determine the type of gradient
      $('.saved-pathway').each(function() {
        var childrenCount = $(this).find('.col-md-3').length;
        $(this).addClass('saved-pathway-children-'+childrenCount);
        $(this).prev('.saved-pathway__actions').addClass('row-flushed-children-'+childrenCount);
        $(this).prev('.saved-pathway__actions').find('.saved-pathway__open-btn').attr('data-total-occ', childrenCount);
      });

      // Apply the starting soc code to the 'open path' button
      $('.saved-pathway').each(function() {
        var self = $(this);
        var startSocCode = $(this).find('.saved-pathway__occupation').first().attr('data-soc-code');
        $(this).prev('.saved-pathway__actions').find('.saved-pathway__open-btn').attr('data-start-occ', startSocCode);
        // self.nextAll('.saved-pathway__open-btn--mobile').first().find('.saved-pathway__open-btn').attr('data-start-occ', startSocCode);
      });

      $(document).on('click', '.saved-pathway__open-btn--mobile .button', function() {
        $(this).closest('.saved-pathway__open-btn--mobile').prevAll('.saved-pathway__actions').first().find('.saved-pathway__open-btn')[0].click();
        return false;
      });
    }

    /* -----------------------------
    * DELETE SAVED PATHWAYS
    ----------------------------- */

    $(document).on( 'click', '.saved-pathway__delete-btn', function() {
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

    $(document).on( 'click', '.button--delete-saved', function() {
      var self = $(this);
      var rowIndex = self.attr('data-row-index');

      var data = {'row_index': rowIndex};

      $.ajax({
        type: 'POST',
        url: EPP_DATA.site_url+'/wp-json/api/v1/pathways/delete',
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
        },
        success: function (result) {
          console.log(result);
          if(result == 1){// Successfully deleted pathway
            $('#delete-saved-modal').modal('hide');
            $('.row-flushed.to-be-removed, .saved-pathway.to-be-removed, .saved-pathway__open-btn--mobile.to-be-removed').remove();
            setTimeout(function(){
              updateRowIndexes();
            }, 100);
          }
          if(result == 0){// There was an error deleting pathway
            $('#delete-saved-modal').modal('hide');
            console.log('There was an error deleting pathway!');
          }
        },
        error: function (jqXHR, exception) {
          console.log(jqXHR);
        }
      });

      return false;
    });

    /* -----------------------------
    * EDIT SAVED PATHWAYS NAME - ON SAVED PATH PAGE
    ----------------------------- */
    $(document).on('click', '.saved-pathway__name--edit-btn', function(){
      $(this).siblings('span').hide();
      $(this).siblings('.input--edit-path-name').show().focus();
      return false;
    });

    $('.input--edit-path-name').blur(function() {
      var self = $(this);
      var initialVal = self.attr('data-initial-value');// 1. Get the initial value
      var newName = self.val();// 2. Get the actual value
      var rowIndex = self.attr('data-row-index');
      //$('.input--save-path-name').attr('data-row-index');


      if( initialVal != newName && newName != '' ) {// 3a. If they are different then update ACF and initial value attribute


        var data = {'name': newName,'row_index': rowIndex};
        //var data = {'name':pathwayName, 'row_index':rowIndex, 'pathways':pathways};

        $.ajax({
          type: 'POST',
          url: EPP_DATA.site_url+'/wp-json/api/v1/pathways/edit',
          data: data,
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('X-WP-Nonce', EPP_DATA.nonce);
          },
          success: function (result) {
            console.log(result);
            if (newName != 0) {
              self.siblings('span').text(newName);
              self.siblings('span').show();
              self.hide();
              self.attr('data-initial-value', newName);
            }
          },
          error: function (jqXHR, exception) {
            console.log(jqXHR);
          }
        });
      }
      else {// 3b. Otherwise revert
        self.siblings('span').show();
        self.hide();
      }
    });

    $('.input--edit-path-name').keyup(function(event) {
      var initialVal = $(this).attr('data-initial-value');

      if (event.keyCode === 13 || event.which === 13 || event.keyCode === 9 || event.which === 9) {
        $(this).blur();
      }
      if(event.keyCode === 27 || event.which === 27) {
        $(this).siblings('span').show();
        $(this).hide();
        $(this).val(initialVal);
      }
    });

    $(document).on('click', '.pathways__name--edit-btn', function(){
      $(this).siblings('span').hide();
      $(this).siblings('.input--save-path-name').show().focus();
      return false;
    });

    $('.input--save-path-name').blur(function() {
      var self = $(this);
      var initialVal = self.attr('data-initial-value');// 1. Get the initial value
      var newName = self.val();// 2. Get the actual value

      //if( initialVal !== newName && newName !== '' ) {// 3a. If they are different then update value and initial value attribute
      if( newName && newName !== '' ) {// 3a. If they are different then update value and initial value attribute
        self.siblings('span').text(newName);
        self.siblings('span').show();
        self.hide();
        self.attr('data-initial-value', newName);
      }
      else if(newName === '') {// 3b. Revert back to default value
        self.siblings('span').text('name this path');
        self.siblings('span').show();
        self.hide();
        self.attr('data-initial-value', 'name this path');
      }
      else {// 3c. Otherwise revert
        self.siblings('span').show();
        self.hide();
      }
    });

    $('.input--save-path-name').keyup(function(event) {
      var self = $(this);
      var initialVal = self.attr('data-initial-value');

      if (event.keyCode === 13 || event.which === 13 || event.keyCode === 9 || event.which === 9) {
        self.blur();
      }
      if(event.keyCode === 27 || event.which === 27) {
        self.siblings('span').show();
        self.hide();
        self.val('');
        if(initialVal != 'name this path') {
          self.val(initialVal);
        }
      }
    });

    $(document).on('click', '.save-not-logged-in', function(){
      var redirectURL = $(this).attr('href');
      if( redirectURL != '#' ) {
        $('#redirect-after-login').val(redirectURL);
      }
      else {
        $('#redirect-after-login').val('');
      }
      $('#name-your-pathway').modal('hide');
      launchLoginPopup();

      localStorage.setItem('epp_mvp_save_user_path', 1);

      return false;
    });

  });// document ready

  function updateRowIndexes(){
    var newRowIndex = 1;
    
    $('.saved-pathway__actions').each(function(){
      $(this).find('.saved-pathway__delete-btn').attr('data-row-index', newRowIndex);
      $(this).find('.input--edit-path-name').attr('data-row-index', newRowIndex);
      newRowIndex++;
    });
  }

})(jQuery);