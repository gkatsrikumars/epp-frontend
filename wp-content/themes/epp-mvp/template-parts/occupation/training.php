<div class="row occupation__training--heading">
  <div class="col-12">
    <h2>Training</h2>
  </div>
</div>

<div class="row occupation__training">
  <div class="col-md-3 occupation__training--course">
    <p>
      <strong>Course<em>:</em></strong> 
      <span class="<?= $current_occupation->training[0]->training_name == 'NA' ? 'no-data--training' : ''; ?>">
        <?php if($current_occupation->training[0]->training_name != 'NA'): ?>
          <a class="occupation__training--link" href="<?= $current_occupation->training[0]->url; ?>" target="_blank"><?= $current_occupation->training[0]->training_name; ?></a>
        <?php else: ?>
          N/A
        <?php endif; ?>
      </span>
    </p>
  </div>
  <div class="col-md-3 occupation__training--online">
    <p>
      <strong>Online<em>:</em></strong> 
      <?php if($current_occupation->training[0]->training_name != 'NA'): ?>
        <span><?= $current_occupation->training[0]->training_name == 1 ? 'Yes' : 'No'; ?></span>
      <?php else: ?>
        N/A
      <?php endif; ?>
    </p>
  </div>
  <div class="col-md-3 occupation__training--duration">
    <p>
      <strong>Duration<em>:</em></strong> 
      <?php if($current_occupation->training[0]->training_name != 'NA'): ?>
        <span><?= epp_mvp_shorten_duration($current_occupation->training[0]->duration_cat_name); ?></span>
      <?php else: ?>
        N/A
      <?php endif; ?>
    </p>
  </div>
  <div class="col-md-3 occupation__training--location">
    <p>
      <strong>Location<em>:</em></strong> 
      <span>
        <?php if($current_occupation->training[0]->training_name != 'NA'): ?>
          <a href="https://www.google.ca/maps/dir//<?= str_replace(' ', '+', $current_occupation->training[0]->training_provider_address); ?>" target="_blank"><?= $current_occupation->training[0]->training_provider_name; ?></a>
        <?php else: ?>
          N/A
        <?php endif; ?>
      </span>
    </p>
  </div>
</div>