<?php $pass_reset_url = epp_mvp_get_page_template_url( 'page-pass_reset.php' ); ?>

<?php
/* global $wpdb;
$social_login_table = $wpdb->prefix.'epp_social_login_users';

// Check whether user data already exists in database
$user_exists = $wpdb->get_results( "
  SELECT * FROM $social_login_table 
  WHERE email = '$current_epp_user->email'
" );

if( !$user_exists ): */
?>

<div class="row profile__row profile__row--change-password">
  
	<div class="col d-none d-md-block profile__labels profile__labels--account">
		<p>Account</p>
  </div><!-- End .col -->
  
	<div class="col profile__content profile__content--change-password">
    
    <form id="change-password-form" class="form--change-password" novalidate>

    <p><a class="change-password-btn" href="#">Change password</a></p>
    
    <div class="change-password-fields">

      <div class="form-feedback d-none"></div>

      <div class="form-group">
        <label for="old-password" class="field-label">Old password</label>
        <input type="password" class="form-control" id="old-password" name="old-password" data-validation="required" required>
      </div>

      <div class="form-group">
        <label for="new-password" class="field-label">New password</label>
        <input type="password" class="form-control" id="new-password" name="new-password" data-validation="required" required>
      </div>

      <div class="form-group">
        <label for="new-password-confirm" class="field-label">Match new password</label>
        <input type="password" class="form-control" id="new-password-confirm" name="new-password-confirm" data-validation="confirmation" data-validation-confirm="new-password">
      </div>

      <div class="form-group submit-btn-group">
        <input type="submit" class="button change-password__submit" value="Update Password">
        <a class="forgot-password-btn" href="<?= epp_mvp_get_page_template_url( 'page-pass_reset.php' ); ?>">Forgot your password?</a>
        <a href="<?= $pass_reset_url; ?>?reset_email=<?= $current_epp_user->email; ?>" class="button button--send-password-reset d-none">send password reset to <?= $current_epp_user->email; ?></a>
      </div><!-- End .change-password-fields -->

    </div><!-- End .change-password-fields -->

    </form><!-- End .form--change-password -->

  </div><!-- End .col -->
  
</div><!-- End .row -->

<?php //endif; ?>