<?php
/* Template Name: Password Reset Page */
get_header();
?>

  <section class="container-fluid container--password-reset">
    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-8.svg" width="478" alt="" class="goo-8">
    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-9.svg" width="838" alt="" class="goo-9">

    <div class="password-reset__top">
      <a href="<?= home_url(); ?>"><span style="display:none;">Home</span><img src="<?= epp_mvp_custom_logo_url(); ?>" height="29" alt="logo"></a>
      <?php if (!is_user_logged_in()): ?>
        <p>
          <span>Have an account?</span>
          <a href="#" class="launch-login">Sign in</a>
        </p>
      <?php endif; ?>
    </div>

    <div class="row align-items-center">
      <div class="col text-center">
        <?php

        if (isset($_GET['key']) && isset($_GET['user'])):
          get_template_part('template-parts/password-reset/reset');
        else: // Activation key and/or user login does NOT exist
          get_template_part('template-parts/password-reset/initiate');
        endif;
        ?>

      </div><!-- End .row -->
    </div><!-- End .col -->
  </section>

<?php get_footer(); ?>