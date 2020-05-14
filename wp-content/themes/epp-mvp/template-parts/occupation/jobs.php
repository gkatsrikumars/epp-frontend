<div id="occ-jobs" class="row occupation__jobs--heading">
  <div class="col-12">
    <h2>Jobs</h2>
  </div>
  <div class="col-12 job__search--mobile">
    <p><em><?= $current_occupation->title; ?></em> jobs near Toronto, ON</p>
  </div>
</div>

<div class="row occupation__jobs">

  <?php $recent_jobs = $current_occupation->get_recent_jobs(); ?>
  <?php $all_jobs = $current_occupation->get_jobs(); ?>

  <div class="col-md-4">

    <?php if($all_jobs->total_jobs > 0) : ?>
    <strong>sort by</strong>
    <p class="sort-btns">
      <a href="#" class="button button--small sort-btn sort-btn--all">All</a>
      <a href="#" class="button--outlined button--small sort-btn sort-btn--recent">New</a>
    </p>
    <?php endif; ?>

    <strong>Location</strong>
    <p class="job__radius">
      <img src="<?= get_template_directory_uri(); ?>/assets/img/map-pin-navy_2x.png" width="10" alt="map pin">
      <span>Toronto</span> /within 25km
    </p>

  </div><!-- End .col-md-4 -->

  <div class="col-md-8">

    <!-- //* BEGIN RECENT JOBS -->

    <?php include_once('jobs/recent.php'); ?>

    <!-- END RECENT JOBS *// -->

    <!-- //* BEGIN ALL JOBS -->

    <?php include_once('jobs/all.php'); ?>

    <!-- END ALL JOBS *// -->

  </div><!-- End .col-md-8 -->

</div>

<div class="row occupation__jobs--footer">
  <div class="col-12">
    <p>
      <a href="https://www.ziprecruiter.com/jobs" id="jobs_widget_link" target="_blank">
        <span>Job Search by</span> 
        <span id="zr_logo_container"><img id="zr_logo" src="https://www.ziprecruiter.com/img/logos/logo-sm-black-304px.png" alt="ZipRecruiter" width="120" />
        </span>
      </a>
    </p>
  </div>
</div>