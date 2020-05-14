<div class="col-md-3 pathway__group pathway__group--2 <?php if( !isset($_GET['soc_code']) ){ echo 'd-none'; } ?>" data-id="pathway__group--2">

  <a href="#" class="pathway__expand-btn">Expand</a>
  <a href="#" class="pathway__collapse-btn">Collapse</a>

  <?php if( isset($_GET['soc_code']) ): ?>

    <?php if( !empty($matches) ): ?>

    <?php $counter = 1; foreach( $matches as $match ): ?>

      <?php $risk_percent = epp_mvp_automation_percent( $match->risk_end ); ?>
          
      <div class="pathway__occupation pathway__occupation--<?= $counter; ?>" data-soc-code="<?= $match->soc_code; ?>" data-id="occ-group-2-<?= str_replace('.', '-', $match->soc_code); ?>">
            
        <em class="pathway__occupation-skill-overlap"><?= epp_mvp_percentage_distance($match->dist_all); ?>% skill overlap</em>

        <a href="<?= home_url().'/occupation/?soc_code='.$match->soc_code; ?>" target="_blank" class="pathway__occupation-title" data-full-title="<?= $match->title; ?>">
          <?= /* $match->title; */ epp_mvp_truncate_title($match->title, 25) ?>
        </a>

        <div class="pathway__occupation-automation">
          <span class="pathway__label">Risk of automation</span>
          <span class="pathway__value"><?= $risk_percent['automation_percent']; ?>%</span>
        </div><!-- End .pathway__automation-risk -->

        <div class="pathway__occupation-salary">
          <span class="pathway__label">Median salary</span>
          <span class="pathway__value">$<?php $salary = number_format($match->salarymax_end); if($salary != 0) { echo $salary; } else { echo '--'; } ?></span>
        </div><!-- End .pathway__salary -->

        <div>
          <a href="<?= home_url(); ?>/occupation/?soc_code=<?= $match->soc_code; ?>" class="jobs-link" target="_blank">Jobs &amp; Training</a>
          <a href="#" class="pathway__occupation-btn pathway__occupation-add-btn" data-occ-title="<?= $match->title; ?>" data-soc-code="<?= $match->soc_code; ?>" data-id="btn-group-2-<?= str_replace('.', '-', $match->soc_code); ?>">Add to path</a>
        </div>

        <span class="pathway__plus-btn"></span>
        <span class="pathway__divider"></span>

        <span class="pathway__collapsed-occupations"></span>

      </div><!-- End .pathway__occupation -->

    <?php $counter++; endforeach; ?>

    <?php else: ?>

    <p class="no-pathway-results text-danger">No occupations returned.</p>

    <?php endif; ?>

  <?php else: ?>

    <a href="#" class="pathway__expand-btn">Expand</a>
    <a href="#" class="pathway__collapse-btn">Collapse</a>

  <?php endif;// endif( isset($_GET['soc_code']) ?>

  <!-- <img src="<?= get_template_directory_uri(); ?>/assets/img/placeholder/loading.gif" alt="loading" class="loading" width="32"> -->
  <div class="loading">
    <div class="loading__square"></div>
  </div>

</div><?php //End .pathway__group ?>

<div class="col-md-3 pathway__group pathway__group--3 d-none" data-id="pathway__group--3">
  <a href="#" class="pathway__expand-btn">Expand</a>
  <a href="#" class="pathway__collapse-btn">Collapse</a>
  <!-- <img src="<?= get_template_directory_uri(); ?>/assets/img/placeholder/loading.gif" alt="loading" class="loading" width="32"> -->
  <div class="loading">
    <div class="loading__square"></div>
  </div>
</div>

<div class="col-md-3 pathway__group pathway__group--4 d-none" data-id="pathway__group--4">
  <a href="#" class="pathway__expand-btn">Expand</a>
  <a href="#" class="pathway__collapse-btn">Collapse</a>
  <!-- <img src="<?= get_template_directory_uri(); ?>/assets/img/placeholder/loading.gif" alt="loading" class="loading" width="32"> -->
  <div class="loading">
    <div class="loading__square"></div>
  </div>
</div>