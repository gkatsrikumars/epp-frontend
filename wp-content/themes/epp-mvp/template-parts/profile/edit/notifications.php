<div class="row profile__row profile__row--notifications">

	<div class="col d-none d-md-block profile__labels profile__labels--notifications">
		<p>Notifications</p>
  </div>
    
	<div class="col profile__content profile__content--notifications">

    <h3 class="d-sm-block d-md-none">Notifications</h3>

		<label for="receive-notifications" class="checkbox-label">
      <input id="receive-notifications" name="receive-notifications" type="checkbox" value="" <?php if( $current_epp_user->notifications_value == 'y' ) { echo 'checked'; } ?>>
      <span class="d-none d-md-block"></span>
      <em class="d-none d-md-block">I am okay with <strong><?php bloginfo('name'); ?></strong> sending me links via e-mail</em>

      <div class="switch d-sm-inline-block d-md-none"></div>
    </label>

  </div><!-- End .profile__content--notifications -->
    
</div><!-- End .row -->