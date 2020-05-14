<?php
function epp_mvp_password_reset($data)
{
  $new_password = $data['new_password'];
  $user_id = $data['user_id'];
  $user_login = $data['user_login'];
  $activation_key = $data['activation_key'];
  $epp_api_key = $data->get_header('X-EPP-WP-Key');

  if ($epp_api_key == md5(EPP_WP_KEY)) {
    $user_valid = check_password_reset_key($activation_key, $user_login);
    if (is_wp_error($user_id)) {
      // There was an error, probably that user doesn't exist.
      $result = 0;
    } else {
      // Success!
      wp_set_password($new_password, $user_id);
      $user_id = wp_update_user(array('user_activation_key' => ''));
      $result = 1;
    }
  } else {
    $result = -2;
  }

  return $result;
}