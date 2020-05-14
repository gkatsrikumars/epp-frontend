<?php
/*--------------------------------------------------------------
* Get custom logo URL
--------------------------------------------------------------*/
function epp_mvp_custom_logo_url()
{
  if (function_exists('the_custom_logo')) {
    $custom_logo_id = get_theme_mod('custom_logo');
    $image = wp_get_attachment_image_src($custom_logo_id, 'full');
    if ($image[0] != '') {
      $img_url = $image[0];
    } else {
      $img_url = get_template_directory_uri() . '/img/logo.png';
    }
  } else {
    $img_url = get_template_directory_uri() . '/img/logo.png';
  }

  return $img_url;
}