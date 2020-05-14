<?php
function epp_mvp_logout_page($logout_url, $redirect)
{
  $logout_templates = get_pages(array(
    'meta_key' => '_wp_page_template',
    'meta_value' => 'page-logout.php'
  ));
  $logout_id = $logout_templates[0]->ID;
  $slug = get_post_field('post_name', $logout_id);
  return home_url('/' . $slug . '/');
}

add_filter('logout_url', 'epp_mvp_logout_page', 10, 2);

function epp_mvp_prevent_wp_login()
{
  // Check if we're on the login page or admin area
  if (($GLOBALS['pagenow'] == 'wp-login.php' || is_admin()) && !current_user_can('administrator') && !(defined('DOING_AJAX') && DOING_AJAX)) {
    // Load the home page url
    $page = home_url() . '/404/';
    // Redirect to the home page
    wp_redirect($page);
    // Stop execution to prevent the page loading for any reason
    exit();
  }
}

add_action('init', 'epp_mvp_prevent_wp_login');