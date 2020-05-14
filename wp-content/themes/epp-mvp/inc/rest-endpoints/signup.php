<?php
/*--------------------------------------------------------------
* <home_url>/wp-json/api/v1/signup
--------------------------------------------------------------*/
add_action('rest_api_init', function () {
  register_rest_route('api/v1', 'signup', array(
    'methods' => 'GET, POST',
    'callback' => 'epp_mvp_create_user',
  ));
});

function epp_mvp_create_user($data)
{
  $user_fullname = $data['fullname'];// Get full name
  $user_email = $data['email'];// Get email
  $user_password = $data['password'];// Get password
  $epp_api_key = $data->get_header('X-EPP-WP-Key');

  if ($epp_api_key == md5(EPP_WP_KEY)) {
    if ($user_fullname != '' && $user_email != '' && $user_password != '') {
      $user_name = substr($user_email, 0, strpos($user_email, '@'));// Username is everything before the '@' in email address
      $user_fullname_obj = explode(' ', $user_fullname, 2);// Create name object with 2 values (before and after the space)
      if (email_exists($user_email) == false) {// If email doesn't already exist
        $user_id = username_exists($user_name);// Check if username exists
        if ($user_id) {// If username exists, then:
          $user_name = $user_email;// make the username the email address
        }

        $userdata = array(// Setup user data to insert
          'user_login' => $user_name,
          'user_email' => $user_email,
          'user_pass' => $user_password,
          'first_name' => $user_fullname_obj[0],
          'last_name' => $user_fullname_obj[1]
        );
        $userid = wp_insert_user($userdata);// Insert new user into database

        // return 1;// return 1 for success
        $result = array(
          'result_code' => 1,
          'message' => 'Account created successfully!'
        );
      } else {
        // return 0;// return 0 for 'user exists'
        $result = array(
          'result_code' => 0,
          'message' => 'User already exists.'
        );
      }
    } else {
      // return 2;// return 2 for 'empty field(s)'
      $result = array(
        'result_code' => 2,
        'message' => 'All fields are required.'
      );
    }
  } else {
    // return -2;// Nonce failed.
    $result = array(
      'result_code' => -2,
      'message' => 'Cheatin\' Eh?! Nonce error.'
    );
  }

  return $result;
}