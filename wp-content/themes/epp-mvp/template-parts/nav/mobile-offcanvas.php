<?php
$epp_user_id = epp_mvp_get_epp_user();
$fullname = get_field('epp_user_first_name', $epp_user_id).' '.get_field('epp_user_last_name', $epp_user_id);

$main_menu = wp_get_nav_menu_items(2);// menu id is only parameter
$user_menu = wp_get_nav_menu_items(3);// menu id is only parameter
$social_menu = wp_get_nav_menu_items(4);// menu id is only parameter
?>

<nav class="mobile-nav">

  <?php if( !is_user_logged_in() ): ?>

    <ul class="menu--sign-up-links">

      <li class="signup-item">
        <a class="button sign-up-btn menu__link--mobile-signup" href="#"><img src="<?= get_template_directory_uri(); ?>/assets/img/envelope_2x.png" width="20" alt="envelope"> Sign Up</a>
      </li>

      <?php foreach($social_menu as $social_menu_item): ?>
      
      <li class="menu__item--social <?php if( isset($social_menu_item->classes[2]) ) { echo $social_menu_item->classes[2]; } ?>">
        <a class="menu__link--social" href="<?= $social_menu_item->url; ?>"><i class="<?php if( isset($social_menu_item->classes[0]) && isset($social_menu_item->classes[1]) ) { echo $social_menu_item->classes[0].' '.$social_menu_item->classes[1]; } ?>"></i></a>
      </li>

      <?php endforeach; ?>

    </ul>

    <ul class="menu--pages">

      <?php foreach($main_menu as $main_menu_item): ?>
        <li class="menu__item <?php
        /* if( is_page($main_menu_item->object_id) ) { echo 'menu__item--active'; }
        else{
          $blog_id = get_option( 'page_for_posts' );
          if( is_home() && $main_menu_item->object_id == $blog_id ) {
            echo 'menu__item--active';
          }
        } */
        ?>">
          <a class="menu__link" href="<?= $main_menu_item->url; ?>"><?= $main_menu_item->title; ?></a>
        </li>
      <?php endforeach; ?>

      <li class="login-item">
        <a href="#" class="button--outlined button--outlined-white login-btn">Sign In</a>
      </li>

    </ul>

  <?php else: ?>

    <div class="menu__item--start-pathway">
      <a class="button--gradient1 button--large build-pathway-btn" href="#">Start new path</a>
      <form class="build-pathway-form--mobile form-inline" autocomplete="off">
        <input id="build-pathway-input--mobile" class="input--build-pathway" type="text" placeholder="enter starting occupation" aria-label="Build">
        <span class="pathway-gradient-border"></span>
        <button type="submit" class="d-none">Build Pathway</button>
        <div id="pathway-autocomplete-container--mobile"></div>
      </form>
    </div>

    <ul class="menu--pages">

      <?php foreach($main_menu as $main_menu_item): ?>

      <li class="menu__item <?php
        /* if( is_page($main_menu_item->object_id) ) { echo 'menu__item--active'; }
        else{
          $blog_id = get_option( 'page_for_posts' );
          if( is_home() && $main_menu_item->object_id == $blog_id ) {
            echo 'menu__item--active';
          }
        } */
        ?>">
        <a class="menu__link" href="<?= $main_menu_item->url; ?>"><?= $main_menu_item->title; ?></a>
      </li>

      <?php endforeach; ?>

    </ul>

    <ul class="menu--user">

      <li>
        <?php
        if( has_post_thumbnail( $epp_user_id ) ){
          echo get_the_post_thumbnail( $epp_user_id, array(40, 40), array( 'class' => '' ) );
        }
        else{
          echo epp_mvp_get_custom_avatar(40, '');
        }
        ?>
        <strong><?= $fullname; ?></strong>
      </li>

      <?php foreach($user_menu as $user_menu_item): ?>

      <li>
        <a class="menu__link--mobile-user-item-link <?php if( is_page($user_menu_item->object_id) ) { echo 'active'; } ?>" href="<?= $user_menu_item->url; ?>"><?= $user_menu_item->title; ?></a>
      </li>

      <?php endforeach; ?>

      <li class="sign-out-item">
        <a class="menu__link--mobile-signout" id="" href="<?= wp_logout_url( home_url() ); ?>">Sign Out</a>
      </li>

    </ul>

  <?php endif; ?>

</nav><!-- End .mobile-nav -->