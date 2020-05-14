<?php
$epp_user_id = epp_mvp_get_epp_user();
$fullname = get_field('epp_user_first_name', $epp_user_id).' '.get_field('epp_user_last_name', $epp_user_id);
$email = get_field('epp_user_email', $epp_user_id);

$main_menu = wp_get_nav_menu_items(2);// menu id is only parameter
$user_menu = wp_get_nav_menu_items(3);// menu id is only parameter
$social_menu = wp_get_nav_menu_items(4);// menu id is only parameter
?>

<form class="form--search-occupations" autocomplete="off">
  <button>Search</button>
  <input id="search-occ-input" type="text" placeholder="Enter occupation name">
  <div id="search-occ-autocomplete-container"></div>
</form>

<header class="site-header">

  <nav class="main-nav">

    <a href="<?= home_url(); ?>" class="site-logo menu__link--header-logo"><span style="display:none;">Home</span><img src="<?= epp_mvp_custom_logo_url(); ?>" width="94" alt="logo"></a>

    <ul class="menu menu--primary">

      <?php foreach($main_menu as $main_menu_item): ?>
        <li class="menu__item <?php
        /* if( is_page($main_menu_item->object_id) ) { echo 'menu__item--active'; }
        else{
          $blog_id = get_option( 'page_for_posts' );
          if( is_home() && $main_menu_item->object_id == $blog_id ) {
            echo 'menu__item--active';
          }
        } */
        ?> <?php if( isset($main_menu_item->classes[0]) ) { echo $main_menu_item->classes[0]; } ?>">
          <a class="menu__link" href="<?= $main_menu_item->url; ?>"><?= $main_menu_item->title; ?></a>
        </li>
      <?php endforeach; ?>

      <?php if( is_user_logged_in() ): ?>
        <li class="menu__item--start-pathway">
          <a class="button--gradient1 button--large build-pathway-btn" href="#">Start new path</a>
          <form class="build-pathway-form form-inline" autocomplete="off">
            <input id="build-pathway-input" class="input--build-pathway" type="text" placeholder="enter starting occupation" aria-label="Build">
            <span class="pathway-gradient-border"></span>
            <button type="submit" class="d-none">Build Pathway</button>
            <div id="pathway-autocomplete-container"></div>
          </form>
        </li>
        <?php else: ?>
        <li class="menu__item menu__item--sign-up">
          <a class="button--outlined button--outlined-blue sign-up-btn menu__link--signup" href="#">Sign up with email</a>
        </li>
        <li class="nav-item menu__item--disabled">
          <a class="menu__link menu__link--disabled nav-link disabled" href="#">or</a>
        </li>
        <?php foreach($social_menu as $social_menu_item): ?>
        <li class="menu__item menu__item--social <?php if( isset($social_menu_item->classes[2]) ) { echo $social_menu_item->classes[2]; } ?>">
          <a class="menu__link--social" href="<?= $social_menu_item->url; ?>"><i class="<?php if( isset($social_menu_item->classes[0]) && isset($social_menu_item->classes[1]) ) { echo $social_menu_item->classes[0].' '.$social_menu_item->classes[1]; } ?>"></i></a>
        </li>
        <?php endforeach; ?>
      <?php endif; ?>

    </ul>

    <ul class="menu menu--secondary">

      <li class="menu__item--mars">
        <a href="https://www.marsdd.com/" target="_blank" class="menu__link--mars"><img src="<?= get_template_directory_uri(); ?>/assets/img/MaRS-logo_2x.png" width="56" alt="MaRS Discovery District"></a>
      </li>

      <?php if( is_user_logged_in() ): ?>

      <li class="menu__item--float-right menu-item--account">
      <div class="dropdown">
        <a class="dropdown-toggle avatar-toggle" href="#" data-toggle="dropdown" title="Click me!"><?php
          if( has_post_thumbnail( $epp_user_id ) ){
            echo get_the_post_thumbnail( $epp_user_id, array(40, 40), array( 'class' => '' ) );
          }
          else{
            echo epp_mvp_get_custom_avatar(40, '');
          }
        ?></a>
        <div class="dropdown-menu" role="menu" aria-labelledby="avatar-toggle">
          <?php if($epp_user_id): ?>
          <!-- <div class="dropdown-item current-user disabled"><?php //echo get_the_title($epp_user_id); ?></div> -->
          <div class="dropdown-item current-user disabled"><?= $fullname; ?></div>
          <div class="dropdown-item disabled current-user-email"><?= $email; ?></div>
          <div class="dropdown-divider mb-0"></div>
          <?php foreach($user_menu as $user_menu_item): ?>
          <a class="dropdown-item menu__link--user-dropdown <?php if( is_page($user_menu_item->object_id) ) { echo 'active'; } ?>" href="<?= $user_menu_item->url; ?>"><?= $user_menu_item->title; ?></a>
          <?php endforeach; ?>
          <div class="dropdown-divider my-0"></div>
          <?php else: ?>
          <div class="dropdown-item current-user disabled" style="text-align:center;">Non-EPP User</div>
          <div class="dropdown-divider my-0"></div>
          <?php endif; ?>
          <a class="dropdown-item sign-out-link" id="sign-out-link" href="<?= wp_logout_url( home_url() ); ?>">Sign Out</a>
        </div>
      </div>
      </li>

      <?php else: ?>
      <li class="menu__item--float-right menu__item--login">
        <!-- <a class="menu__link--highlighted" href="#" data-toggle="modal" data-target="#login-modal">Sign in</a> -->
        <a class="menu__link menu__link--login login-btn" href="#">Sign in</a>
      </li>
      <?php endif; ?>

      <li class="menu__item menu__item--search-occ">
        <!-- <form class="form--search-occupations" autocomplete="off">
          <button>Search</button>
          <input id="search-occ-input" type="text" placeholder="Enter occupation name">
          <div id="search-occ-autocomplete-container"></div>
        </form> -->
        <a href="#" class="search-occupations-btn menu__link--search-occupations"><span>Search occupations</span></a>
      </li>

    </ul>

  </nav>

</header>
