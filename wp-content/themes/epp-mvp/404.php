<?php get_header(); ?>

<div class="container">
  <div class="row align-items-center">
    <div class="col-md-4">
      <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/spaceman_2x.png" alt="Spaceman" width="300" class="spaceman">
    </div><!-- End .col-md-4 -->
    <div class="col-md-8">
      <h1>404</h1>
      <div class="four-o-four-msg">
        <strong>Oops...</strong>
        <p>You shouldn't be here</p>
      </div>
      <p class="return-to-safety"><a href="<?= home_url(); ?>">Return to safety</a></p>
    </div><!-- End .col-md-8 -->
  </div>
</div>

<?php get_footer(); ?>