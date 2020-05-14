(function($) {
  "use strict";

  $(function() {

    $('#build-pathway-input').autocomplete({
      source: function (request, response) {
        /* var matches = $.map(occupationTitles, function (acItem) {
            if (acItem.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
              return acItem;
            }
        });
        response(matches.slice(0, 5)); */
        var term = $.ui.autocomplete.escapeRegex(request.term),
        startsWithMatcher = new RegExp("^" + term, "i"),
        startsWith = $.grep(occupationTitles, function(value) {
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
      open: function( event, ui ) {
        var top = $('.build-pathway-autocomplete').css('top');
        top = parseFloat(top);
        $('.build-pathway-autocomplete').css('top', (top - 50) + 'px');
      },
      change: function( event, ui ) {
        if(ui.item != null) {
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/pathways/?soc_code=' + ui.item.value;
        }
      },
      select: function( event, ui ) {
        event.preventDefault();
        $('#build-pathway-input').val(ui.item.label);
        if(ui.item != null) {
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/pathways/?soc_code=' + ui.item.value;
        }
      },
      focus: function( event, ui ) {
        event.preventDefault();
        $('#build-pathway-input').val(ui.item.label);
        // if(ui.item != null) {
        //   selectAutocomplete(ui.item.label, ui.item.value);
        // }
      },
      response: function(event, ui) {
        // ui.content is the array that's about to be sent to the response callback.
        if (ui.content.length === 0) {
          $('#build-pathway-input').removeClass('has-value');
        } else {
          $('#build-pathway-input').addClass('has-value');
        }
      },
      classes: {
        'ui-autocomplete': 'build-pathway-autocomplete',
      },
      close: function( event, ui ) {
        $('#build-pathway-input').removeClass('has-value');
      }
    });

    $('.build-pathway-form').on('submit', function(event){
      event.preventDefault();
      var searchVal = $('#build-pathway-input').val();
      $('#build-pathway-input').autocomplete('search', searchVal).focus();
    });

    $('#build-pathway-input--mobile').autocomplete({
      source: function (request, response) {
        /* var matches = $.map(occupationTitles, function (acItem) {
            if (acItem.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
              return acItem;
            }
        });
        response(matches.slice(0, 5)); */
        var term = $.ui.autocomplete.escapeRegex(request.term),
        startsWithMatcher = new RegExp("^" + term, "i"),
        startsWith = $.grep(occupationTitles, function(value) {
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
      open: function( event, ui ) {
        var top = $('.build-pathway-autocomplete--mobile').css('top');
        top = parseFloat(top);
        $('.build-pathway-autocomplete--mobile').css('top', (top - 50) + 'px');
      },
      change: function( event, ui ) {
        if(ui.item != null) {
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/pathways/?soc_code=' + ui.item.value;
        }
      },
      select: function( event, ui ) {
        event.preventDefault();
        $('#build-pathway-input--mobile').val(ui.item.label);
        if(ui.item != null) {
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/pathways/?soc_code=' + ui.item.value;
        }
      },
      focus: function( event, ui ) {
        event.preventDefault();
        $('#build-pathway-input--mobile').val(ui.item.label);
        // if(ui.item != null) {
        //   selectAutocomplete(ui.item.label, ui.item.value);
        // }
      },
      response: function(event, ui) {
        // ui.content is the array that's about to be sent to the response callback.
        if (ui.content.length === 0) {
          $('#build-pathway-input--mobile').removeClass('has-value');
        } else {
          $('#build-pathway-input--mobile').addClass('has-value');
        }
      },
      classes: {
        'ui-autocomplete': 'build-pathway-autocomplete--mobile',
      },
      close: function( event, ui ) {
        $('#build-pathway-input--mobile').removeClass('has-value');
      }
    });

    $('.build-pathway-form--mobile').on('submit', function(event){
      event.preventDefault();
      var searchVal = $('#build-pathway-input--mobile').val();
      $('#build-pathway-input--mobile').autocomplete('search', searchVal).focus();
    });

    $('.input__start-new-path').autocomplete({
      source: function (request, response) {
        /* var matches = $.map(occupationTitles, function (acItem) {
            if (acItem.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
              return acItem;
            }
        });
        response(matches.slice(0, 5)); */
        var term = $.ui.autocomplete.escapeRegex(request.term),
        startsWithMatcher = new RegExp("^" + term, "i"),
        startsWith = $.grep(occupationTitles, function(value) {
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
      select: function( event, ui ) {
        event.preventDefault();
        // $('.input__start-new-path').val(ui.item.label);
        $('.input__pathway-starting-occ').val(ui.item.label);
        $('.pathway__start-path-btn').attr('data-soc-code', ui.item.value);
        var socCode = ui.item.value;

        $.getJSON( EPP_DATA.site_url+'/epp-occupation-details.json', function(result) {
          var risk = parseFloat( result[socCode].auto_risk );
          var automation = Math.round(risk * 100);
          automation = automation.toString() + '%';
      
          var salary = calculateMedianSalary(result[socCode].salary_min, result[socCode].salary_max);

          $('.pathway__occupation--start .pathway__occupation-automation .pathway__value').text(automation);
          $('.pathway__occupation--start .pathway__occupation-salary .pathway__value').text('$' + salary.toString());
          // $('.input__start-new-path').attr('data-prev-title', result[socCode].title);
          $('.input__pathway-starting-occ').attr('data-prev-title', result[socCode].title);
        });

        // $('.pathway__start-path-btn').addClass('attention-bounce');
        $('.pathway__start-path-btn')[0].click();
        goToByScroll('#pathway__group--start', 500, 100);
      },
      focus: function( event, ui ) {
        event.preventDefault();
        // $('.input__start-new-path').val(ui.item.label);
        $('.input__pathway-starting-occ').val(ui.item.label);
      },
      classes: {
        'ui-autocomplete': 'start-pathway-autocomplete',
      },
    });

    $(document).on('click', '.pathway__start-path-btn', function(){
      // $(this).removeClass('attention-bounce');
      var socCode = $(this).attr('data-soc-code');

      if( socCode != '' ) {
        
        if( !isMobile() ) {
          $('.pathway__group--2 .loading').css('opacity', '1');
          $('.pathway__group--2').removeClass('d-none');
          getFirstGroup(socCode, socCode, '.pathway__group--2');
        }
        else {
          $('.mobile-pathway__groups .pathway__group--2').css({
            'opacity': '0',
            'transform': 'translateY(-100px)'
          });
          $('.loading--mobile').show();
          $('.pathway__group--2').removeClass('d-none');
          $('.mobile-pathway__groups .pathway__group').removeClass('has-active');
          $('.pathway__group--2 .pathway__occupation, .pathway__group--2 .no-pathway-results, .pathway__group--3 .pathway__occupation, .pathway__group--3 .no-pathway-results, .pathway__group--4 .pathway__occupation, .pathway__group--4 .no-pathway-results').remove();// Clear destination before appending occupations
          getMobileFirstGroup(socCode, socCode, '.mobile-pathway__groups .pathway__group--2');
        }

        $('.input__start-new-path').blur();

        $('.pathway__progress .step3, .pathway__progress .step4').removeClass('selected active');
        $('.pathway__progress .step2').removeClass('active').addClass('selected');

      }
      
      return false;
    });

    $('.start-new-path-form--desktop').on('submit', function(event){
      event.preventDefault();
      var searchVal = $('.input__start-new-path').val();
      $('.input__start-new-path').autocomplete('search', searchVal).blur();
    });

    $('.input__start-new-path').blur(function(){
      var prevTitle = $(this).attr('data-prev-title');
      if( !$(this).val() ) {
        // $('.input__start-new-path').val(prevTitle);
        $('.input__pathway-starting-occ').val(prevTitle);
        $('.start-new-path__clear').removeClass('focused');
      }
    });

    $('.input__start-new-path').keyup(function(event) {
      if( $('.input__start-new-path').val() != '' ) {
        $('.start-new-path__clear').addClass('focused');
      }
      else{
        $('.start-new-path__clear').removeClass('focused');
        $('.pathway__start-path-btn').removeClass('attention-bounce');
      }
    });

    $(document).on('click', '.start-new-path__clear', function() {
      $('.input__start-new-path').val('').focus();
      $('.pathway__start-path-btn').removeClass('attention-bounce');
      return false;
    });

  });// document ready

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
    url: EPP_DATA.api_url + '/occupation/distance/'+ socCode +'?rows_limit=5&soc_exclude='+socExclude,
    // data: data,
    // dataType: 'json',
    beforeSend: function(xhr){
      xhr.setRequestHeader('x-api-key', EPP_DATA.api_key);
    },
    success: function (result) {
      var rows = result.overlap.data.rows;

      if( rows.length > 0 ) {

        var counter = 1;

        $('.pathway__group--3 .pathway__occupation, .pathway__group--4 .pathway__occupation').remove();
        $('.pathway__group--3 .expand-btn, .pathway__group--3 .collapse-btn, .pathway__group--4 .expand-btn, .pathway__group--4 .collapse-btn').hide();
        $('.pathway__group--3, .pathway__group--4').addClass('d-none');

        $(`${destination} .pathway__occupation, ${destination} .no-pathway-results`).remove();

        $('.pathways__actions-btns').removeClass('empty-occ');
        $('.pathways__name-current-path').removeClass('initial-state');

        for (var i = 0; i < rows.length; i++) {
          var title = truncateTitle(rows[i].title, 25);
          
          var riskPercent = automationPercent( rows[i].risk_end );

          var salary;
          if( rows[i].salarymax_end != null ) {
            salary = numberWithCommas(rows[i].salarymax_end);
          }
          else {
            salary = '--';
          }

          var pathwayID = createPathwayID(destination, rows[i].soc_code);

          $(destination).find('.loading').css('opacity', '0');

          $(destination).append(
            '<div class="pathway__occupation pathway__occupation--'+counter+'" data-soc-code="' + rows[i].soc_code + '" style="opacity: 0; left: -50px;" data-id="occ-' + pathwayID + '">' +

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

        var timeDelay = 0;
        $(destination + ' .pathway__occupation').each(function(){
          var self = $(this);
          setTimeout(function(){
            self.css({
              'opacity': '1',
              'left': '0'
            });
          }, timeDelay);
          timeDelay += 150;
        });

        setTimeout(function(){
          $(destination + ' .pathway__occupation').css({
            'opacity': '',
            'left': ''
          });
          copyDesktopOccupations();// Copy desktop occupations to mobile
        }, 1100);

        $(destination).find('expand-btn').hide();

        $('.pathway__start-path-btn').removeClass('initial-state');

        $('[data-toggle="tooltip"]').tooltip();

      }// at least 1 row returned
      else{
        $(destination + ' .pathway__occupation').remove();
        $(destination).find('.loading').css('opacity', '0');
        $(destination).append('<p class="no-pathway-results text-danger">No occupations returned.</p>');
      }
    },
    error: function (jqXHR, exception) {
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
    beforeSend: function(xhr){
      xhr.setRequestHeader('x-api-key', EPP_DATA.api_key);
    },
    success: function (result) {
      var rows = result.overlap.data.rows;
      // console.log(rows);

      if( rows.length > 0 ) {// at least 1 row returned

        var counter = 1;

        // $(`${destination} .pathway__occupation, ${destination} .no-pathway-results`).remove();// Clear destination before appending occupations
        // $('.pathway__group--2 .pathway__occupation, .pathway__group--2 .no-pathway-results, .pathway__group--3 .pathway__occupation, .pathway__group--3 .no-pathway-results, .pathway__group--4 .pathway__occupation, .pathway__group--4 .no-pathway-results').remove();// Clear destination before appending occupations

        $('.pathways__actions-btns').removeClass('empty-occ');
        $('.pathways__name-current-path').removeClass('initial-state');

        for (var i = 0; i < rows.length; i++) {
          var title = truncateTitle(rows[i].title, 25);// Set the title (truncated or not)
          
          var riskPercent = automationPercent( rows[i].risk_end );// Calculate the risk percent

          var salary;
          if( rows[i].salarymax_end != null ) {
            salary = numberWithCommas(rows[i].salarymax_end);
          }
          else {
            salary = '--';
          }

          var pathwayID = createPathwayID(destination, rows[i].soc_code);

          $(destination).find('.loading').css('opacity', '0');// Remove loading animation before appending occupations

          $(destination).removeClass('has-active').append(
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

        setTimeout(function(){
          $('.loading--mobile').hide();
          $(destination).removeClass('d-none');
        }, 300);

        setTimeout(function(){
          // $('.mobile-pathway__groups .pathway__occupation.shrink').hide();
          $(destination).css({'opacity': '1', 'transform': 'translateY(0)'});
        }, 600);

        setTimeout(function(){
          copyMobileOccupations();
          $('.mobile-pathway__groups .pathway__occupation.shrink').css('overflow', 'hidden');
        }, 900);

        // setTimeout(function(){
        //   collapseDesktopOccupations();
        // }, 1000);

        $('.pathway__start-path-btn').removeClass('initial-state');

        $('[data-toggle="tooltip"]').tooltip();

      }// at least 1 row returned
      else{
        $(destination + ' .pathway__occupation').remove();
        $(destination).find('.loading').css('opacity', '0');
        $(destination).append('<p class="no-pathway-results text-danger">No occupations returned.</p>');
      }
    },
    error: function (jqXHR, exception) {
      console.log(jqXHR);
    }
  });
}