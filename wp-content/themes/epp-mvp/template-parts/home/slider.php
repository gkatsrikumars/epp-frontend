<section class="home-section--slider">
  <div class="slider">
    <div class="slider__text">
      <strong class="slider__title">Automation could affect half of Canadian jobs over the next&nbsp;decade.</strong>
      <span class="slider__desc">See how it might impact you and what <br>you can do now&nbsp;to&nbsp;prepare.</span>
      <a href="<?= epp_mvp_get_page_template_url( 'page-pathways.php' ); ?>" class="button button--x-large">Start new path</a>
    </div>
    <?php //if( is_user_logged_in() ) : ?>
      <!-- <img class="goo-13" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-13.svg" width="511" alt="">
      <img class="goo-14" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-14.svg" width="1479" alt=""> -->
    <?php //endif; ?>
  </div>

  <?php if( is_user_logged_in() ) : ?>

    <img class="goo-13" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-13.svg" width="511" alt="">
    <img class="goo-14" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-14-2.svg" width="1479" alt="">

    <img class="balance-1" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/balance-1.svg" width="140" alt="">
    <img class="balance-2" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/balance-2.svg" width="140" alt="">
    <img class="balance-3" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/balance-3.svg" width="140" alt="">
    
    <img class="girl-on-stool" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/girl-on-stool_2x.png" width="254" alt="">

  <?php else: ?>

    <img class="goo-1 d-none d-md-block" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-1.svg" width="1290" alt="">
    <img class="goo-1--mobile d-md-none" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-1-mobile.svg" width="769" alt="">

    <div class="windmill windmill-1">
      <img class="propellers" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/propellers_2x.png" width="453" alt="">
      <img class="tower" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/windmill-tower.svg" width="38" alt="">
    </div>
    <div class="windmill windmill-2">
      <img class="propellers" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/propellers_2x.png" width="307" alt="">
      <img class="tower" src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/windmill-tower-2.svg" width="27" alt="">
    </div>
    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/girl-without-ball_2x.png" alt="" width="185" class="girl-without-ball">
    <div class="ball"></div>
    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/ball-shadow.svg" alt="" width="118" class="ball-shadow">

  <?php endif; ?>
</section>