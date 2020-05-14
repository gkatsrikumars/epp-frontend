<?php
/**
 * Theme setup, enqueue scripts, etc.
 */
require get_template_directory() . '/inc/template-functions/theme-setup.php';

/**
 * Template functions
 */
require get_template_directory() . '/inc/template-functions/user-register.php';
require get_template_directory() . '/inc/template-functions/user-deleted.php';

/**
 * Add custom user profile fields to profile page
 */
require get_template_directory() . '/inc/template-functions/wp-profile-fields.php';

/**
 * Create custom DB tables
 */
require get_template_directory() . '/inc/template-functions/custom-db-tables.php';

/**
 * Custom login logo, url & title
 */
require get_template_directory() . '/inc/template-functions/custom-login.php';

/**
 * Custom post types
 */
require get_template_directory() . '/inc/post-types/epp_user.php';
require get_template_directory() . '/inc/post-types/article.php';

/**
 * Custom template tags for this theme
 */
require get_template_directory() . '/inc/template-tags/custom-logo.php';
require get_template_directory() . '/inc/template-tags/custom-avatar.php';
require get_template_directory() . '/inc/template-tags/occupation-functions.php';
require get_template_directory() . '/inc/template-tags/epp-user.php';
require get_template_directory() . '/inc/template-tags/truncate.php';
require get_template_directory() . '/inc/template-tags/get-page-template.php';

/**
 * Custom rest endpoints
 */
require get_template_directory() . '/inc/rest-endpoints/signup.php';
require get_template_directory() . '/inc/rest-endpoints/login.php';
require get_template_directory() . '/inc/rest-endpoints/bookmark.php';
require get_template_directory() . '/inc/rest-endpoints/pathways.php';
require get_template_directory() . '/inc/rest-endpoints/account.php';

/**
 * Social logins with PHP
 */
require get_template_directory() . '/inc/social-login-php/social-login.php';

/**
 * Block access to /wp-admin/
 */
require get_template_directory() . '/inc/template-functions/block-wp-admin.php';

/**
 * WP Cron jobs
 */
require get_template_directory() . '/inc/wp-cron/get-occupations.php';
require get_template_directory() . '/inc/wp-cron/get-occupation-details.php';