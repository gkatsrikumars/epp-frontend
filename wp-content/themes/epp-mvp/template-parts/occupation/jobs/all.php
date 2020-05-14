<div class="jobs-wrap--all">

  <div class="job__search-info">
    <p class="job__search"><em><?= $current_occupation->title; ?></em> jobs near Toronto, ON</p>

    <?php if($all_jobs->total_jobs > 0) : ?>

    <p class="job__total-jobs job__total-jobs--all">
      page <em>1</em> of 
      <?= $all_jobs->num_paginable_jobs; ?>
      <?= $all_jobs->num_paginable_jobs == 1 ? 'job' : 'jobs'; ?>
    </p>
    <p class="job__show-filter">
      show: 
      <a class="job__filter-btn job__filter-btn--all" href="#">all jobs</a> - 
      <a class="job__filter-btn job__filter-btn--recent active" href="#">
        <?= $recent_jobs->num_paginable_jobs; ?> 
        <?= $recent_jobs->num_paginable_jobs == 1 ? 'new job' : 'new jobs'; ?>
      </a>
    </p>
    <?php endif; ?>

  </div>

  <div class="job__holder job__holder--all">
    <?php if($all_jobs->total_jobs < 1) : ?>

    <div class="job__single job__single--all pt-4">
      <p>No jobs found for <strong><?= $current_occupation->title; ?> in Toronto, ON</strong></p>
      <p>Please search other occupations for better results.</p>
    </div>

    <?php else : ?>

    <?php foreach($all_jobs->jobs as $job) : ?>

      <div class="job__single job__single--all">
        <a href="<?= $job->url; ?>" class="button--outlined button--rectangle job__apply-btn job__link-url" target="_blank">Apply</a>
        <a class="job__title job__link-url" href="<?= $job->url; ?>" target="_blank"><?= $job->name; ?></a>
        <em class="job__company"><?= $job->hiring_company->name; ?></em>
        <p class="job__snippet"><?= $job->snippet; ?></p>
        <p class="job__location-and-time">
          <img src="<?= get_template_directory_uri(); ?>/assets/img/map-pin-grey_2x.png" width="10" alt="map pin">
          <span class="job__location"><?= $job->location; ?></span> 
          <em class="job__posted-time"><?= $job->posted_time_friendly; ?></em>
        </p>
      </div>

    <?php endforeach; ?>

    <?php endif; ?>

    <!-- <span class="search-results__info">Results page:</span> -->

  </div><!-- End .job__holder--all -->

  <div class="job__holder job__holder--all-mobile">

    <?php if($all_jobs->total_jobs < 1) : ?>

    <div class="job__single job__single--all-mobile pt-4">
      <p>No jobs found for <strong><?= $current_occupation->title; ?> in Toronto, ON</strong></p>
      <p>Please search other occupations for better results.</p>
    </div>

    <?php else : ?>
    
    <?php foreach($all_jobs->jobs as $job) : ?>

      <div class="job__single job__single--all-mobile">
        <a href="<?= $job->url; ?>" class="button--outlined button--rectangle job__apply-btn job__link-url" target="_blank">Apply</a>
        <a class="job__title job__link-url" href="<?= $job->url; ?>" target="_blank"><?= $job->name; ?></a>
        <em class="job__company"><?= $job->hiring_company->name; ?></em>
        <p class="job__snippet"><?= $job->snippet; ?></p>
        <p class="job__location-and-time">
          <img src="<?= get_template_directory_uri(); ?>/assets/img/map-pin-grey_2x.png" width="10" alt="map pin">
          <span class="job__location"><?= $job->location; ?></span> 
          <em class="job__posted-time"><?= $job->posted_time_friendly; ?></em>
        </p>
      </div>

    <?php endforeach; ?>

    <?php endif; ?>

    <div class="clearfix"></div>

    <a href="#" class="button button--more-jobs" data-jobs-type="all" data-next-page="2" data-total-pages="">More jobs...</a>
  </div><!-- End .job__holder--all-mobile -->

</div><!-- .jobs-wrap--all -->