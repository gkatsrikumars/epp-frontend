<?php
/*--------------------------------------------------------------
* CUSTOM ARTICLE POST TYPE
--------------------------------------------------------------*/
function register_article_post_type()
{
  $custom_post_type = 'epp_article';// Name of post type
  $upp_plural_name = 'Articles';// Post type uppercase plural name
  $upp_singular_name = 'Article';// Post type uppercase singular name
  $low_plural_name = 'articles';// Post type lowercase plural name

  $labels = array(
    'name' => _x($upp_plural_name, $custom_post_type),
    'singular_name' => _x($upp_singular_name, $custom_post_type),
    'add_new' => _x('Add New', $custom_post_type),
    'add_new_item' => _x('Add New ' . $upp_singular_name, $custom_post_type),
    'edit_item' => _x('Edit ' . $upp_singular_name, $custom_post_type),
    'new_item' => _x('New ' . $upp_singular_name, $custom_post_type),
    'view_item' => _x('View ' . $upp_singular_name, $custom_post_type),
    'search_items' => _x('Search ' . $upp_plural_name, $custom_post_type),
    'not_found' => _x('No ' . $low_plural_name . ' found', $custom_post_type),
    'not_found_in_trash' => _x('No ' . $low_plural_name . ' found in Trash', $custom_post_type),
    'parent_item_colon' => _x('Parent ' . $upp_singular_name . ':', $custom_post_type),
    'menu_name' => _x($upp_plural_name, $custom_post_type),
  );

  $rewrite = array(
    'slug' => 'article',
    'with_front' => true,
    'pages' => true,
    'feeds' => true,
  );

  $args = array(
    'labels' => $labels,
    'hierarchical' => false,
    'supports' => array('title', 'editor', 'revisions', 'thumbnail'),
    'taxonomies' => array('category', 'post_tag'),
    'public' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'menu_position' => 5,
    'menu_icon' => 'dashicons-format-aside',
    'show_in_nav_menus' => true,
    'publicly_queryable' => true,
    'exclude_from_search' => false,
    'has_archive' => true,
    'query_var' => true,
    'can_export' => true,
    'rewrite' => $rewrite,
    'capability_type' => 'post'
  );

  register_post_type($custom_post_type, $args);
}

add_action('init', 'register_article_post_type');