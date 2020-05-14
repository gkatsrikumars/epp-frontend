<?php
function epp_mvp_delete_pathway($data)
{
  $nonce = $data->get_header('X-WP-Nonce');
  $epp_user_id = epp_mvp_get_epp_user();// Get the current user ** only works with the nonce request **
  $row_index = $data['row_index'];// Get the row index we want to delete

  if (wp_verify_nonce($nonce, 'wp_rest')) {// Make sure to verify the nonce
    if (delete_row('epp_saved_pathways', $row_index, $epp_user_id)) {// Returns true upon success
      $result = 1;// 1 for success
    } else {// Returns false upon failure
      $result = 0;// 0 for failure
    }
  } else {// nonce failed
    $result = -2;// -2 for failed nonce
  }

  return $result;// Return the result for evaluation in js scripts
}