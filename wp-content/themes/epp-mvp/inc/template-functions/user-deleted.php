<?php
function epp_mvp_delete_user($user_id)
{
  global $wpdb;

  $user_obj = get_userdata($user_id);// Get the user object
  $email = $user_obj->user_email;// Get the user's email
  $epp_user_id = get_user_meta($user_id, 'epp_acf_user_id', true);// Get the associated EPP User ID
  $social_login_table = $wpdb->prefix . "epp_social_login_users";// The social login table
  $wpdb->delete($social_login_table, array('email' => $email));// Delete the associated row
  wp_delete_post($epp_user_id);// Delete associated EPP User

  // Delete all associated attachments
  delete_epp_user_attachments($epp_user_id);

  // Delete all associated custom fields
  delete_field('epp_wp_user_id', $epp_user_id);
  delete_field('epp_user_email', $epp_user_id);
  delete_field('epp_user_first_name', $epp_user_id);
  delete_field('epp_user_last_name', $epp_user_id);
  delete_field('epp_user_dob_separated', $epp_user_id);
  delete_field('epp_user_gender', $epp_user_id);
  delete_field('epp_user_custom_gender', $epp_user_id);
  delete_field('epp_user_notifications', $epp_user_id);
  delete_field('epp_user_bookmarks', $epp_user_id);
  delete_field('epp_autosaved_pathway', $epp_user_id);
  delete_field('epp_saved_pathways', $epp_user_id);
  epp_mvp_send_account_deletion_email($email, $user_obj->first_name);
}

add_action('delete_user', 'epp_mvp_delete_user');

// DELETE ALL ATTACHMENTS BY EPP USER ID
function delete_epp_user_attachments($post_id)
{
  global $wpdb;

  $sql = "SELECT ID FROM {$wpdb->posts} ";
  $sql .= " WHERE post_parent = $post_id ";
  $sql .= " AND post_type = 'attachment'";
  $ids = $wpdb->get_col($sql);
  foreach ($ids as $id) {
    wp_delete_attachment($id);
  }
}

// SEND USER EMAIL CONFIRMING ACCOUNT DELETION
function epp_mvp_send_account_deletion_email($email, $first_name)
{
  $to = $email;
  $subject = 'Your Account Was Deleted';
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
  $message .= '<h1 style="font-family: sans-serif; font-size: 18pt; color: #536DFE; font-weight: normal; text-align: center;">Sorry To See You Go</h1>';
  $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97; text-align: center;">Hey ' . $first_name . ',</p>';
  $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97; text-align: center;">This is to confirm that the account associated with ' . $email . ' has been&nbsp;deleted.</p>';
  $message .= '<p style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #777d97; text-align: center;">If you decide to sign in again you\'ll have to create a new account.</p>';
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