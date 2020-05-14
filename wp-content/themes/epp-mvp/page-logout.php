<?php
/* Template Name: Logout Page */

wp_logout();
wp_redirect(home_url());
exit();

?>