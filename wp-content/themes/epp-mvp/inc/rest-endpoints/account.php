<?php
/*--------------------------------------------------------------
* <home_url>/wp-json/api/v1/account/...
--------------------------------------------------------------*/
add_action( 'rest_api_init', function () {
  register_rest_route( 'api/v1', 'account/update', array(
		'methods' => 'GET, POST',
		'callback' => 'epp_mvp_update_account',
  ) );
} );

add_action( 'rest_api_init', function () {
  register_rest_route( 'api/v1', 'account/password-reset', array(
		'methods' => 'GET, POST',
		'callback' => 'epp_mvp_password_reset',
  ) );
} );

add_action( 'rest_api_init', function () {
  register_rest_route( 'api/v1', 'account/delete', array(
		'methods' => 'GET, POST',
		'callback' => 'epp_mvp_delete_account',
  ) );
} );

add_action( 'rest_api_init', function () {
  register_rest_route( 'api/v1', 'account/delete-photo', array(
		'methods' => 'GET, POST',
		'callback' => 'epp_mvp_delete_photo',
  ) );
} );

/*--------------------------------------------------------------
* UPDATE ACCOUNT
--------------------------------------------------------------*/
require_once('account/update.php');

/*--------------------------------------------------------------
* RESET PASSWORD
--------------------------------------------------------------*/
require_once('account/password-reset.php');

/*--------------------------------------------------------------
* DELETE ACCOUNT
--------------------------------------------------------------*/
require_once('account/delete.php');

/*--------------------------------------------------------------
* DELETE PROFILE PHOTO
--------------------------------------------------------------*/
require_once('account/delete-photo.php');