<div class="site-footer-wrap">
  <footer class="row site-footer">
    <div class="col-md site-footer__logo">
      <a href="<?= home_url(); ?>">
        <span style="display:none;">Home</span>
        <img src="<?= get_template_directory_uri(); ?>/assets/img/placeholder/logo-white_2x.png" width="91" alt="logo">
      </a>
    </div>

    <div class="col-md site-footer__login">
      <ul>
        <?php if (!is_user_logged_in()): ?>
          <li><a class="button--outlined button--outlined-white launch-signup" href="#">Sign Up</a></li>
        <?php else: ?>
          <li><a class="button--outlined button--outlined-white" href="<?= wp_logout_url(home_url()); ?>">Sign Out</a>
          </li>
        <?php endif; ?>
      </ul>
    </div>

    <div class="col-md site-footer__pages">
      <ul>
        <li class="menu__item--about"><a href="<?= home_url(); ?>?section=home-about-section">About</a></li>
        <li class="menu__item--articles"><a href="<?= home_url(); ?>?section=home-section--future-of-work">Articles</a>
        </li>
      </ul>
    </div>

    <div class="col-md site-footer__contact">
      <ul>
        <li class="site-footer__email">
          <a href="mailto:hi@myplanext.com">hi@myplanext.com</a>
        </li>
        <li class="footer--item__faq"><a href="<?= home_url(); ?>/faq/">FAQ</a></li>
      </ul>
    </div>

    <div class="col-md site-footer__address">
      <p>
        MaRS Discovery District<br>
        101 College Street, Suite 401<br>
        Toronto, Ontario, Canada M5G 1L7
      </p>
    </div>

  </footer>

  <div class="copyright-info">
    <div>
      <p>&copy; <?= date('Y') . ' ' . get_bloginfo('name'); ?></p>
      <?php
      wp_nav_menu(array(
        'container' => false, // remove nav container
        'container_class' => '', // class of container
        'menu_class' => 'site-footer__menu', // class of menu
        'theme_location' => 'footer-nav', // menu name
        'depth' => 1, // limit the depth of the nav
        'fallback_cb' => false, // fallback function
      ));
      ?>
    </div>
  </div>
</div><!-- End .site-footer-wrap -->

<?php get_template_part('template-parts/content', 'occupation-results'); ?>

</div><!-- End .content-body -->
</div><!-- End #page-wrapper -->

<?php get_template_part('template-parts/content', 'signup'); ?>
<?php get_template_part('template-parts/content', 'login'); ?>
<?php get_template_part('template-parts/content', 'occupations'); ?>

<div class="blocking" title="Close"></div>

<div class="site-loading">
  <!-- <img class="logo" src="<?= epp_mvp_custom_logo_url(); ?>" width="94" alt="logo"> -->
  <div class="loading">
    <div class="loading__square"></div>
  </div>
</div>

<?php wp_footer(); ?>

</body>
</html>