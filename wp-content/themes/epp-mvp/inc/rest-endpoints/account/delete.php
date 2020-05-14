<?php
function epp_mvp_delete_account($data)
{
  $nonce = $data->get_header('X-WP-Nonce');
  $reason = $data['reason'];
  $result = 0;
  $epp_user_id = epp_mvp_get_epp_user();// Get the current user ** only works with the nonce request **
  $first_name = get_field('epp_user_first_name', $epp_user_id);
  $last_name = get_field('epp_user_last_name', $epp_user_id);
  $gender = epp_mvp_get_user_gender($epp_user_id);

  if (wp_verify_nonce($nonce, 'wp_rest')) {
    require_once(ABSPATH . 'wp-admin/includes/user.php');
    $current_user = wp_get_current_user();
    $email = $current_user->user_email;
    $is_user_deleted = wp_delete_user($current_user->ID);
    if ($is_user_deleted) {
      epp_mvp_send_account_deletion_admin_email($email, $reason);

      $user_data = array(
        'email' => $email,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'gender' => $gender,
        'reason' => $reason
      );
      epp_mvp_log_deleted_user_data($user_data);

      $result = 1;
    }
  } else {
    $result = -2;
  }

  return $result;
}

function epp_mvp_send_account_deletion_admin_email($email, $reason)
{
  $to = get_option('admin_email');
  $subject = 'A User Account Was Deleted';
  $sender = get_bloginfo('name');
  $admin_email = 'noreply@myplanext.com';

  $message = '<table width="600" align="center" cellspacing="0" cellpadding="0" style="border: 1px solid #d8d8d8; border-bottom: none; padding: 10px 30px;">';
  $message .= '<tr>';
  $message .= '<td height="80">';
  $message .= '<img border="0" width="120" style="display:block; border:0;" src="cid:planext-logo" alt="planext">';
  $message .= '</td>';
  $message .= '</tr>';
  $message .= '<tr>';
  $message .= '<td>';
  $message .= '<h1 style="font-family: sans-serif; font-size: 18pt; color: #536DFE; font-weight: normal; text-align: center;">A User Account Was Deleted </h1>';
  $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97; text-align: center;">Hey Admin,</p>';
  $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97; text-align: center;">This is to notify you that the account associated with ' . $email . ' has been&nbsp;deleted.</p>';
  $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97; text-align: center;">The reason the user deleted their account: <br>"' . $reason . '"</p>';
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

  $mail = wp_mail($to, $subject, $message, $headers);
  // if( $mail )
}

function epp_mvp_log_deleted_user_data($user_data)
{
  global $wpdb;
  $deleted_users_table = $wpdb->prefix . 'epp_deleted_users';
  $email = $user_data['email'];
  $first_name = $user_data['first_name'];
  $last_name = $user_data['last_name'];
  $gender = $user_data['gender'];
  $reason = $user_data['reason'];

  // Check whether user data already exists in database
  $user_exists = $wpdb->get_results("
    SELECT * FROM $deleted_users_table 
    WHERE email = '$email'
  ");

  if ($user_exists) {
    // 1. Update the user info in the DB
    $wpdb->update(// data to update
      $deleted_users_table,
      array(
        'first_name' => $first_name,
        'last_name' => $last_name,
        'email' => $email,
        'gender' => $gender,
        'reason' => $reason,
        'modified' => current_time('mysql')
      ),
      array(// WHERE
        'email' => $email
      )
    );
  } else {// user does NOT exist
    // 1. Create user in the DB
    $wpdb->insert(
      $deleted_users_table,
      array(
        'first_name' => $first_name,
        'last_name' => $last_name,
        'email' => $email,
        'gender' => $gender,
        'reason' => $reason,
        'created' => current_time('mysql'),
        'modified' => current_time('mysql'),
      )
    );
  }
}