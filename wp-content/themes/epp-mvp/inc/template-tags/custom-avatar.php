<?php
/*--------------------------------------------------------------
* Get custom avatar, if exists, else default WP avatar is used
--------------------------------------------------------------*/
function epp_mvp_get_custom_avatar($size = 32, $classes = '')
{
  global $wpdb;
  $user_id = get_current_user_id();
  $epp_user_id = epp_mvp_get_epp_user();

  if ($epp_user_id) {
    $email = get_field('epp_user_email', $epp_user_id);

    $email_row = $wpdb->get_results("SELECT picture FROM " . $wpdb->prefix . "epp_social_login_users WHERE email = '$email'");

    if ($email_row) {
      if ($email_row[0]->picture != '') {
        return '<img src="' . $email_row[0]->picture . '" width="' . $size . '" class="avatar avatar-' . $size . ' ' . $classes . '" alt="profile photo">';
      } else {
        return '<img src="' . get_template_directory_uri() . '/assets/img/default-user_2x.png" width="' . $size . '" alt="profile photo">';
      }
    } else {
      $args = array(
        'class' => $classes
      );
      // return get_avatar( $user_id, $size, '', '', $args);
      return '<img src="' . get_template_directory_uri() . '/assets/img/default-user_2x.png" width="' . $size . '" alt="profile photo">';
    }
  } else {
    $args = array(
      'class' => $classes
    );
    // return get_avatar( $user_id, $size, '', '', $args);
    return '<img src="' . get_template_directory_uri() . '/assets/img/default-user_2x.png" width="' . $size . '" alt="profile photo">';
  }

}