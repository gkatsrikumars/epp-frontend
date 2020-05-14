<?php
function epp_mvp_social_auth_php($data)
{
  $oauth_provider = $data->oauth_provider;// 'facebook','google','linkedin'

  global $wpdb;
  $social_login_table = $wpdb->prefix . 'epp_social_login_users';

  if ($data->pictureUrl != '') {
    $picture_url = $data->pictureUrl;
  } else {
    $picture_url = get_template_directory_uri() . '/assets/img/default-user_2x.png';
  }

  // Check whether user data already exists in database
  $user_exists = $wpdb->get_results("
      SELECT * FROM $social_login_table 
      WHERE email = '$data->email'
    ");

  // User exists
  if ($user_exists) {
    // 1. Update the user in social login table
    $wpdb->update(// data to update
      $social_login_table,
      array(
        'first_name' => $data->firstName,
        'last_name' => $data->lastName,
        'picture' => $picture_url,
        'oauth_provider' => $oauth_provider,
        'modified' => current_time('mysql')
      ),
      array(// where
        'email' => $data->email
      )
    );

    // Check if a 'wp_user' exists (by email)
    if (email_exists($data->email) == false) {
      // 3a. If not, create 'wp_user', which triggers EPP User creation
      epp_mvp_social_create_user_php($data);
    }

    // If 'wp_user' exists
    if (email_exists($data->email) == true) {
      $epp_user_exists = epp_mvp_does_epp_user_exist($data->email);// Check if there's an associated EPP User

      // 3c. If EPP User doesn't exist, insert data into database
      if (!$epp_user_exists) {
        epp_mvp_social_create_epp_user($data->email);
      }
    }

    // Finally, log them in
    epp_mvp_social_login_php($data->email);
    $result = array('status_code' => 2, 'email' => $data->email);
  } // User doesn't exist
  else {

    // 1. Create user in social login table
    $wpdb->insert(
      $social_login_table,
      array(
        'first_name' => $data->firstName,
        'last_name' => $data->lastName,
        'email' => $data->email,
        'picture' => $picture_url,
        'created' => current_time('mysql'),
        'modified' => current_time('mysql'),
        'oauth_provider' => $oauth_provider,
        'oauth_uid' => $data->id
      )
    );

    // 2. Check if a 'wp_user' exists (by email)
    if (email_exists($data->email) == false) {
      // 3a. If not, create 'wp_user', which triggers EPP User creation
      epp_mvp_social_create_user_php($data);
    }

    // 3b. If 'wp_user' exists
    if (email_exists($data->email) == true) {
      $epp_user_exists = epp_mvp_does_epp_user_exist($data->email);// Check if there's an associated EPP User
      // 3c. If EPP User doesn't exist, insert data into database
      if (!$epp_user_exists) {
        epp_mvp_social_create_epp_user($data->email);
      }
    }

    // 4. Finally, log them in
    epp_mvp_social_login_php($data->email);
    $result = array('status_code' => 1, 'email' => $data->email);
  }
  return $result;
}

// CREATE WP USER ACCOUNT
function epp_mvp_social_create_user_php($data)
{
  global $wpdb;
  $user_email = $data->email;// Get email
  $user_name = substr($user_email, 0, strpos($user_email, '@'));// Username is everything before the '@' in email address
  $user_fullname_obj = explode(' ', $user_fullname, 2);// Create name object with 2 values (before and after the space)

  $user_id = username_exists($user_name);// Check if username exists
  if ($user_id) {// If username exists, then:
    $user_name = $user_email;// make the username the email address
  }

  $random_pass = wp_generate_password(8, false);

  $userdata = array(// Setup user data to insert
    'user_login' => $user_name,
    'user_email' => $user_email,
    'user_pass' => $random_pass,
    'first_name' => $data->firstName,
    'last_name' => $data->lastName
  );
  $userid = wp_insert_user($userdata);// Insert new user into database
  epp_mvp_send_new_user_email($user_email, $data->firstName, $random_pass);
}

// CHECK IF EPP USER EXISTS, BY EMAIL
function epp_mvp_does_epp_user_exist($user_email)
{
  $epp_user = get_posts(array(
    'numberposts' => 1,
    'post_type' => 'epp_user',
    'meta_key' => 'epp_user_email',
    'meta_value' => $user_email
  ));

  if ($epp_user) {
    return true;
  } else {
    return false;
  }
}

// INSERT EPP USER INTO DATABASE
function epp_mvp_social_create_epp_user($user_email)
{
  $user_info = get_user_by('email', $user_email);// Get userdata object
  $user_id = $user_info->ID;// Extract user ID
  $user_info->set_role('epp_user_role');// Set user role to EPP User (no capabilities)
  $insert_epp_user = array(
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

  $havemeta = get_user_meta($user_id, 'epp_acf_user_id', true);
  if (!$havemeta) {
    add_user_meta($user_id, 'epp_acf_user_id', $epp_user_id);
  } else {
    update_user_meta($user_id, 'epp_acf_user_id', $epp_user_id);
  }
}

// LOGIN WP USER
function epp_mvp_social_login_php($email)
{
  $user = get_user_by('email', $email);// Get user object by email
  wp_set_current_user($user->ID, $user->user_login);// Set the current user
  wp_set_auth_cookie($user->ID);// Set the auth cookie
  do_action('wp_login', $user->user_login);// Finally, log the user in
  wp_redirect(home_url() . '?action=social_login');
}

// EMAIL TO SEND TO NEW USER
function epp_mvp_send_new_user_email($email, $first_name, $password)
{
  $subject = 'Welcome to ' . get_bloginfo('name');
  $sender = get_bloginfo('name');
  // $admin_email = get_option('admin_email');
  $admin_email = 'noreply@myplanext.com';

  $message = '<table width="600" align="center" cellspacing="0" cellpadding="0" style="border: 1px solid #d8d8d8; border-bottom: none; padding: 10px 30px;">';
  $message .= '<tr>';
  $message .= '<td height="80">';
  $message .= '<img border="0" width="120" style="display:block; border:0;" src="cid:planext-logo" alt="planext">';
  $message .= '</td>';
  $message .= '</tr>';
  $message .= '<tr>';
  $message .= '<td>';
  $message .= '<h1 style="font-family: sans-serif; font-size: 18pt; color: #536DFE; font-weight: normal; text-align: center;">Welcome to ' . $sender . '</h1>';
  $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97; text-align: center;">Hey ' . $first_name . ',</p>';
  $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97; text-align: center;">Here\'s your temporary password: <strong>' . $password . '</strong></p>';
  $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97; text-align: center;">You can still log in with your social media acccount, if you prefer. To change your password, go to your <em>Account</em> page and click "change password".</p>';
  $message .= '</td>';
  $message .= '</tr>';
  $message .= '</table>';
  $message .= '<table width="600" align="center" bgcolor="#F9F9F9" cellspacing="0" cellpadding="0" style="border: 1px solid #d8d8d8; border-top: none; padding: 10px 30px;">';
  $message .= '<tr>';
  $message .= '<td height="100">';
  $message .= '<p style="font-family: sans-serif; font-size:10pt; text-align: center; color: #89949B; line-height: 1.4;">' . $sender . ' and the ' . $sender . ' logo are trademarks of MaRS Discovery District. <br>Copyright &copy; ' . date('Y') . ' ' . $sender . '. All rights reserved.</p>';
  $message .= '</td>';
  $message .= '</tr>';
  $message .= '</table>';

  $headers[] = 'MIME-Version: 1.0' . "\r\n";
  $headers[] = 'Content-type: text/html; charset=UTF-8' . "\r\n";
  $headers[] = "X-Mailer: PHP \r\n";
  $headers[] = 'From: ' . $sender . ' <' . $admin_email . '>' . "\r\n";

  $file = epp_mvp_custom_logo_url(); // phpmailer will load this file
  $file_array = parse_url($file);
  if ($_SERVER['HTTP_HOST'] == "localhost") {
    $file_path = str_replace('/epp-mvp/', '', $file_array['path']);
    $file_abs_path = ABSPATH . '/' . $file_path;
  } else {
    $file_abs_path = ABSPATH . '/' . $file_array['path'];
  }

  $uid = 'planext-logo'; // will map it to this UID
  $name = 'planext-logo.png'; // this will be the file name for the attachment

  global $phpmailer;
  add_action('phpmailer_init', function (&$phpmailer) use ($file_abs_path, $uid, $name) {
    $phpmailer->SMTPKeepAlive = true;
    $phpmailer->AddEmbeddedImage($file_abs_path, $uid, $name);
  });

  $sent = wp_mail($email, $subject, $message, $headers);

  return $sent;
}

/*--------------------------------------------------------------
* Log social users returned info to JSON file for debugging
--------------------------------------------------------------*/
function epp_mvp_update_social_file($json_response)
{
  $old_file_json = file_get_contents(get_home_url() . '/social-login.json');// get the contents of the social login file
  $old_file = json_decode($old_file_json);// convert old file to a PHP array
  $new_user_data = json_decode($json_response);// convert new JSON object to PHP array
  $old_file[] = $new_user_data;// append to the old file array
  $new_file = json_encode($old_file);// create new JSON object with the new contents
  $fp = fopen('social-login.json', 'w');// open old file
  fwrite($fp, $new_file);// overwrite old file with new contents
  fclose($fp);// close updated file
}