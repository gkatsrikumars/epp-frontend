<?php
/*--------------------------------------------------------------
* <home_url>/wp-json/api/v1/bookmark
--------------------------------------------------------------*/
add_action('rest_api_init', function () {
  register_rest_route('api/v1', 'bookmark', array(
    'methods' => 'GET, POST',
    'callback' => 'epp_mvp_bookmark_job',
  ));
});

function epp_mvp_bookmark_job($data)
{
  $job_id = $data['job_id'];// Get the job ID to add/delete
  $job_title = $data['job_title'];// Get the job title to add/delete
  // $epp_user_id = $data['epp_user'];// Get the EPP User ID
  $action = $data['action'];// Get the action 'add' or 'delete'
  $nonce = $data->get_header('X-WP-Nonce');
  $epp_user_id = epp_mvp_get_epp_user();// Get the current user ** only works with the nonce request **

  // if ( check_ajax_referer('wp_rest', '_wpnonce') ){
  if (wp_verify_nonce($nonce, 'wp_rest')) {
    if ($action == 'add') {// If the action is to ADD a bookmark
      // 1. Check if field value already exists
      $found = false;
      if (have_rows('epp_user_bookmarks', $epp_user_id)) {// If rows for the repeater exist
        while (have_rows('epp_user_bookmarks', $epp_user_id)) {// Loop through the rows
          the_row();
          if ($job_id == get_sub_field('epp_user_bookmarked_occupation_id', $epp_user_id)) {// If the job ID already exists in bookmarks
            // 2a. Do nothing and return code 2
            $found = true;
            $result = 2;
          }
        } // end while have rows
      } // end if have rows
      if (!$found) {// If job ID does not exist in bookmarks
        // 2b. If not, add the row
        $row = array(
          'epp_user_bookmarked_occupation_id' => $job_id,
          'epp_user_bookmarked_occupation_title' => $job_title
        );
        add_row('epp_user_bookmarks', $row, $epp_user_id);// Add the job ID to bookmarks
        $result = 1;
      }
    } else {// If the action is to DELETE a bookmark
      $new_repeater = array();
      if (have_rows('epp_user_bookmarks', $epp_user_id)) {// If rows for the repeater exist
        $new_repeater = array();
        while (have_rows('epp_user_bookmarks', $epp_user_id)) {// Loop through the rows
          the_row();
          if (get_sub_field('epp_user_bookmarked_occupation_id', $epp_user_id) != $job_id) {// If current row does NOT equal the job ID to delete
            // add any sub field that does't have the job ID to new array
            $new_repeater[] = array(// Push the current job ID into new array
              'epp_user_bookmarked_occupation_id' => get_sub_field('epp_user_bookmarked_occupation_id', $epp_user_id),
              'epp_user_bookmarked_occupation_title' => get_sub_field('epp_user_bookmarked_occupation_title', $epp_user_id),
            );
          }  // end if check field
        } // end while have rows
        update_field('epp_user_bookmarks', $new_repeater, $epp_user_id);// Update repeater field with new array (that excludes job ID to delete)
      } // end if have rows
      $result = 3;
    }
  } else {// nonce failed
    $result = -2;
  }
  return $result;
}