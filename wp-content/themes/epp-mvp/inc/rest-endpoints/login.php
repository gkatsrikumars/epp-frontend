<?php
/*--------------------------------------------------------------
* <home_url>/wp-json/api/v1/login
--------------------------------------------------------------*/
add_action('rest_api_init', function () {
  register_rest_route('api/v1', 'login', array(
    'methods' => 'GET, POST',
    'callback' => 'epp_mvp_login',
  ));
});

function epp_mvp_login($data)
{
  $email = $data['email'];// Get email
  $password = $data['password'];// Get password
  $redirect = $data['redirect'];// Get redirect URL

  $epp_api_key = $data->get_header('X-EPP-WP-Key');

  if ($epp_api_key == md5(EPP_WP_KEY)) {

    $user = get_user_by('email', $email);// Get user object by email
    if ($user && wp_check_password($password, $user->data->user_pass, $user->ID)) {// Check if password matches saved password
      wp_set_current_user($user->ID, $user->user_login);// Set the current user
      wp_set_auth_cookie($user->ID);// Set the auth cookie
      do_action('wp_login', $user->user_login);// Finally, log the user in

      $epp_user_id = epp_mvp_get_epp_user();

      if ($redirect == '') {
        $result = array(
          'result_code' => 1, // return 1 for success, no redirect
          'message' => 'Success.',
          'user_id' => $epp_user_id
        );
      }
      if ($redirect != '') {
        $result = array(
          'result_code' => 2, // return 2 for success, with redirect
          'redirect_url' => $redirect,
          'message' => 'Success.',
          'user_id' => $epp_user_id
        );
      }
    } else {
      $result = array(
        'result_code' => 0, // return 0 for wrong email and/or password
        'message' => 'You entered an incorrect email, password or both.'
      );
    }

  } else {
    $result = array(
      'result_code' => -2, // return -2 for incorrect key
      'message' => 'Cheatin\' Eh?! Nonce error.'
    );
  }

  return $result;
}