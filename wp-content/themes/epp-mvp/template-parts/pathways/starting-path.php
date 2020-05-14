<div id="pathway__group--start" class="col-md-3 pathway__group pathway__group--start has-active">

  <div class="pathway__occupation pathway__occupation--start active">

    <?php if( isset($_GET['soc_code']) ): ?>

    <form class="start-new-path-form start-new-path-form--desktop form-inline" autocomplete="off">
      <input id="" class="input__start-new-path input__pathway-starting-occ" type="text" placeholder="enter starting occupation" value="<?= $occupation->title; ?>" data-prev-title="<?= $occupation->title; ?>">
      <span class="start-new-path__search"></span>
      <a href="#" class="start-new-path__clear">Clear field</a>
      <button type="submit" class="d-none">Start new path</button>
      <div id="start-pathway-autocomplete-container"></div>
    </form>

    <div class="pathway__occupation-automation">
      <span class="pathway__label">Risk of automation</span>
      <span class="pathway__value"><?= $automation['automation_percent']; ?>%</span>
    </div><!-- End .pathway__automation-risk -->

    <div class="pathway__occupation-salary">
      <span class="pathway__label">Median salary</span>
      <span class="pathway__value"><?= $salary_med; ?></span>
    </div><!-- End .pathway__salary -->

    <div>
      <a href="<?= home_url(); ?>/occupation/?soc_code=<?= $soc_code; ?>" class="jobs-link" target="_blank">Jobs &amp; Training</a>
      <a href="#" data-soc-code="<?= $soc_code; ?>" class="button--gradient1 pathway__start-path-btn">Start new path</a>
    </div>

    <?php else: ?>

    <form class="start-new-path-form start-new-path-form--desktop form-inline" autocomplete="off">
      <input id="" class="input__start-new-path input__pathway-starting-occ" type="text" placeholder="enter starting occupation" value="" data-prev-title="">
      <span class="start-new-path__search"></span>
      <a href="#" class="start-new-path__clear">Clear field</a>
      <button type="submit" class="d-none">Start new path</button>
      <div id="start-pathway-autocomplete-container"></div>
    </form>

    <div class="pathway__occupation-automation">
      <span class="pathway__label">Risk of automation</span>
      <span class="pathway__value">--</span>
    </div><!-- End .pathway__automation-risk -->

    <div class="pathway__occupation-salary">
      <span class="pathway__label">Median salary</span>
      <span class="pathway__value">--</span>
    </div><!-- End .pathway__salary -->

    <div>
      <a href="#" class="jobs-link">Jobs &amp; Training</a>
      <a href="#" data-soc-code="" class="button--gradient1 pathway__start-path-btn initial-state">
        <span>Start new path</span>
        <em class="gradient-border"></em>
      </a>
    </div>

    <?php endif; ?>

  </div><!-- End .pathway__occupation -->
    
</div><!-- End .pathway__group -->