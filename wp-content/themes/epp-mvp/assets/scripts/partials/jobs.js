(function($) {
  "use strict";

  $(function() {

    if( $('.job__single--recent').length > 0 ) {

      var totalPages = Math.ceil( $('.job__single--recent').length / 5 );
      
      $('.job__single--recent').simplePaginate(5, 'pagination-elements__jobs--recent');
      // equalHeights('.pagination-elements__jobs--recent');

      if($('.pagination__jobs--recent').data("twbs-pagination")){
        $('.pagination__jobs--recent').twbsPagination('destroy');
      }

      $('.job__holder--recent').twbsPagination({
        totalPages: totalPages,
        visiblePages: 4,
        paginationClass: 'pagination__jobs pagination__jobs--recent',
        onPageClick: function (event, page) {
          $('.pagination-elements__jobs--recent').not('.pagination-elements__jobs--recent.page-'+page).hide();
          $('.pagination-elements__jobs--recent.page-'+page).show();
          $('.job__total-jobs--recent em').text(page);
        }
      });

      /* var allJobsHTML = $('.job__holder--recent').html();
      allJobsHTML = allJobsHTML.replace('pagination-elements__jobs--recent', 'pagination-elements__jobs--recent-mobile');
      var totalJobs; */

      $('.job__holder--recent').append('<span class="search-results__info">Results page:</span>');

      /* $('.job__holder--recent-mobile').prepend(allJobsHTML);
      totalJobs = $('.job__holder--recent-mobile .pagination-elements__jobs--recent').length;
      $('.job__holder--recent-mobile .pagination__jobs').remove();
      $('.job__holder--recent-mobile .button').attr('data-total-pages', totalJobs); */

      $('.job__single--recent-mobile').simplePaginate(5, 'pagination-elements__jobs--recent-mobile');
      $('.pagination-elements__jobs--recent-mobile').css('height', 'auto');
      $('.job__holder--recent-mobile .button').attr('data-total-pages', totalPages);

    }

    if( $('.job__single--all').length > 0 ) {

      var totalPages = Math.ceil( $('.job__single--all').length / 5 );

      $('.job__single--all').simplePaginate(5, 'pagination-elements__jobs--all');
      // equalHeights('.pagination-elements__jobs--all');

      if($('.pagination__jobs--all').data("twbs-pagination")){
        $('.pagination__jobs--all').twbsPagination('destroy');
      }

      $('.job__holder--all').twbsPagination({
        totalPages: totalPages,
        visiblePages: 4,
        paginationClass: 'pagination__jobs pagination__jobs--all',
        onPageClick: function (event, page) {
          $('.pagination-elements__jobs--all').not('.pagination-elements__jobs--all.page-'+page).hide();
          $('.pagination-elements__jobs--all.page-'+page).show();
          $('.job__total-jobs--all em').text(page);
        }
      });

      /* var allJobsHTML = $('.job__holder--all').html();
      allJobsHTML = allJobsHTML.replace('pagination-elements__jobs--all', 'pagination-elements__jobs--all-mobile');
      var totalJobs; */

      $('.job__holder--all').append('<span class="search-results__info">Results page:</span>');

      /* $('.job__holder--all-mobile').prepend(allJobsHTML);
      totalJobs = $('.job__holder--all-mobile .pagination-elements__jobs--all').length;
      $('.job__holder--all-mobile .pagination__jobs').remove();
      $('.job__holder--all-mobile .button').attr('data-total-pages', totalJobs); */

      $('.job__single--all-mobile').simplePaginate(5, 'pagination-elements__jobs--all-mobile');
      $('.pagination-elements__jobs--all-mobile').css('height', 'auto');
      $('.job__holder--all-mobile .button').attr('data-total-pages', totalPages);

    }

    $(document).on('click', '.job__filter-btn', function() {

      if( $(this).hasClass('job__filter-btn--all') ) {
        $('.jobs-wrap--all').show();
        $('.jobs-wrap--recent').hide();
        $('.sort-btn--all').removeClass('button--outlined').addClass('button');
        $('.sort-btn--recent').removeClass('button').addClass('button--outlined');
        equalHeights('.pagination-elements__jobs--all');
      }
      else{
        $('.jobs-wrap--recent').show();
        $('.jobs-wrap--all').hide();
        $('.sort-btn--recent').removeClass('button--outlined').addClass('button');
        $('.sort-btn--all').removeClass('button').addClass('button--outlined');
        equalHeights('.pagination-elements__jobs--recent');
      }

      return false;

    });

    $(document).on('click', '.sort-btn', function() {

      $('.sort-btn').toggleClass('button--outlined button');

      if( $(this).hasClass('sort-btn--all') ) {
        $('.jobs-wrap--all').show();
        $('.jobs-wrap--recent').hide();
        $('.sort-btn--all').removeClass('button--outlined').addClass('button');
        $('.sort-btn--recent').removeClass('button').addClass('button--outlined');
        equalHeights('.pagination-elements__jobs--all');
      }
      else{
        $('.jobs-wrap--recent').show();
        $('.jobs-wrap--all').hide();
        $('.sort-btn--recent').removeClass('button--outlined').addClass('button');
        $('.sort-btn--all').removeClass('button').addClass('button--outlined');
        equalHeights('.pagination-elements__jobs--recent');
      }

      return false;

    });

    $(document).on('click', '.button--more-jobs', function() {
      
      var type = $(this).attr('data-jobs-type');
      // var currentPage = $(this).attr('data-current-page');
      var totalPages = $(this).attr('data-total-pages');
      var nextPage = $(this).attr('data-next-page');
      var htmlToLoad;
      
      if( nextPage < totalPages ) {

        htmlToLoad = $(this).siblings('.pagination-elements__jobs--' + type + '-mobile.page-' + nextPage).html();// ES5
        // htmlToLoad = $(this).siblings(`.pagination-elements__jobs--${type}-mobile.page-${nextPage}`).html();// ES6
        
        $('.pagination-elements__jobs--' + type + '-mobile.page-1').append(htmlToLoad);

        nextPage++;

        $(this).attr('data-next-page', nextPage);

        if(nextPage >= totalPages) {
          $(this).hide();
        }
        
      }
      else{
        $(this).hide();
      }

      return false;

    });

  });// document ready

})(jQuery);