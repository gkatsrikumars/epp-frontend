(function($) {
  "use strict";

  $(function() {

    /*
    1) User clicks 'open pathway' button
    2) A localstorage item gets created (epp_mvp_open_path) with the soc codes in the pathway (except the first)
    3) The user gets redirected to the pathways page with the first soc code populated in the url and a query string '&action=edit'
     When query string is present then different actions take place:
    4) The second soc code will populate the second column, and the third, fourth...
    5) The '.pathway__occupation' with the 'data-soc-code' attribute that matches the second soc code with get a class of 'expanded', and the third, fourth...
    */

    // SAVED PATHWAYS PAGE
    $(document).on('click', '.saved-pathway__open-btn', function() {
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

      $(this).closest('.saved-pathway__actions').next('.saved-pathway').find('.saved-pathway__occupation').each(function() {
        var socCode = $(this).attr('data-soc-code');

        // SAVED PATH OBJECT:
        savedPathways['occ_'+counter] = {
          'soc_code': socCode,
          'active_occ_selector': '.pathway__group--' + counter + ' .pathway__occupation[data-soc-code="' + socCode + '"]'
        };

        counter++;
      });

      localStorage.setItem('epp_mvp_open_path', JSON.stringify(savedPathways));

      window.location.href = EPP_DATA.site_url+'/pathways/?soc_code=' + startSoc + '&action=edit';

      return false;
    });

    // OPEN PATHWAY ON PATHWAYS PAGE
    if( $('body').hasClass('page-template-page-pathways') ) {

      var url = window.location.search;
      if ( url.indexOf('action=edit') !== -1 ) {// Open path (edit pathway) IS present

        var openPath = localStorage.getItem('epp_mvp_open_path');
        openPath = JSON.parse(openPath);

        $('.pathways__name-current-path span').text(openPath.pathway_name);
        $('.input--save-path-name')
        .val(openPath.pathway_name)
        .attr('data-initial-value', openPath.pathway_name)
        .attr('data-row-index', openPath.row_index);

        $('.pathways__actions').removeClass('col-md-6 col-md-9 col-md-12').addClass(openPath.actions_div_class);
        
        if( openPath.total_occs == 2 ) {
          $('.pathway__progress li.step2').addClass('selected active');
        }
        if( openPath.total_occs == 3 ) {
          $('.pathway__progress li.step2, .pathway__progress li.step3').addClass('selected active');
        }
        if( openPath.total_occs == 4 ) {
          $('.pathway__progress li.step2, .pathway__progress li.step3, .pathway__progress li.step4').addClass('selected active');
        }

        $(openPath.occ_2.active_occ_selector + ' .pathway__occupation-btn').removeClass('pathway__occupation-add-btn').addClass('pathway__occupation-matches-btn').text('Show Matches');
        
        $(openPath.occ_2.active_occ_selector).siblings('.pathway__occupation').addClass('shrink');

        // $('.pathway__occupation.selected .pathway__occupation-title').css('font-weight', '700');

        $('.pathway__group--2').find('.pathway__collapse-btn').show();

        if( openPath.total_occs == 2 ){
          $('.pathway__group--2').addClass('is-last');
          $(openPath.occ_2.active_occ_selector).removeClass('active').addClass('selected');
          // $(openPath.occ_2.active_occ_selector).find('.pathway__occupation-title').css('font-weight', '700');

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

        if( openPath.total_occs == 3 ){
          $('.pathway__group--3').addClass('is-last');
          
          $(openPath.occ_2.active_occ_selector).removeClass('selected').addClass('expanded');

          
          var startSoc = getParameterByName('soc_code');
          var socExclude = `${startSoc},${openPath.occ_2.soc_code}`;
          
          // $('.pathway__group--3').removeClass('d-none').css('opacity', '0');
          $('.pathway__group--3').removeClass('d-none');
          $('.pathway__group--2').addClass('has-active');
          $('.pathway__group--3 .pathway__collapse-btn').show();
          
          getSavedPathways(openPath.occ_2.soc_code, openPath.occ_3, openPath.total_occs, socExclude);
        }

        if( openPath.total_occs == 4 ){
          $(openPath.occ_2.active_occ_selector).removeClass('selected').addClass('expanded');

          var startSoc, socExclude;

          // $('.pathway__group--3, .pathway__group--4').removeClass('d-none').css('opacity', '0');
          $('.pathway__group--3, .pathway__group--4').removeClass('d-none');
          $('.pathway__group--2, .pathway__group--3').addClass('has-active');
          $('.pathway__group--3 .pathway__collapse-btn, .pathway__group--4 .pathway__collapse-btn').show();
          
          startSoc = getParameterByName('soc_code');
          socExclude = `${startSoc},${openPath.occ_2.soc_code}`;
          getSavedPathways(openPath.occ_2.soc_code, openPath.occ_3, 3, socExclude);// Get third column

          socExclude = `${startSoc},${openPath.occ_2.soc_code},${openPath.occ_3.soc_code}`;
          getSavedPathways(openPath.occ_3.soc_code, openPath.occ_4, openPath.total_occs, socExclude);// Get fourth column
        }

        setCurrentPath();
        // setTimeout(function(){
        //   copyDesktopOccupations();// Copy desktop occupations to mobile
        // }, 100);

      }

    }

    // UPDATE PATHWAY NAME
    $('.input--save-path-name').blur(function() {
      var self = $(this);
      var initialVal = self.attr('data-initial-value');// 1. Get the initial value
      var newName = self.val();// 2. Get the actual value
      var rowIndex = self.attr('data-row-index');
      var postURL;
      var data;
      var dataServe;
      var pathways;
      var contentTypePass, contentType;

      if ( initialVal != 'name this path' ) {
        postURL = EPP_DATA.site_url+'/wp-json/api/v1/pathways/edit';
        data = {'name': newName,'row_index': rowIndex};
        dataServe = data;
        contentTypePass = '';
      }
      else if ( newName && initialVal != '' ) {
        postURL = EPP_DATA.site_url+'/wp-json/api/v1/pathways/save';
        pathways = localStorage.getItem('epp_mvp_current_path');
        pathways = JSON.parse(pathways);
        data = {'name': newName,'row_index': rowIndex, 'pathways':pathways};
        dataServe = JSON.stringify(data);
        contentTypePass = 1;
        $('.save-pathway-popup').html("Path Saved");
        $('.save-pathway-popup').addClass('disabled');
        $('.pathway__saved-pathway-msg.alert-success').removeClass('d-none');
      } else {
        return false;
      }

      if( initialVal != newName ) {// 3a. If they are different then update ACF and initial value attribute
        //var data = {'name': newName,'row_index': rowIndex};
        contentType = contentTypePass ? "application/json; charset=utf-8" : undefined;

        $.ajax({
          type: 'POST',
          url: postURL,
          data: dataServe,
          dataType: 'json',
          contentType: contentType,
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

  });// document ready

  function getSavedPathways(startSoc, pathway, totalOccs, socExclude) {
    // var socCode = pathway.soc_code;
    var destination = '.pathway__groups .pathway__group--' + totalOccs;
  
    $.ajax({
      type: 'GET',
      url: EPP_DATA.api_url + '/occupation/distance/'+ startSoc +'?rows_limit=5&soc_exclude='+socExclude,
      // data: data,
      // dataType: 'json',
      beforeSend: function(xhr){
        xhr.setRequestHeader('x-api-key', EPP_DATA.api_key);
      },
      success: function (result) {
        var rows = result.overlap.data.rows;
        // console.log(rows)
  
        var counter = 1;
        $(destination + ' .pathway__occupation').remove();
  
        for (var i = 0; i < rows.length; i++) {
          var title = truncateTitle(rows[i].title, 25);
          
          var riskPercent = automationPercent( rows[i].risk_end );
          // console.log(riskPercent);
  
          var salary;
          if( rows[i].salarymax_end != null ) {
            salary = numberWithCommas(rows[i].salarymax_end);
          }
          else {
            salary = '--';
          }

          var pathwayID = createPathwayID(destination, rows[i].soc_code);

          $(destination).append(
            '<div class="pathway__occupation pathway__occupation--'+counter+'" data-soc-code="' + rows[i].soc_code + '" data-id="occ-' + pathwayID + '">' +
  
              '<em class="pathway__occupation-skill-overlap">' + percentageDistance(rows[i].dist_all) + '% skill overlap</em>' +
  
              '<a href="' + EPP_DATA.site_url +'/occupation/?soc_code=' + rows[i].soc_code + '" target="_blank" class="pathway__occupation-title" data-full-title="' + rows[i].title + '">' +
                title +
              '</a>' +
  
              '<div class="pathway__occupation-automation">' +
                '<span class="pathway__label">Risk of automation</span>' +
                '<span class="pathway__value">' + riskPercent.automation_percent + '%</span>' +
              '</div><!-- End .pathway__automation-risk -->' +
  
              '<div class="pathway__occupation-salary">' +
                '<span class="pathway__label">Median salary</span>' +
                '<span class="pathway__value">$' + salary + '</span>' +
              '</div><!-- End .pathway__salary -->' +
  
              '<div>'+
                '<a href="' + EPP_DATA.site_url +'/occupation/?soc_code=' + rows[i].soc_code + '" class="jobs-link" target="_blank">Jobs &amp; Training</a>' +
                '<a href="#" class="pathway__occupation-btn pathway__occupation-add-btn" data-occ-title="' + rows[i].title + '" data-soc-code="' + rows[i].soc_code + '" data-id="btn-' + pathwayID + '">Add to path</a>' +
              '</div>' +

              '<span class="pathway__plus-btn"></span>' +
              '<span class="pathway__divider"></span>' +

              '<span class="pathway__collapsed-occupations"></span>' +
  
            '</div>'
          );

          counter++;
        }

        var currElem = $(pathway.active_occ_selector);

        currElem.removeClass('active').addClass('selected');
        currElem.find('.pathway__occupation-btn').removeClass('pathway__occupation-add-btn').addClass('pathway__occupation-matches-btn').text('Show Matches');

        var openPath = localStorage.getItem('epp_mvp_open_path');
        openPath = JSON.parse(openPath);

        // $('.pathway__occupation.selected .pathway__occupation-title').css('font-weight', '700');

        setTimeout(function(){
          if( openPath.total_occs == 3 && openPath.totalOccs == 4 ){
            $(openPath.occ_3.active_occ_selector).siblings('.pathway__occupation').addClass('shrink');
          }

          if( openPath.total_occs == 4 ){
            $(openPath.occ_3.active_occ_selector).removeClass('selected').addClass('expanded');
            $(openPath.occ_3.active_occ_selector).siblings('.pathway__occupation').addClass('shrink');
          }
        }, 100);

        setTimeout(function(){
          var url = window.location.search;
          if ( url.indexOf('action=edit') !== -1 ) {// Open path (edit pathway) IS present
            setCurrentPath();
          }
          copyDesktopOccupations();// Copy desktop occupations to mobile
        }, 200);
  
        $('[data-toggle="tooltip"]').tooltip();
      },
      error: function (jqXHR, exception) {
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