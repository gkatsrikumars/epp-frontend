<?php
function epp_mvp_delete_photo($data)
{
  $nonce = $data->get_header('X-WP-Nonce');
  $epp_user_id = epp_mvp_get_epp_user();// Get the current user ** only works with the nonce request **

  if (wp_verify_nonce($nonce, 'wp_rest')) {// Make sure to verify the nonce
    global $wpdb;

    $social_login_table = $wpdb->prefix . 'epp_social_login_users';
    $current_epp_user = new EPP_User($epp_user_id);

    delete_epp_user_attachments($epp_user_id);

    $wpdb->update(
      $social_login_table,
      array(// data to update
        'picture' => ''
      ),
      array(// where
        'email' => $current_epp_user->email
      )
    );

    $result = 1;
  } else {// nonce failed
    $result = -2;// -2 for failed nonce
  }

  return $result;// Return the result for evaluation in js scripts

}