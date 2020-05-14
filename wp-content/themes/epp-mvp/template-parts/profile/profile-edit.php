<?php
$epp_user_id = epp_mvp_get_epp_user();
$current_epp_user = new EPP_User($epp_user_id);
?>

<section class="container container--profile container--profile-edit">

  <?php include_once('photo.php'); ?>
  
  <form id="update-profile-form" class="form--update-profile" novalidate>

    <?php include_once('edit/user-info.php'); ?>

    <?php include_once('edit/gender.php'); ?>
    
    <?php include_once('edit/birthdate.php'); ?>

    <?php include_once('edit/notifications.php'); ?>
  
  </form><!-- End .form--update-profile -->

	<?php include_once('account.php'); ?>

	<?php include_once('delete.php'); ?>

</section>