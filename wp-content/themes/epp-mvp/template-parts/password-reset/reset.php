<?php
$activation_key = $_GET['key'];
$user_login = $_GET['user'];
$user_valid = check_password_reset_key( $activation_key, $user_login );
        
if( is_wp_error( $user_valid ) ): ?>
        
<div class="alert alert-danger">
  <span> The link you clicked is either invalid or expired.</span><br>
  <a href="<?= epp_mvp_get_page_template_url( 'page-pass_reset.php' ); ?>" class="alert-link">Click here</a> to reset your password.
</div>
        
<?php else: ?>

<form class="form--password-reset" action="" method="post" novalidate>
  <h1 class="page-heading"><?php the_title(); ?></h1>

  <div class="alert alert-success mb-3 d-none"><span>Your password has been successfully reset. <a href="<?= home_url(); ?>" class="alert-link launch-login">Login</a>.</span></div>
  
  <div class="form-label-group mb-3">
    <label for="new-password" class="field-label">Enter your new password</label>
    <input type="password" name="new-password" id="new-password" class="form-control" value="" required>
    <div class="invalid-feedback">
      Please enter your new password to continue
    </div>
  </div>
  <div class="form-label-group mb-3">
  <label for="new-password" class="field-label">Confirm new password</label>
    <input type="password" name="new-password-confirm" id="new-password-confirm" class="form-control" value="" required>
    <div class="invalid-feedback">
      Please enter your new password to continue
    </div>
  </div>
  <div class="form-label-group">
    <input type="hidden" name="user-id" id="user-id" class="user-id" value="<?= $user_valid->ID; ?>">
    <input type="hidden" name="user-login" id="user-login" class="user-login" value="<?= $user_login; ?>">
    <input type="hidden" name="activation-key" id="activation-key" class="activation-key" value="<?= $activation_key; ?>">
    <input type="submit" name="submit-new-password" value="Change Password" class="button password-reset__btn" id="submit-new-password">
  </div>

</form>

<?php endif; ?>