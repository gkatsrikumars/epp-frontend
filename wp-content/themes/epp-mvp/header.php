<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 20 May 2019 05:00:00 GMT");
?><!DOCTYPE html>
<!--[if IE 8]>
<html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" <?php language_attributes(); ?> > <!--<![endif]-->
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width"/>
  <?php if (is_user_logged_in()): ?>
    <script>
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'loggedInUser': '<?= epp_mvp_get_epp_user(); ?>',
        'event': 'visitorLogged'
      });
    </script>
  <?php endif; ?>

  <?php if (isset($_GET['action']) && $_GET['action'] == 'social_login'): ?>
    <script>
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'loggedInUser': '<?= epp_mvp_get_epp_user(); ?>',
        'event': 'userLogin'
      });
    </script>
  <?php endif; ?>

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PHP8P64"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->

<?php get_template_part('template-parts/nav/mobile-offcanvas'); ?>

<div id="page-wrapper">
  <div class="content-body">
    <div class="page-scroll-progress-wrap">
      <div class="page-scroll-indicator"></div>
    </div>
    <?php get_template_part('template-parts/nav/desktop'); ?>
<?php get_template_part('template-parts/nav/mobile-bar'); ?>