<div class="row occupation__main-info">
  <div class="col-md-6">
    <p class="occupation__bookmark-wrap">
      <?php //if( is_user_logged_in() ): ?>
        <a href="<?= is_user_logged_in() ? '#' : get_permalink(69); ?>" title="<?= $btn_title; ?>" class="occupation__bookmark-btn <?= $btn_class; ?>" data-job-id="<?= $current_occupation->soc_code; ?>" data-job-title="<?= $current_occupation->title; ?>"><?= $btn_txt; ?></a>
      <?php //endif; ?>
    </p>
    <h1 class="occupation__title"><?= $current_occupation->title; ?></h1>
    <p class="occupation__description"><?= $current_occupation->description; ?></p>
  </div>
  <div class="col-md-6">
    <a href="#" class="scroll-to-jobs-btn d-md-none">Jobs</a>
    <a href="<?= home_url().'/pathways/?soc_code='.$current_occupation->soc_code; ?>" class="button occupation__start-path-btn">Start Path here</a>
  </div>
</div>

<div class="row occupation__salary-etc">
  <div class="col-md-6 col-lg-4 occupation__automation">
    <p>
      <em class="<?= $current_occupation->automation['automation_colour']; ?>">
        <?= $current_occupation->automation['automation_percent']; ?>%
      </em>
      <strong>Risk of automation</strong>
    </p>
  </div>
  <div class="col-md-6 col-lg-4 occupation__med-salary">
    <p>
      <em class="<?= $current_occupation->salary_median == 'no salary data' ? 'no-data no-data--salary' : ''; ?>"><?=  $current_occupation->salary_median; ?></em>
      <strong>Median salary</strong>
    </p>
  </div>
  <div class="col-md-12 col-lg-4 occupation__education">

    <?php if($current_occupation->education): ?>
    <ul class="d-md-none">
      <?php foreach($current_occupation->education as $education): ?>
        <li><em><?= round($education->percentage); ?>%</em> <span title="<?= $education->description; ?>"><?= epp_mvp_shorten_education_desc($education->description); ?></span></li>
      <?php endforeach; ?>
    </ul>
    <?php endif; ?>

    <?php
    $counter = 0;
    if($current_occupation->education){
      $highest_percentage = round($current_occupation->education[0]->percentage);
    }
    ?>

    <div class="occupation__education--percent-wrap">
      
      <?php if($current_occupation->education): ?>

      <?php foreach($current_occupation->education as $education): ?>

        <?php if($counter == 0): ?>

          <span class="occupation__education--bar" style="height:100%;"></span>

        <?php else: ?>

          <?php
          $percentage = round($education->percentage);
          // Make the highest percentage 100% height then every other value is a percent of the highest
          $ui_percentage = epp_mvp_percentage_of_number($percentage, $highest_percentage);
          ?>

          <span class="occupation__education--bar" style="height:<?= round($ui_percentage); ?>%;"></span>

        <?php endif; ?>

      <?php $counter++; endforeach; ?>

      <?php else: ?>

      <p class="no-data no-data--edu">No education data</p>

      <?php endif; ?>

      <p><strong>Education level</strong></p>

    </div><!-- End .occupation__education--percent-wrap -->

    <?php if($current_occupation->education): ?>
    <ul class="d-none d-md-block">
      <?php foreach($current_occupation->education as $education): ?>
        <li><em><?= round($education->percentage); ?>%</em> <span title="<?= $education->description; ?>"><?= epp_mvp_shorten_education_desc($education->description); ?></span></li>
      <?php endforeach; ?>
    </ul>
    <?php endif; ?>

  </div>
</div>
  
<?php if($current_occupation->top_skills): ?>
<div class="row occupation__top-skills">
  <div class="col">
    <strong>Top Skills</strong>
    <ul>
      <?php foreach($current_occupation->top_skills as $top_skills): ?>
        <li><?= $top_skills->skill_name; ?></li>
      <?php endforeach; ?>
    </ul>
  </div>
</div>
<?php endif; ?>