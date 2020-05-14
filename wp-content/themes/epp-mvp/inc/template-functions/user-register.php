<?php
/*--------------------------------------------------------------
* On user creation, create custom post type
* with reference to user
--------------------------------------------------------------*/
function epp_mvp_registration_save($user_id)
{
  $user_info = get_userdata($user_id);// Get user data  
  $user_info->set_role('epp_user_role');// Set user role to EPP User (no capabilities)
  $insert_epp_user = array(
    // 'post_title'   => $user_info->first_name.' '.$user_info->last_name,
    'post_title' => $user_info->user_login,
    'post_content' => '',
    'post_status' => 'publish',
    'post_author' => 1,
    'post_type' => 'epp_user'
  );
  $epp_user_id = wp_insert_post($insert_epp_user);// Insert the new EPP User post

  // update_field( $field_key, $value, $post_id );
  update_field('epp_wp_user_id', $user_id, $epp_user_id);// Update the User ID ACF field with new user's ID (read only)
  update_field('epp_user_email', $user_info->user_email, $epp_user_id);// Update the Email ACF field with new user's email
  update_field('epp_user_first_name', $user_info->first_name, $epp_user_id);
  update_field('epp_user_last_name', $user_info->last_name, $epp_user_id);
  update_field('epp_user_notifications', 'y', $epp_user_id);

  $havemeta = get_user_meta($user_id, 'epp_acf_user_id', true);
  if (!$havemeta) {
    add_user_meta($user_id, 'epp_acf_user_id', $epp_user_id);
  } else {
    update_user_meta($user_id, 'epp_acf_user_id', $epp_user_id);
  }
}

add_action('user_register', 'epp_mvp_registration_save', 10, 1);