<?php
/* Template Name: Single Occupation */

if (!isset($_GET['soc_code'])):
  wp_redirect(home_url());
  exit();
else:
  $soc_code = $_GET['soc_code'];
  $current_occupation = new EPP_Occupation($soc_code);
  if ($current_occupation->title == '' && $current_occupation->description == '') {
    wp_redirect(home_url());
    exit();
  }

  $epp_user_id = epp_mvp_get_epp_user();

// Check if occupation is bookmarked:
  $bookmarked_occupations = array();

  if (have_rows('epp_user_bookmarks', $epp_user_id)):
    while (have_rows('epp_user_bookmarks', $epp_user_id)) : the_row();
      $bookmarked_occupations[] = get_sub_field('epp_user_bookmarked_occupation_id', $epp_user_id);
    endwhile;
  endif;

  if (in_array($current_occupation->soc_code, $bookmarked_occupations)) {
    $btn_class = 'bookmarked';
    $btn_txt = 'Bookmarked';
    $btn_title = 'Remove from Bookmarks';
  } else {
    $btn_class = 'not-bookmarked';
    $btn_txt = 'Bookmark Occupation';
    $btn_title = 'Add to Bookmarks';
  }

// NEW 2020:
  if (!is_user_logged_in()) {
    $btn_class .= ' bookmark-not-logged-in';
  }
// ================================

  get_header();
  ?>

  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

  <section class="container container--occupation">
    <?php include_once('template-parts/occupation/main-info.php'); ?>
    <?php include_once('template-parts/occupation/training.php'); ?>
    <?php include_once('template-parts/occupation/jobs.php'); ?>
  </section>

<?php endwhile; endif; ?>

  <?php get_footer(); ?>

<?php endif; ?>