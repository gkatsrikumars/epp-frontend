<?php
function epp_mvp_autosave_pathway($data)
{
  $nonce = $data->get_header('X-WP-Nonce');
  $epp_user_id = epp_mvp_get_epp_user();// Get the current user ** only works with the nonce request **
  $occupations = $data->get_json_params();

  if (wp_verify_nonce($nonce, 'wp_rest')) {
    $result = 0;

    if (have_rows('epp_autosaved_pathway', $epp_user_id)) {// If rows for the repeater exist
      $new_repeater = array();
      update_field('epp_autosaved_pathway', $new_repeater, $epp_user_id);// Update repeater field with new empty array
    }

    foreach ($occupations as $occupation) {
      $row = array(
        'epp_auto_pathway_occupation_id' => $occupation['soc_code'],
        'epp_auto_pathway_occupation_title' => $occupation['title']
      );
      add_row('epp_autosaved_pathway', $row, $epp_user_id);
      $result++;
    }
  } else {// nonce failed
    $result = -2;// -2 for failed nonce
  }

  return $result;// Return the result for evaluation in js scripts
}