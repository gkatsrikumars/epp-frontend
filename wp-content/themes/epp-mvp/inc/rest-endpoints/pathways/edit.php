<?php
function epp_mvp_edit_pathway($data)
{
  $nonce = $data->get_header('X-WP-Nonce');
  $epp_user_id = epp_mvp_get_epp_user();// Get the current user ** only works with the nonce request **
  $row_index = $data['row_index'];// Get the row index we want to update
  $name = $data['name'];

  if (wp_verify_nonce($nonce, 'wp_rest')) {// Make sure to verify the nonce
    if (update_sub_field(array('epp_saved_pathways', $row_index, 'epp_saved_pathway_name'), $name, $epp_user_id)) {
      $result = 1;
    } else {
      $result = 0;
    }
  } else {// nonce failed
    $result = -2;// -2 for failed nonce
  }

  return $result;// Return the result for evaluation in js scripts
}