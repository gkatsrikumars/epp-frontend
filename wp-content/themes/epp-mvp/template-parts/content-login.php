<div class="popup-overlay popup-overlay--login">

  <a href="#" class="popup__close" title="Close">Close</a>

  <div class="popup popup--login">

    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/squiggly-lines-1.svg" width="193" alt="" class="squiggly-lines squiggly-lines-1">
    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/squiggly-lines-2.svg" width="594" alt="" class="squiggly-lines squiggly-lines-2">

    <div class="container">

      <div class="popup__header">
        <a href="<?= home_url(); ?>">
          <span style="display:none;">Home</span>
          <img class="d-block d-sm-none logo-white" src="<?= epp_mvp_custom_logo_url(); ?>" width="71" alt="logo">
        </a>

        <a class="button--outlined sign-up-btn d-block d-sm-none" href="#">Sign Up</a>

        <p class="d-none d-sm-block">
          Don't have an account?
          <br>
          <a class="sign-up-btn" href="#">Sign up</a>
        </p>
      </div><!-- End .popup__header -->

      <form id="login-form" class="popup__form popup__form--login" name="login-form" method="post" action="" novalidate>

        <div class="row">
          <div class="col">
            <h2 class="popup__heading">Welcome back!</h2>
            <div class="form-feedback d-none"></div>
          </div>
        </div><!-- End .row -->

        <div class="row form-content">
          <div class="col-sm-6 col--inputs">
            <div class="form-group">
              <label for="login-email" class="field-label">Email</label>
              <input type="email" class="form-control" id="login-email" name="login-email" data-validation="required" required>
            </div>
            <div class="form-group">
              <label for="login-password" class="field-label">Password</label>
              <input type="password" class="form-control" id="login-password" name="login-password" data-validation="required" required>
            </div>
            <!-- <div class="alert alert-danger d-none login-alert">
              <span>Email or passsword incorrect.</span>
            </div> -->
            <span class="or-divider"><em>or</em></span>
          </div>
          <div class="col-sm-6 col--social">
            <ul class="social-connect">
            <?php
            $social_menu = wp_get_nav_menu_items(4);
            foreach($social_menu as $social_menu_item):
            ?>
            <li class="social-connect__btn <?php if( isset($social_menu_item->classes[2]) ) { echo $social_menu_item->classes[2]; } ?>">
              <a class="" href="<?= $social_menu_item->url; ?>">
              <i class="<?php if( isset($social_menu_item->classes[0]) && isset($social_menu_item->classes[1]) ) { echo $social_menu_item->classes[0].' '.$social_menu_item->classes[1]; } ?>"></i>
              <span>Sign in with <?php
              if( strpos($social_menu_item->classes[2], 'facebook') !== false ){
                echo 'Facebook';
              }
              elseif( strpos($social_menu_item->classes[2], 'google') !== false ){
                echo 'Google';
              }
              else{
                echo 'LinkedIn';
              }
              ?></span>
            </a>
            </li>
            <?php endforeach; ?>
            </ul>
          </div>
        </div><!-- End .row -->

        <div class="row popup__footer">
          <div class="col">
            <button id="button--form-login" class="button button--form-login">Sign In</button>
            <p><a href="<?= epp_mvp_get_page_template_url( 'page-pass_reset.php' ); ?>">Forgot password?</a></p>
          </div>
        </div><!-- End .row -->

        <input type="hidden" id="redirect-after-login" value="">

      </form>

    </div><!-- End .container -->

  </div><!-- End .popup -->

</div><!-- End .popup-overlay--login -->