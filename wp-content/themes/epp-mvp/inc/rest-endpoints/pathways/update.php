<?php
function epp_mvp_update_pathway($data)
{
  $nonce = $data->get_header('X-WP-Nonce');
  $epp_user_id = epp_mvp_get_epp_user();// Get the current user ** only works with the nonce request **
  $json = $data->get_json_params();
  $row_index = $json['row_index'];// Get the row index we want to update
  $name = $json['name'];
  $occupations = $json['pathways'];

  if (wp_verify_nonce($nonce, 'wp_rest')) {// Make sure to verify the nonce
    foreach ($occupations as $occupation) {
      $sub_rows[] = array(
        'epp_pathway_occupation_id' => $occupation['soc_code'],
        'epp_pathway_occupation_title' => $occupation['title'],
        'epp_pathway_occupation_automation' => $occupation['automation']
      );
    }

    $row = array(
      'epp_saved_pathway_name' => $name,
      'epp_pathways' => $sub_rows
    );
    $updated = update_row('epp_saved_pathways', $row_index, $row, $epp_user_id);// Add the rows to saved pathways
    if ($updated) {
      $result = 1;
    } else {
      $result = 0;
    }
  } else {// nonce failed
    $result = -2;// -2 for failed nonce
  }

  return $result;// Return the result for evaluation in js scripts
}