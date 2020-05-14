(function($) {
  "use strict";

  $(function() {

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

    $(document).on( 'click', '.occupation__bookmark-btn', function() {
      var currElem = $(this);

      if( currElem.hasClass('bookmark-not-logged-in') ) {
        localStorage.setItem( 'epp_mvp_bookmark_job_id', currElem.attr('data-job-id') );
        localStorage.setItem( 'epp_mvp_bookmark_job_title', currElem.attr('data-job-title') );

        var redirectURL = currElem.attr('href');
        /* if( redirectURL != '#' ) {
          $('#redirect-after-login').val(redirectURL);
        }
        else {
          $('#redirect-after-login').val('');
        } */
        localStorage.setItem('epp_mvp_redirect_url', redirectURL);

        launchLoginPopup();
      }
      else{
        var action = 'delete';
  
        if( currElem.hasClass('not-bookmarked') ) {
          action = 'add';
        }
        else if( currElem.hasClass('bookmarked') ) {
          action = 'delete';
        }

        var jobID = currElem.attr('data-job-id');
        var jobTitle = currElem.attr('data-job-title');
  
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
            if(result == 1){// Job does NOT exist in bookmarks and was added
              currElem.addClass('bookmarked').removeClass('not-bookmarked');
              currElem.text('Bookmarked');
              currElem.attr('title', 'Remove from Bookmarks');
            }
            if(result == 3){// Job DOES exist in bookmarks and was deleted
              currElem.addClass('not-bookmarked').removeClass('bookmarked');
              currElem.text('Bookmark Occupation');
              currElem.attr('title', 'Add to Bookmarks');
            }
          },
          error: function (jqXHR, exception) {
            console.log(jqXHR);
          }
        });
      }

      return false;
    });

    $(document).on( 'click', '.bookmarked-occupation__delete-btn', function() {
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

    $(document).on( 'click', '.button--delete-bookmark', function() {
      var currElem = $(this);
      var jobID = currElem.attr('data-job-id');
      var jobTitle = currElem.attr('data-job-title');
      var action = 'delete';

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
          // if(result == 1){// Job does NOT exist in bookmarks and was added
          //   $('#delete-bookmark-modal').modal('hide');
          //   $('.bookmarked-occupation.to-be-removed').remove();
          // }
          if(result == 3){// Job DOES exist in bookmarks and was deleted
            $('#delete-bookmark-modal').modal('hide');
            // $('.bookmarked-occupation.to-be-removed').addClass('zoomOut animated');
            // setTimeout(function(){
            //   $('.bookmarked-occupation.zoomOut').remove();
            // }, 1000);
            $('.bookmarked-occupation.to-be-removed').remove();
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