<?php
/**
 * As users select an occupation, it gets added to their
 * autosaved pathway as a row (sub field) with the title
 * and soc code (id) that they can view at any time.
 */
/*--------------------------------------------------------------
* <home_url>/wp-json/api/v1/pathways/...
--------------------------------------------------------------*/
add_action( 'rest_api_init', function () {
  register_rest_route( 'api/v1', 'pathways/save', array(
		'methods' => 'GET, POST',
		'callback' => 'epp_mvp_save_pathway',
  ) );
} );

add_action( 'rest_api_init', function () {
  register_rest_route( 'api/v1', 'pathways/delete', array(
		'methods' => 'GET, POST',
		'callback' => 'epp_mvp_delete_pathway',
  ) );
} );

add_action( 'rest_api_init', function () {
  register_rest_route( 'api/v1', 'pathways/edit', array(
		'methods' => 'GET, POST',
		'callback' => 'epp_mvp_edit_pathway',
  ) );
} );

add_action( 'rest_api_init', function () {
  register_rest_route( 'api/v1', 'pathways/update', array(
		'methods' => 'GET, POST',
		'callback' => 'epp_mvp_update_pathway',
  ) );
} );

/*--------------------------------------------------------------
* AUTOSAVE PATHWAY
--------------------------------------------------------------*/
// require_once('pathways/autosave.php');

/*--------------------------------------------------------------
* SAVE PATHWAY
--------------------------------------------------------------*/
require_once('pathways/save.php');

/*--------------------------------------------------------------
* DELETE PATHWAY
--------------------------------------------------------------*/
require_once('pathways/delete.php');

/*--------------------------------------------------------------
* EDIT PATHWAY NAME
--------------------------------------------------------------*/
require_once('pathways/edit.php');

/*--------------------------------------------------------------
* UPDATE SAVED PATHWAY
--------------------------------------------------------------*/
require_once('pathways/update.php');