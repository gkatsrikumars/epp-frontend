(function($) {
  "use strict";

  /*
  - Add id's to all occupations and buttons
  - always store in localstorage the last occupation you clicked on
  - make it possible to click on the plus and minus buttons to add and re-add to path
  - after user chooses an occupation from the start path input, make the start path button jump or something until they press it
  */

  $(function() {

    // $('.loading--mobile').hide();

    if( $('.pathway__occupation').length > 0 ) {

      localStorage.setItem('epp_mvp_last_clicked', '.pathway__occupation--start');// Update localstorage item
      localStorage.setItem('epp_mvp_saved_path', 0);

      var url = window.location.search;
      if ( url.indexOf('action=edit') === -1 ) {// Open path (edit pathway) NOT present

        if (localStorage.getItem('epp_mvp_current_path') === null) {// localStorage item doesn't exist, create it
          var currentOccupation = createOccupationObj( $('.pathway__occupation--start') );// Pass in the starting '.pathway__occupation' div
          var currentPathway = { path_1 : currentOccupation };// Add the newly created object
          localStorage.setItem('epp_mvp_current_path', JSON.stringify(currentPathway));// Create localstorage item
        }
        else{// localStorage item exists
          var currentPathway = localStorage.getItem('epp_mvp_current_path');// Get current pathway localstorage item
          var currentPathway = JSON.parse(currentPathway);// Parse it as JSON object
          var startOccupation = createOccupationObj( $('.pathway__occupation--start') );// Pass in the starting '.pathway__occupation' div
          currentPathway.path_1 = startOccupation;// Override the path_1 object with the newly created object
          // Clear the rest of the pathways:
          delete currentPathway.path_2;
          delete currentPathway.path_3;
          delete currentPathway.path_4;
          localStorage.setItem('epp_mvp_current_path', JSON.stringify(currentPathway));// Update localstorage item
        }

      }

      // if( !isMobile() ) {// Desktop
        // if( $('.pathway__group--2 .pathway__occupation').length > 0 ) {
          copyDesktopOccupations();// Copy desktop occupations to mobile
        // }
      // }
      // else {}

    }

    $(document).on('click', '.pathway__occupation-add-btn', function(e) {
      e.preventDefault();
      var self = $(this);

      var occID = self.closest('.pathway__occupation').attr('data-id');
      localStorage.setItem('epp_mvp_last_clicked', occID);// Update localstorage item

      // $('.pathway__occupation.selected .pathway__occupation-title').css('font-weight', '');

      if( !isMobile() ) {
        selectPathwayOcc(self);// Select current parent occupation
        updateCurrentPathway(self);// Pass in the current button object
        copyDesktopOccupations();// Copy desktop occupations to mobile
      }
      else{
        // $('.mobile-pathway__groups .pathway__group--2').addClass('has-selected');
        // self.closest('.pathway__group').find('.pathway__occupation').removeClass('shrink');
        selectMobilePathwayOcc(self);// Select current parent occupation
        updateCurrentPathway(self);// Pass in the current button object
        copyMobileOccupations();// Copy mobile occupations to desktop
      }

      // return false;
    });

    $(document).on('click', '.pathway__occupation-matches-btn', function() {
      var self = $(this);

      var occID = self.closest('.pathway__occupation').attr('data-id');
      localStorage.setItem('epp_mvp_last_clicked', occID);// Update localstorage item

      if( self.closest('.pathway__group').hasClass('pathway__group--2') ) {
        // $('.pathway__progress .step2').addClass('active');
        $('.pathway__progress .step3').addClass('selected');
      }
      else if( self.closest('.pathway__group').hasClass('pathway__group--3') ) {
        // $('.pathway__progress .step3').addClass('active');
        $('.pathway__progress .step4').addClass('selected');
      }

      if( !isMobile() ) {
        getMatchingOccs( $(this) );
        updateActionsDiv();// Update the width of the actions div
      }
      else{
        self.closest('.pathway__occupation').siblings('.pathway__occupation').addClass('shrink');
        getMatchingMobileOccs( $(this) );
        updateActionsDiv();// Update the width of the actions div
        if( self.closest('.pathway__group').hasClass('pathway__group--2') ) {
          $('.pathway__occupation--start').addClass('collapsed');
        }
        else {
          self.closest('.pathway__group').prev('.pathway__group').find('.pathway__occupation.expanded').addClass('collapsed');
        }
      }

      return false;
    });

    $(document).on('click', '.pathway__expand-btn', function() {
      var currOccBtn, self = $(this);

      // var txt = self.text();
      // $(this).text(txt == 'Expand' ? 'Collapse' : 'Expand');
      
      if( self.closest('.pathway__group').find('.pathway__occupation.active').length > 0 ) {
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.active .pathway__occupation-btn');
      }
      else if( self.closest('.pathway__group').find('.pathway__occupation.expanded').length > 0 ){
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.expanded .pathway__occupation-btn');
      }
      else{
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.selected .pathway__occupation-btn');
      }

      toggleOccupations(currOccBtn, 'expand');
      self.hide();

      return false;
    });

    $(document).on('click', '.pathway__collapse-btn', function() {
      var currOccBtn, self = $(this);
      
      if( self.closest('.pathway__group').find('.pathway__occupation.active').length > 0 ) {
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.active .pathway__occupation-btn');
      }
      else if( self.closest('.pathway__group').find('.pathway__occupation.expanded').length > 0 ){
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.expanded .pathway__occupation-btn');
      }
      else{
        currOccBtn = self.closest('.pathway__group').find('.pathway__occupation.selected .pathway__occupation-btn');
      }

      toggleOccupations(currOccBtn, 'collapse');
      self.hide();

      return false;
    });
    
    $(document).on('click', '.pathway__plus-btn', function() {
      var currentPathway = localStorage.getItem('epp_mvp_current_path');// Get current pathway localstorage item
      var currentPathway = JSON.parse(currentPathway);// Parse it as JSON object

      if( !$(this).closest('.pathway__occupation').hasClass('selected') && !$(this).closest('.pathway__occupation').hasClass('active') && !$(this).closest('.pathway__occupation').hasClass('expanded') && !$(this).closest('.pathway__occupation').hasClass('collapsed') ) {
        $(this).closest('.pathway__occupation').find('.pathway__occupation-btn')[0].click();
      }
      else if( $(this).closest('.pathway__occupation').hasClass('selected') ) {// if occupation is selected then do the opposite (deselect it)
        $(this).closest('.pathway__occupation').removeClass('selected');// deselect occupation
        $(this).closest('.pathway__occupation').find('.pathway__occupation-btn')
          .removeClass('pathway__occupation-matches-btn')// Remove the matches class 
          .addClass('pathway__occupation-add-btn')// Revert to original class
          .text('Add to Path');// Revert button text

          // Since occupation has been deselected:
          if( $(this).closest('.pathway__group').hasClass('pathway__group--2') ) {// if group 2
            delete currentPathway.path_2;// remove all next occupations (including current) from current path object
            delete currentPathway.path_3;
            delete currentPathway.path_4;
            $('.pathway__progress .step2, .pathway__progress .step3, .pathway__progress .step4').removeClass('selected active');
            $('.pathway__progress .step2').addClass('selected');
          }
          else if( $(this).closest('.pathway__group').hasClass('pathway__group--3') ) {
            delete currentPathway.path_3;
            delete currentPathway.path_4;
            $('.pathway__progress .step3, .pathway__progress .step4').removeClass('selected active');
            $('.pathway__progress .step3').addClass('selected');
          }
          else if( $(this).closest('.pathway__group').hasClass('pathway__group--4') ) {
            delete currentPathway.path_4;
            $('.pathway__progress .step4').removeClass('active').addClass('selected');
          }

          localStorage.setItem('epp_mvp_current_path', JSON.stringify(currentPathway));

          // Finally, copy to desktop:
          setTimeout(function() {
            copyMobileOccupations();
          });
      }

      return false;
    });

    $(document).on('click', '.view-active-pathway', function() {
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
  
  });// document ready

  if( $('body').hasClass('page-template-page-pathways') ){
    
    $('.loading--mobile').hide();
    
    window.onbeforeunload = function(){
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
      localStorage.setItem('epp_mvp_unsaved_path_name', $('#pathway-name-input').val() );
      localStorage.setItem('epp_mvp_unsaved_path', localStorage.getItem('epp_mvp_current_path') );
      // localStorage.setItem('epp_mvp_save_user_path', 0 );
      localStorage.setItem('epp_mvp_redirect_url', EPP_DATA.site_url+'/saved-pathways/');
    };
   
    
  }

  /**
    * @desc Collapse/expand occupations
    * @param obj self - the clicked button
    * @param str action - whether to collapse or expand
    * @return null
  */
  function toggleOccupations(self, action) {

    if( action == 'collapse' ) {
      
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
      });
      // Active occupation:
      self.closest('.pathway__occupation').css({
        'z-index': '10',
        'opacity': '1'
      });

      // if( self.closest('.pathway__group').hasClass('pathway__group--4') ) {
      //   self.closest('.pathway__occupation').removeClass('expanded').addClass('selected');
      // }
      // else {
        self.closest('.pathway__occupation').removeClass('expanded').addClass('active');
      // }
      
      setTimeout(function(){
        // self.closest('.pathway__occupation').removeClass('expanded').addClass('active');
        self.closest('.pathway__group').find('.pathway__collapse-btn').hide();
        self.closest('.pathway__group').find('.pathway__expand-btn').show();
        self.closest('.pathway__occupation').siblings('.pathway__occupation').addClass('shrink');
      }, 300);

    }
    
    else if( action == 'expand' ) {

      self.closest('.pathway__group').find('.pathway__occupation').css({
        'top': '0',
        'opacity': '1'
      });
      // self.closest('.pathway__group').find('.pathway__occupation').removeClass('collapsed');

      if( self.closest('.pathway__group').hasClass('pathway__group--4') ) {
        self.closest('.pathway__group').find('.pathway__occupation.active').removeClass('active').addClass('selected');
      }
      else {
        self.closest('.pathway__group').find('.pathway__occupation.active').removeClass('active').addClass('expanded');
      }

      setTimeout(function(){
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
  function selectPathwayOcc(self){

    var selfParentGroup = self.closest('.pathway__group').attr('data-id');// Get the parent group (column)

    $(`.${selfParentGroup} .pathway__occupation`).removeClass('selected expanded');// De-select all occupations within group (column)

    // For each of the next groups:
    var nextSibs = $(`.${selfParentGroup}`).nextAll('.pathway__group');// Get all the next groups (columns)
    if(nextSibs.length > 0) {// If there are any "next" groups (columns)
      nextSibs.each(function(){// For each of the next groups (columns):
        var siblingID = $(this).attr('data-id');// Get the ID
        $(`.${siblingID} .pathway__occupation`).remove();// Remove all the occupations within current group (column)
        $(`.${siblingID} .pathway__expand-btn, .${siblingID} .pathway__collapse-btn`).hide();// Hide the collapse/expand buttons within current group (column)
        $(this).addClass('d-none');// Hide current group (column)
      });
    }
    // -- End of next groups functionality

    self.closest('.pathway__occupation').addClass('selected');// Select the current parent occupation

    self.closest('.pathway__occupation')
      .siblings('.pathway__occupation')
      .find('.pathway__occupation-btn').removeClass('pathway__occupation-matches-btn')// Remove the matches class 
      .addClass('pathway__occupation-add-btn')// Revert to original class
      .text('Add to Path');// Revert button text

    self// Current button
      .removeClass('pathway__occupation-add-btn')// Remove original class
      .addClass('pathway__occupation-matches-btn')// Add matches class
      .text('Show Matches');// Update button text

    if( selfParentGroup == 'pathway__group--4' ) {
      toggleOccupations( self, 'collapse' );// Collapse occupations
    }
    
  }

  /**
    * @desc Select an occupation within current pathway on mobile
    * @param obj self - the clicked button
    * @return null
  */
 function selectMobilePathwayOcc(self){

  var selfParentGroup = self.closest('.pathway__group').attr('data-id');// Get the parent group (column)

  $(`.mobile-pathway__groups .${selfParentGroup} .pathway__occupation`).removeClass('selected expanded');// De-select all occupations within group (column)

  // For each of the next groups:
  var nextSibs = $(`.mobile-pathway__groups .${selfParentGroup}`).nextAll('.pathway__group');// Get all the next groups (columns)
  if(nextSibs.length > 0) {// If there are any "next" groups (columns)
    nextSibs.each(function(){// For each of the next groups (columns):
      var siblingID = $(this).attr('data-id');// Get the ID
      $(`.mobile-pathway__groups .${siblingID}`).addClass('d-none').find('.pathway__occupation').remove();// Remove all the occupations within current group (column)
      // $(`.${siblingID} .pathway__expand-btn, .${siblingID} .pathway__collapse-btn`).hide();// Hide the collapse/expand buttons within current group (column)
      // $(this).addClass('d-none');// Hide current group (column)
    });
    // console.log(nextSibs);
  }
  // -- End of next groups functionality

  self.closest('.pathway__occupation').addClass('selected');// Select the current parent occupation

  self.closest('.pathway__occupation')
    .siblings('.pathway__occupation')
    .find('.pathway__occupation-btn').removeClass('pathway__occupation-matches-btn')// Remove the matches class 
    .addClass('pathway__occupation-add-btn')// Revert to original class
    .text('Add to Path');// Revert button text

  self// Current button
    .removeClass('pathway__occupation-add-btn')// Remove original class
    .addClass('pathway__occupation-matches-btn')// Add matches class
    .text('Show Matches');// Update button text
  
}

  function getMatchingOccs(self){
    var socExclude;
    var startSoc = $('.pathway__start-path-btn').attr('data-soc-code');
    var socCode = self.attr('data-soc-code');
    var selfParentGroup = self.closest('.pathway__group').attr('data-id');
    var nextSib = $(`.${selfParentGroup}`).next('.pathway__group');
    var nextSibID = nextSib.attr('data-id');
    var destination = `.${nextSibID}`;

    if(destination == '.pathway__group--3') {
      socExclude = [startSoc, socCode];// Excluded soc code will be first and second
      localStorage.setItem('epp_mvp_excluded_soc', socExclude);// Update the localstorage item
    }
    else if(destination == '.pathway__group--4') {
      var secondOcc = $('.pathway__group--2 .pathway__occupation.active, .pathway__group--2 .pathway__occupation.expanded');
      var secondSoc = secondOcc.attr('data-soc-code');
      
      socExclude = [startSoc, secondSoc, socCode];// Excluded soc code will be first, second and third
      localStorage.setItem('epp_mvp_excluded_soc', socExclude);
    }

    $('.pathway__group').removeClass('is-last');

    self.closest('.pathway__occupation').removeClass('selected').addClass('expanded');
    $(destination).removeClass('d-none');

    $(`.${selfParentGroup}`).addClass('has-active');

    setTimeout(function(){
      var excludedSoc = localStorage.getItem('epp_mvp_excluded_soc');
      $(destination).find('.loading').css('opacity', '1');
      getNextPathways(socCode, excludedSoc, destination, self);
    }, 100);
  }

  function getMatchingMobileOccs(self){
    var socExclude;
    var startSoc = $('.pathway__start-path-btn').attr('data-soc-code');
    var socCode = self.attr('data-soc-code');
    var selfParentGroup = self.closest('.pathway__group').attr('data-id');
    var nextSib = $(`.${selfParentGroup}`).next('.pathway__group');
    var nextSibID = nextSib.attr('data-id');
    var destination = `.mobile-pathway__groups .${nextSibID}`;

    // $('.mobile-pathway__save-path').addClass('d-none');

    if(destination == '.mobile-pathway__groups .pathway__group--3') {
      socExclude = [startSoc, socCode];// Excluded soc code will be first and second
      localStorage.setItem('epp_mvp_excluded_soc', socExclude);// Update the localstorage item
    }
    else if(destination == '.mobile-pathway__groups .pathway__group--4') {
      var secondOcc = $('.mobile-pathway__groups .pathway__group--2 .pathway__occupation.active, .mobile-pathway__groups .pathway__group--2 .pathway__occupation.expanded');
      var secondSoc = secondOcc.attr('data-soc-code');
      
      socExclude = [startSoc, secondSoc, socCode];// Excluded soc code will be first, second and third
      localStorage.setItem('epp_mvp_excluded_soc', socExclude);
      $('.pathway__group--4').removeClass('d-none');
    }

    $('.pathway__group').removeClass('is-last');

    self.closest('.pathway__occupation').removeClass('selected').addClass('expanded');
    // $(destination).removeClass('d-none');
    $(destination).css({
      'opacity': '0',
      'transform': 'translateY(-100px)'
    });

    $(`.mobile-pathway__groups .${selfParentGroup}`).addClass('has-active');

    setTimeout(function(){
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
    var startOccupation = createOccupationObj( $('.pathway__occupation--start') );// Pass in the '.pathway__occupation' div

    //localStorage.setItem('epp_mvp_current_path');
    if (localStorage.getItem('epp_mvp_current_path') === null) {// localStorage item doesn't exist, create it
      var currentOccupation = createOccupationObj( $('.pathway__occupation--start') );// Pass in the starting '.pathway__occupation' div
      var currentPathway = { path_1 : currentOccupation };// Add the newly created object
      localStorage.setItem('epp_mvp_current_path', JSON.stringify(currentPathway));// Create localstorage item
    } else {
      var currentPathway = localStorage.getItem('epp_mvp_current_path');// Get current pathway localstorage item
      currentPathway = JSON.parse(currentPathway);// Parse it as JSON object
      var currentOccupation = createOccupationObj(self.closest('.pathway__occupation'));// Create occupation object from closest parent occupation
    }
    var loggedPath;

    if( self.closest('.pathway__group').hasClass('pathway__group--2') ) {// If the current group is group 2
      currentPathway.path_1 = startOccupation;// Set the starting occupation in current path object
      currentPathway.path_2 = currentOccupation;// Set the current occupation in current path object
      delete currentPathway.path_3;
      delete currentPathway.path_4;
      $('.pathway__progress .step3, .pathway__progress .step4').removeClass('selected active');
      $('.pathway__progress .step2').addClass('active');

      loggedPath = `${currentPathway.path_1.title} [path 1] --> ${currentPathway.path_2.title} [path 2]`;
    }
    else if( self.closest('.pathway__group').hasClass('pathway__group--3') ) {
      currentPathway.path_3 = currentOccupation;
      delete currentPathway.path_4;
      $('.pathway__progress .step4').removeClass('selected active');
      $('.pathway__progress .step3').addClass('active');

      loggedPath = `${currentPathway.path_1.title} [path 1] --> ${currentPathway.path_2.title} [path 2] --> ${currentPathway.path_3.title} [path 3]`;
    }
    else if( self.closest('.pathway__group').hasClass('pathway__group--4') ) {
      currentPathway.path_4 = currentOccupation;
      $('.pathway__progress .step4').addClass('active');

      loggedPath = `${currentPathway.path_1.title} [path 1] --> ${currentPathway.path_2.title} [path 2] --> ${currentPathway.path_3.title} [path 3] --> ${currentPathway.path_4.title} [path 4]`;
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
    $('.pathway__groups .pathway__occupation').each(function() {
      // console.log($(this));
      if( $(this).hasClass('selected') || $(this).hasClass('expanded') ) {
        var self = $(this).find('.pathway__occupation-btn');
        toggleOccupations(self, 'collapse');
        // console.log('self:', self);
      }
    });
    // if( $('.pathway__groups .pathway__group--4 .pathway__occupation.selected').length > 0 ) {
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
      beforeSend: function(xhr){
        xhr.setRequestHeader('x-api-key', EPP_DATA.api_key);
      },
      success: function (result) {
        var rows = result.overlap.data.rows;
        // console.log(rows);

        if( rows.length > 0 ) {// at least 1 row returned

          var counter = 1;

          $(`${destination} .pathway__occupation, ${destination} .no-pathway-results`).remove();// Clear destination before appending occupations

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

            $(destination).append(
              '<div class="pathway__occupation pathway__occupation--'+counter+'" data-soc-code="' + rows[i].soc_code + '" style="left: -50px; opacity: 0;" data-id="occ-' + pathwayID + '">' +

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

              '</div><!-- End .pathway__occupation -->'
            );

            counter++;
          }

          var timeDelay = 0;
          $(destination + ' .pathway__occupation').each(function(){
            var occupation = $(this);
            setTimeout(function(){
              occupation.css({
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
            toggleOccupations( self, 'collapse' );
          }, 1100);

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
    beforeSend: function(xhr){
      xhr.setRequestHeader('x-api-key', EPP_DATA.api_key);
    },
    success: function (result) {
      var rows = result.overlap.data.rows;
      // console.log(rows);

      if( rows.length > 0 ) {// at least 1 row returned

        var counter = 1;

        $(`${destination} .pathway__occupation, ${destination} .no-pathway-results`).remove();// Clear destination before appending occupations

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

        setTimeout(function(){
          $('.loading--mobile').hide();
          $(destination).removeClass('d-none');
        }, 300);

        setTimeout(function(){
          // $('.mobile-pathway__groups .pathway__occupation.shrink').hide();
          $(destination).css({'opacity': '1', 'transform': 'translateY(0)'});
        }, 600);

        setTimeout(function(){
          // if(destination == '.mobile-pathway__groups .pathway__group--4') {
          //   $('.mobile-pathway__save-path').removeClass('d-none');
          // }
          copyMobileOccupations();
        }, 900);

        // setTimeout(function(){
        //   collapseDesktopOccupations();
        // }, 1000);

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

})(jQuery);