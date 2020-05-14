<div class="jobs-wrap--recent">

  <div class="job__search-info">
    <p class="job__search"><em><?= $current_occupation->title; ?></em> jobs near Toronto, ON</p>
    <p class="job__total-jobs job__total-jobs--recent">
      page <em>1</em> of 
      <?= /*$recent_jobs->total_jobs*/ $recent_jobs->num_paginable_jobs; ?>
      <?= $recent_jobs->num_paginable_jobs == 1 ? 'job' : 'jobs'; ?>
    </p>
    <p class="job__show-filter">
      show: 
      <a class="job__filter-btn job__filter-btn--all active" href="#">all jobs</a> - 
      <a class="job__filter-btn job__filter-btn--recent" href="#">
        <?= $recent_jobs->num_paginable_jobs; ?> 
        <?= $recent_jobs->num_paginable_jobs == 1 ? 'new job' : 'new jobs'; ?>
      </a>
    </p>
  </div>

  <div class="job__holder job__holder--recent">

    <?php if($all_jobs->total_jobs < 1) : ?>

    <div class="job__single job__single--all pt-4">
      <p>No jobs found for <strong><?= $current_occupation->title; ?> in Toronto, ON</strong></p>
      <p>Please search other occupations for better results.</p>
    </div>

    <?php else : ?>

    <?php foreach($recent_jobs->jobs as $job) : ?>

      <div class="job__single job__single--recent">
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

  </div><!-- End .job__holder--recent -->

  <!-- MOBILE: -->

  <div class="job__holder job__holder--recent-mobile">

    <?php if($all_jobs->total_jobs < 1) : ?>

    <div class="job__single job__single--recent-mobile pt-4">
      <p>No jobs found for <strong><?= $current_occupation->title; ?> in Toronto, ON</strong></p>
      <p>Please search other occupations for better results.</p>
    </div>

    <?php else : ?>

    <?php foreach($recent_jobs->jobs as $job) : ?>

      <div class="job__single job__single--recent-mobile">
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

    <a href="#" class="button button--more-jobs" data-jobs-type="recent" data-next-page="2" data-total-pages="">More jobs...</a>

  </div><!-- End .job__holder--recent-mobile -->

</div><!-- .jobs-wrap--recent -->