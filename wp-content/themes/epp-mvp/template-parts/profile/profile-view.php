<?php
$epp_user_id = epp_mvp_get_epp_user();
$current_epp_user = new EPP_User($epp_user_id);
?>

<section class="container container--profile">

	<?php include_once('photo.php'); ?>
  
  <div class="row profile__row profile__row--user-info">
    <div class="col d-none d-md-block">&nbsp;</div>
    <div class="col profile__content profile__content--user-info">
			<div class="form-feedback d-none"></div>
			<strong><?= $current_epp_user->full_name; ?></strong>
			<p class="profile__email"><?= $current_epp_user->email; ?></p>
			<a href="?action=edit" class="button--outlined button--outlined-grey button--rectangle profile__action-btn d-none d-md-block">Edit Profile</a>
		</div>
  </div><!-- End .row -->

	<div class="row profile__row profile__row--personal-info">
		<div class="col d-none d-md-block profile__labels profile__labels--personal-info">
			<p>Gender</p>
			<p>Age</p>
		</div>
		<div class="col profile__content profile__content--personal-info">
			<p>
				<span class="faux-label d-md-none">Gender:</span>
				<?= $current_epp_user->gender; ?>
			</p>
			<p>
				<span class="faux-label d-md-none">Age:</span>
				<span class="profile__age"><?= $current_epp_user->age; ?></span>
				<img class="d-none d-md-inline-block" src="<?= get_template_directory_uri(); ?>/assets/img/eye-icon_2x.png" width="20" alt="eye"> <small class="d-none d-md-inline-block">this information is only visible to you</small>
				</p>
		</div>
	</div><!-- End .row -->

	<div class="row profile__row profile__row--notifications">
		<div class="col d-none d-md-block profile__labels profile__labels--notifications">
			<p>Notifications</p>
		</div>
		<div class="col profile__content profile__content--notifications">
			<p><?= $current_epp_user->notifications_msg; ?></p>
		</div>
	</div><!-- End .row -->

	<?php include_once('account.php'); ?>

	<?php include_once('delete.php'); ?>

</section>