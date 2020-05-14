<?php
/* Template Name: Social Authentication */

if (isset($_GET['code']) && isset($_GET['state'])) {
  $state = $_GET['state'];// Get state string
  if (strpos($state, 'facebook') !== false) {
    include('inc/social-login-php/facebook-callback.php');// Get Facebook callback file
  } elseif (strpos($state, 'google') !== false) {
    include('inc/social-login-php/google-callback.php');// Get Google callback file
  } elseif (strpos($state, 'linkedin') !== false) {
    include('inc/social-login-php/linkedin-callback.php');// Get LinkedIn callback file
  }
} else {
  wp_redirect(home_url());
}
?>