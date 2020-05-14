<?php
/*--------------------------------------------------------------
*  Theme Setup
--------------------------------------------------------------*/
if (!function_exists('epp_mvp_theme_setup')) :
  function epp_mvp_theme_setup()
  {
    // Register Menus
    if (function_exists('register_nav_menus')) {
      register_nav_menus(array(
        'main-nav' => __('Main Navigation', 'epp-mvp'),
        'footer-nav' => __('Footer Navigation', 'epp-mvp')
      ));
    }

    // Add support for auto-generated title tag
    add_theme_support('title-tag');
    // Add support for custom logo
    add_theme_support('custom-logo');
    // Add support for featured images
    add_theme_support('post-thumbnails');

    // Add profile photo custom size
    add_image_size('profile-photo', 420, 420, true);
    add_image_size('article-thumb', 570, 383, true);

    // Set the default attachments 'link to' option to 'None'
    update_option('image_default_link_type', 'none');

    // Add 'EPP User' role
    add_role('epp_user_role', 'EPP User', array('read' => true));
    add_role('deactivated_user_role', 'Deactivated User', array('read' => true));

    if (!isset($content_width)) {
      $content_width = 1000;
    }
  }
endif;


add_action('after_setup_theme', 'epp_mvp_theme_setup');

/*--------------------------------------------------------------
 *  Make WordPress a little more secure and a lot
 *  cleaner by removing a few links in the <head>
 --------------------------------------------------------------*/
function epp_mvp_head_cleanup()
{
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'wp_generator'); //removes WP Version # for security
  remove_action('wp_head', 'feed_links', 2);
  remove_action('wp_head', 'index_rel_link');
  remove_action('wp_head', 'wlwmanifest_link');
  remove_action('wp_head', 'feed_links_extra', 3);
  remove_action('wp_head', 'start_post_rel_link', 10, 0);
  remove_action('wp_head', 'parent_post_rel_link', 10, 0);
  remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
  remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
  remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
}

add_action('init', 'epp_mvp_head_cleanup');

/*--------------------------------------------------------------
 *  Enqueue scripts and styles
 --------------------------------------------------------------*/

function epp_scripts()
{
  if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {

    wp_deregister_script('jquery');
    wp_enqueue_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', false, '3ea73981943afb58b1974c6cca251702', true);

    global $wp_query;
    wp_register_script('epp-scripts', get_template_directory_uri() . '/assets/js/scripts.min.js', array('jquery', 'epp-vendor-scripts'), 'tcjtt22qz5g8q5gvw3d663uhtwz8e7wz', true);
    wp_localize_script('epp-scripts', 'EPP_DATA', array(
      'assets_url' => get_template_directory_uri() . '/assets/img',
      'ajaxurl' => admin_url('admin-ajax.php'),
      'ID' => get_the_ID(),
      'query_vars' => json_encode($wp_query->query_vars),
      'current_url' => home_url(add_query_arg(array(), $wp_query->request)),
      'max_num_pages' => $wp_query->max_num_pages,
      'site_url' => get_site_url(),
      'api_url' => EPP_API_URL,
      'api_key' => EPP_API_KEY,
      'epp_key' => md5(EPP_WP_KEY),
      'nonce' => wp_create_nonce('wp_rest')
    ));

    wp_enqueue_script('jquery-ui', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js', array('jquery'), false, true);
    wp_enqueue_script('jquery-migration', 'https://code.jquery.com/jquery-migrate-1.2.1.min.js', array('jquery'), false, true);
    wp_enqueue_script('epp-vendor-scripts', get_template_directory_uri() . '/assets/js/vendor-scripts.js', array('jquery'), false, true);
    wp_enqueue_script('epp-scripts');
  }
}

add_action('wp_enqueue_scripts', 'epp_scripts', 100);

function epp_styles()
{
  wp_enqueue_style('epp-styles', get_template_directory_uri() . '/assets/css/app.min.css', false, 'tcjtt22qz5g8q5gvw3d663uhtwz8e7wz');
  global $wp_styles;
  $wp_styles->add_data('epp-styles', 'media', 'none');
}

add_action('wp_enqueue_scripts', 'epp_styles');

/*--------------------------------------------------------------
* Add a weekly schedule to cron schedules
--------------------------------------------------------------*/
function epp_mvp_add_intervals($schedules)
{
  $schedules['weekly'] = array(
    'interval' => 604800, // 604800 seconds = 1 week
    'display' => __('Once Weekly')
  );
  $schedules['monthly'] = array(
    'interval' => 2635200, // 2635200 seconds = 1 month
    'display' => __('Once a month')
  );
  return $schedules;
}

add_filter('cron_schedules', 'epp_mvp_add_intervals');

/*--------------------------------------------------------------
* Make User ID field read only
--------------------------------------------------------------*/
function epp_mvp_admin_scripts()
{ ?>
  <script>
    jQuery(function (jQuery) {
      jQuery(document).ready(function () {
        jQuery('div[data-name="epp_wp_user_id"] .acf-input-wrap input').prop('readonly', true);
      });
    });
  </script>
<?php }

add_action('admin_head', 'epp_mvp_admin_scripts');

/*--------------------------------------------------------------
* Custom page title on occupation details page
--------------------------------------------------------------*/
add_filter('pre_get_document_title', function ($title) {
  if (get_the_ID() == 11 && get_post_type() == 'page') {
    $soc_code = $_GET['soc_code'];
    $current_occupation = new EPP_Occupation($soc_code);
    $title = $current_occupation->title . ' - Occupation - ' . get_bloginfo('name');
    return $title;
  }
}, 999, 1);

/*--------------------------------------------------------------
* Get the last modified date of a post
--------------------------------------------------------------*/
function epp_mvp_last_modified_date($content)
{
  $original_time = get_the_time('U');
  $modified_time = get_the_modified_time('U');
  if ($modified_time >= $original_time + 86400) {
    $updated_time = get_the_modified_time('h:i a');
    $updated_day = get_the_modified_time('F j, Y');
    $modified_content = '<span class="post-last-modified">' . $updated_day . '</span>';
  }
  return $modified_content;
}