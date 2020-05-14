<?php
function epp_mvp_save_pathway($data)
{
  $nonce = $data->get_header('X-WP-Nonce');
  $epp_user_id = epp_mvp_get_epp_user();// Get the current user ** only works with the nonce request **
  $json = $data->get_json_params();

  if (wp_verify_nonce($nonce, 'wp_rest')) {
    $name = $json['name'];
    $occupations = $json['pathways'];

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
    $result = add_row('epp_saved_pathways', $row, $epp_user_id);// Add the rows to saved pathways
  } else {// nonce failed
    $result = -2;// -2 for failed nonce
  }

  return $result;// Return the number of rows added
}