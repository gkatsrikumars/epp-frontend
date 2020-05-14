<?php
require('../../../../../wp-blog-header.php');
include_once(ABSPATH . 'wp-admin/includes/image.php');

$user_id = get_current_user_id();
$user_info = get_userdata($user_id);
$epp_user_id = get_user_meta($user_id, 'epp_acf_user_id', true);
delete_epp_user_attachments($epp_user_id);// Remove all previous attachments first (to prevent orphans)

if (isset($_POST['upload-submit'])) {
  $uploaddir = wp_upload_dir();
  $file = $_FILES['photofile'];
  $uploadfile = $uploaddir['path'] . '/' . basename($file['name']);

  if (file_exists($uploadfile)) {
    $file_info = pathinfo($file['name']);// Get the fileinfo (dirname, basename, extension, filename)
    $ext = '.' . $file_info['extension'];// Get the file extension only
    $uploadfile = $uploaddir['path'] . '/' . basename($file_info['filename'] . '-' . time() . $ext);// Rename file using current unix timestamp
  }

  move_uploaded_file($file['tmp_name'], $uploadfile);
  $filename = basename($uploadfile);
  $wp_filetype = wp_check_filetype(basename($filename), null);

  $attachment = array(
    'post_mime_type' => $wp_filetype['type'],
    'post_title' => preg_replace('/\.[^.]+$/', '', $filename),
    'post_content' => '',
    'post_status' => 'inherit',
    'post_parent' => $epp_user_id,
    'menu_order' => 0
  );
  $attach_id = wp_insert_attachment($attachment, $uploadfile);
  $values = wp_generate_attachment_metadata($attach_id, $uploadfile);
  wp_update_attachment_metadata($attach_id, $values);
  set_post_thumbnail($epp_user_id, $attach_id);
  wp_redirect(home_url('/profile/'));
} else {
  wp_redirect(home_url());
}