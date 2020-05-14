(function($) {
  "use strict";

  $(function() {

    $('.search-results').hide();

    $('.form--search-occupations').on('submit', function(event){
      // unsavedData = false;
      event.preventDefault();

      var winWidth = $(window).width();
      
      var searchQuery = $('#search-occ-input').val();
      var searchField = searchQuery.toLowerCase();
      
      if (searchQuery == '') {
        searchQuery = "''";
      }

      $('.form--search-occupations')[0].reset();
      $('#search-occ-input').blur();

      $.getJSON(EPP_DATA.site_url+'/epp-occupations.json', function(data) {// Get all occupations
        var occupations = data.rows;// Get just the occupations from the data

        // var output = '<h2 class="mt-4 mb-4">Results for "'+searchQuery+'"</h2>';
        // var output = '<div class="list-group returned-results">';
        var output = '';
        var counter = 0;
        var searchString = 'search results';

        for (var i = 0; i < occupations.length; i++){
          // look for the entry with a matching `title` value
          var titleLowercase = occupations[i].title.toLowerCase();
          // Highlight the search query string
          var highlightedTtitle = titleLowercase.replace(searchField, '<em>' + searchField + '</em>');

          if ( titleLowercase.indexOf(searchField) >= 0 ){
            // output += '<a class="list-group-item list-group-item-action epp-occupation-link" href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + occupations[i].soc_code + '" data-id="' + occupations[i].soc_code + '">' + occupations[i].title + '</a>';

            output += '<p class="search-results__item"><a class="search-results__link" href="' + EPP_DATA.site_url + '/occupation/?soc_code=' + occupations[i].soc_code + '" data-id="' + occupations[i].soc_code + '">' + highlightedTtitle + '</a></p>';
            counter++;
          }
        }

        if( counter == 0 ) {
          output += '<p class="search-results__item">No results found.</p>';
          $('.pagination, .search-results__info').hide();
        }

        if ( counter == 1 ) {
          searchString = 'search result';
        }

        // output += '</div>';
        // $('#search-results').html(output);

        /* $('.search-results__query').text(searchQuery);
        $('#search-results .modal-body').html(output); */
        $('.search-results__query span').text(searchQuery);
        $('.search-results__query em').text( counter + ' ' + searchString );
        $('.search-results__data').html(output);
        // $('.search-results').addClass('active');
        // setTimeout(function(){
        //   $('.search-results').toggleClass('open');
        // }, 400);
        $('.search-results').fadeIn(400);

        if( counter > 0 ){
          $('.pagination, .search-results__info').show();

          $('.search-results__item').simplePaginate(10);
          // equalHeights('.pagination-elements');

          if($('.pagination').data("twbs-pagination")){
            $('.pagination').twbsPagination('destroy');
          }

          $('.pagination').twbsPagination({
            totalPages: Math.ceil( $('.search-results__item').length / 10 ),
            visiblePages: 4,
            onPageClick: function (event, page) {
              $('.pagination-elements').not('.pagination-elements.page-'+page).hide();
              $('.pagination-elements.page-'+page).show();
            }
          });
        }

        $('body').addClass('search-results-visible').css({
          'height': '100vh',
          'overflow-y': 'hidden'
        });
        
        if( winWidth < 768 ) {
          $('html,body').animate({
            scrollTop: 0},
          'slow');
        }

        // equalHeights('.pagination-elements');

        closePopupsEtAl();

        // $('.search-results').addClass('visible');
        // $('.search-results').modal('show');
      });
    });

    $(document).on('click', '.search-results__close-btn', function() {

      // $('.search-results').removeClass('active');
      $('.search-results').fadeOut(400);

      $('body').removeClass('search-results-visible').css({
        'height': '',
        'overflow-y': ''
      });

      // setTimeout(function(){
      //   $('.search-results').toggleClass('open');
      // }, 400);

      return false;

    });

    $('#search-occ-input').autocomplete({
      /* source: function (request, response) {
        var matches = $.map(occupationTitles, function (acItem) {
            if (acItem.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
              return acItem;
            }
        });
        response(matches.slice(0, 5));
      }, */
      source: function (request, response) {
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
      appendTo: '#search-occ-autocomplete-container',
      change: function( event, ui ) {
        if(ui.item != null) {
          // unsavedData = false;
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/occupation/?soc_code=' + ui.item.value;
        }
      },
      select: function( event, ui ) {
        event.preventDefault();
        $('#search-occ-input').val(ui.item.label);
        if(ui.item != null) {
          // selectAutocomplete(ui.item.label, ui.item.value);
          location.href = EPP_DATA.site_url + '/occupation/?soc_code=' + ui.item.value;
        }
      },
      focus: function( event, ui ) {
        event.preventDefault();
        // unsavedData = false;
        $('#search-occ-input').val(ui.item.label);
        // if(ui.item != null) {
        //   selectAutocomplete(ui.item.label, ui.item.value);
        // }
      },
      classes: {
        'ui-autocomplete': 'search-occ-autocomplete',
      }
    });

    $('#search-occ-input').keyup(function(event) {
      if (event.keyCode === 27 || event.which === 27) {
        closePopupsEtAl();
      }
    });

  });// document ready

})(jQuery);