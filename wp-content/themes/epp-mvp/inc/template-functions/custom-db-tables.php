<?php
function epp_mvp_create_social_login_table()
{
  global $wpdb;
  $table_name = $wpdb->prefix . "epp_social_login_users";
  $charset_collate = $wpdb->get_charset_collate();
  $sql = "CREATE TABLE IF NOT EXISTS $table_name (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    oauth_provider varchar(50) NOT NULL,
    oauth_uid varchar(255) NOT NULL,
    first_name varchar(150) NOT NULL,
    last_name varchar(150) NOT NULL,
    email varchar(255) NOT NULL,
    gender varchar(10) DEFAULT NULL,
    locale varchar(75) DEFAULT NULL,
    picture varchar(255) NOT NULL,
    link varchar(255) DEFAULT NULL,
    created datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
    modified datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
    PRIMARY KEY  (id)
  ) $charset_collate;";

  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
  dbDelta($sql);
}

add_action('wp_loaded', 'epp_mvp_create_social_login_table');

function epp_mvp_create_deleted_users_table()
{
  global $wpdb;
  $table_name = $wpdb->prefix . "epp_deleted_users";
  $charset_collate = $wpdb->get_charset_collate();
  $sql = "CREATE TABLE IF NOT EXISTS $table_name (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    first_name varchar(150) DEFAULT NULL,
    last_name varchar(150) DEFAULT NULL,
    email varchar(255) NOT NULL,
    gender varchar(10) DEFAULT NULL,
    reason text NOT NULL,
    created datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
    modified datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
    PRIMARY KEY  (id)
  ) $charset_collate;";

  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
  dbDelta($sql);
}

add_action('wp_loaded', 'epp_mvp_create_deleted_users_table');