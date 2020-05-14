<div class="popup-overlay popup-overlay--signup">

  <a href="#" class="popup__close" title="Close">Close</a>

  <div class="popup popup--signup">

    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/goo-10.svg" width="855" alt="" class="goo-10">
    <img src="<?= get_template_directory_uri(); ?>/assets/img/illustrations/girl-3_2x.png" width="183" alt="" class="girl-3">

    <div class="container">

      <div class="popup__header">
        <a href="<?= home_url(); ?>">
          <span style="display:none;">Home</span>
          <img class="d-block d-sm-none logo-white" src="<?= epp_mvp_custom_logo_url(); ?>" width="71" alt="logo">
        </a>

        <a class="button--outlined login-btn d-block d-sm-none" href="#">Sign In</a>

        <p class="d-none d-sm-block">
          Already have an account?
          <br>
          <a class="login-btn" href="#">Sign in</a>
        </p>
      </div><!-- End .popup__header -->

      <form id="signup-form" class="popup__form popup__form--signup" name="signup-form" method="post" action="" novalidate>

        <div class="row">
          <div class="col">
            <h2 class="popup__heading">Welcome!</h2>
            <div class="form-feedback d-none"></div>
          </div>
        </div><!-- End .row -->

        <div class="row form-content">
          <div class="col-sm-6 col--inputs">
            <div class="form-group">
              <label for="fullname" class="field-label">Full Name</label>
              <input type="text" class="form-control" id="fullname" name="fullname" data-validation="required" required>
            </div>
            <div class="form-group">
              <label for="user-email" class="field-label">Email</label>
              <input type="email" class="form-control" id="user-email" name="user-email" data-validation="email" required>
            </div>
            <div class="form-group">
              <label for="user-password" class="field-label">Password</label>
              <!-- <input type="password" class="form-control" id="user-password" name="user-password" data-validation="length" data-validation-length="min8"> -->
              <input type="password" class="form-control" id="user-password" name="user-password" data-validation="required" required>
            </div>
            <!-- <div class="form-group">
              <label for="user-password-confirm" class="field-label">Confirm Password</label>
              <input type="password" class="form-control" id="user-password-confirm" name="user-password-confirm" data-validation="confirmation" data-validation-confirm="user-password">
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
              <span>Sign up with <?php
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
            <button id="button--form-sign-in" class="button button--form-sign-in">Sign Up</button>
            <div class="clearfix"></div>
            <label for="optin" class="checkbox-label">
              <input id="optin" name="optin" type="checkbox" value="">
              <span></span>
              <em>Yes, I want to receive a survey from MaRS Discovery District and <?php bloginfo('name'); ?> about my experience with <?php bloginfo('name'); ?>. I can unsubscribe at any time.</em>
            </label>
            <p class="privacy-disclaimer">By clicking "sign up" <span>I</span> agree to <?php bloginfo('name'); ?>'s <a href="<?php echo get_permalink(122); ?>">terms of service</a> and <a href="<?php echo get_permalink(3); ?>">privacy policy</a>.</p>
          </div>
        </div><!-- End .row -->

        <!-- <input type="hidden" id="redirect-after-signup" value=""> -->

      </form>

    </div><!-- End .container -->

  </div><!-- End .popup -->

</div><!-- End .popup-overlay--signup -->