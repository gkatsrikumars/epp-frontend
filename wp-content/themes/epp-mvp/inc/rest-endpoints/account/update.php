<?php
function epp_mvp_update_account($data)
{
  $nonce = $data->get_header('X-WP-Nonce');
  $current_user = wp_get_current_user();// Get the current user ** only works with the nonce request **
  $user_id = $current_user->ID;

  if (wp_verify_nonce($nonce, 'wp_rest')) {
    if (isset($data['oldpass']) && isset($data['newpass'])): // CHANGE PASSWORD:
      $oldpass = $data['oldpass'];// Get old password
      $newpass = $data['newpass'];// Get new password

      $epp_user_id = get_user_meta($user_id, 'epp_acf_user_id', true);

      $user = get_user_by('id', $user_id);// Get user object by email
      if ($user && wp_check_password($oldpass, $user->data->user_pass, $user->ID)) {// Check if password matches saved password
        wp_set_password($newpass, $user_id);
        wp_set_current_user($user_id, $user->user_login);// Set the current user
        wp_set_auth_cookie($user_id);// Set the auth cookie
        do_action('wp_login', $user->user_login);// Finally, log the user in

        // $result = 2;// Password updated successfully
        $result = array(
          'result_code' => 2,
          'message' => 'Your password has been changed.'
        );
      } else {
        // $result = 1;// Old password DOES NOT match saved password
        $result = array(
          'result_code' => 1,
          'message' => 'The old password entered is incorrect.'
        );
      }

    else : // UPDATE ACCOUNT:
      $firstname = $data['firstname'];// Get firstname
      $lastname = $data['lastname'];// Get lastname
      $gender = $data['gender'];// Get gender
      $gender_type = $data['gender_type'];
      $notifications = $data['notifications'];

      if ($data['month'] != '') {
        $month = $data['month'];
      } else {
        $month = '';
      }

      if ($data['day'] != '') {
        $day = $data['day'];

        if ($day < 1) {
          $day = 1;
        }

        $day = sprintf('%02d', $day);
      } else {
        $day = '';
      }

      if ($data['year'] != '') {
        $year = $data['year'];
        if ($year < 1919) {
          $year = 1919;
        }
      } else {
        $year = '';
      }

      $epp_user_id = get_user_meta($user_id, 'epp_acf_user_id', true);
      update_field('epp_user_first_name', $firstname, $epp_user_id);
      update_field('epp_user_last_name', $lastname, $epp_user_id);

      // update_field('epp_user_dob', $dob, $epp_user_id);
      $dob_group = array(
        'epp_user_birth_month' => $month,
        'epp_user_birth_day' => $day,
        'epp_user_birth_year' => $year
      );

      update_field('epp_user_dob_separated', $dob_group, $epp_user_id);// Update repeater field with new empty array

      if ($gender_type == 'Custom') {
        if ($gender == '') {
          $gender = 'Other';
        }
        update_field('epp_user_gender', $gender_type, $epp_user_id);
        update_field('epp_user_custom_gender', $gender, $epp_user_id);
      } else {
        update_field('epp_user_gender', $gender, $epp_user_id);
      }

      update_field('epp_user_notifications', $notifications, $epp_user_id);

      // $result = 1;// Profile updated successfully
      $result = array(
        'result_code' => 1,
        'message' => 'Your profile was updated successfully.'
      );
    endif;

  } else {// nonce failed
    // $result = -2;
    $result = array(
      'result_code' => -2,
      'message' => 'Cheatin\' Eh?! Nonce error.'
    );
  }

  return $result;
}